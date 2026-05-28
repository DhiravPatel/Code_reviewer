/**
 * Project-specific rules loaded from a `.codereview.yml` checked into the
 * repo. Lets teams encode conventions the AI should enforce ("use zod, not
 * joi", "auth must rate-limit", etc.) so reviews fit the codebase instead
 * of being generic.
 *
 * Supported file paths, in priority order:
 *   - .codereview.yml
 *   - .codereview.yaml
 *
 * Supported schema (all keys optional):
 *   rules:   [ "Use zod for all validation", "..." ]
 *   ignore:  [ "*.md", "docs/**" ]
 *   focus:   [ "security", "performance" ]
 */

const CONFIG_FILENAMES = ['.codereview.yml', '.codereview.yaml'] as const;

export interface ProjectRules {
  rules: string[];
  ignore: string[];
  focus: string[];
  sourceFile: string;
}

/**
 * Fetch and parse the project rules file from a repo. Returns null if no
 * config file exists or parsing fails (best-effort — we never block reviews
 * on a malformed config).
 */
export async function fetchProjectRules(
  accessToken: string,
  owner: string,
  repo: string,
  branch: string
): Promise<ProjectRules | null> {
  for (const filename of CONFIG_FILENAMES) {
    try {
      const res = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/contents/${filename}?ref=${encodeURIComponent(branch)}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'User-Agent': 'CodeReview-App',
            Accept: 'application/vnd.github.v3+json',
          },
        }
      );
      if (!res.ok) continue;

      const data = (await res.json()) as { content: string; encoding: string };
      if (data.encoding !== 'base64') continue;

      const raw = Buffer.from(data.content, 'base64').toString('utf8');
      const parsed = parseSimpleYaml(raw);

      return {
        rules: toStringArray(parsed.rules),
        ignore: toStringArray(parsed.ignore),
        focus: toStringArray(parsed.focus),
        sourceFile: filename,
      };
    } catch {
      // Try next filename
    }
  }
  return null;
}

/**
 * Should this file be skipped from review based on the project's ignore
 * patterns? Patterns support `*` and `**` glob wildcards.
 */
export function isFileIgnored(filename: string, ignorePatterns: string[]): boolean {
  if (!ignorePatterns || ignorePatterns.length === 0) return false;
  return ignorePatterns.some((p) => globMatch(filename, p));
}

/**
 * Render the rules block that gets injected into the AI prompt.
 * Returns an empty string when there are no rules to inject.
 */
export function renderRulesForPrompt(rules: ProjectRules | null): string {
  if (!rules) return '';
  const blocks: string[] = [];

  if (rules.rules.length > 0) {
    blocks.push('## PROJECT RULES (must enforce)');
    for (const r of rules.rules) blocks.push(`- ${r}`);
  }

  if (rules.focus.length > 0) {
    blocks.push('');
    blocks.push(`## FOCUS AREAS: prioritize ${rules.focus.join(', ')}.`);
  }

  if (blocks.length === 0) return '';

  blocks.push('');
  blocks.push(`(Loaded from ${rules.sourceFile} — these rules are codebase-specific and override generic best-practices.)`);
  return blocks.join('\n');
}

// ─── Minimal YAML parser ──────────────────────────────────────────
// Only supports the subset we need:
//   key: value             (string scalar)
//   key:
//     - item               (string array, one per line)
// Quoted strings, comments (# ...) and blank lines are handled.

function parseSimpleYaml(text: string): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  const lines = text.replace(/\r\n/g, '\n').split('\n');
  let currentKey: string | null = null;
  let currentArr: string[] | null = null;

  for (const rawLine of lines) {
    const line = stripComment(rawLine);
    if (!line.trim()) continue;

    const arrItem = line.match(/^\s+-\s+(.*)$/);
    if (arrItem && currentArr && currentKey) {
      currentArr.push(unquote(arrItem[1] ?? '').trim());
      continue;
    }

    const kv = line.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*:\s*(.*)$/);
    if (kv) {
      // Commit any in-progress array
      if (currentKey && currentArr) {
        out[currentKey] = currentArr;
      }
      currentKey = kv[1] ?? null;
      const tail = (kv[2] ?? '').trim();
      if (tail === '') {
        currentArr = [];
      } else {
        out[currentKey!] = unquote(tail);
        currentKey = null;
        currentArr = null;
      }
    }
  }

  if (currentKey && currentArr) {
    out[currentKey] = currentArr;
  }
  return out;
}

function stripComment(line: string): string {
  // Strip `# ...` comments but leave `#` inside quoted strings alone.
  let inSingle = false;
  let inDouble = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === "'" && !inDouble) inSingle = !inSingle;
    else if (c === '"' && !inSingle) inDouble = !inDouble;
    else if (c === '#' && !inSingle && !inDouble) return line.slice(0, i);
  }
  return line;
}

function unquote(s: string): string {
  const t = s.trim();
  if ((t.startsWith('"') && t.endsWith('"')) || (t.startsWith("'") && t.endsWith("'"))) {
    return t.slice(1, -1);
  }
  return t;
}

function toStringArray(v: unknown): string[] {
  if (!v) return [];
  if (Array.isArray(v)) return v.map(String).filter(Boolean);
  if (typeof v === 'string' && v.trim()) return [v];
  return [];
}

/**
 * Tiny glob matcher supporting `*` (no separator) and `**` (any depth).
 */
function globMatch(filename: string, pattern: string): boolean {
  // Escape regex metacharacters except the glob ones, then expand.
  const re = '^' + pattern
    .replace(/[.+^${}()|[\]\\]/g, '\\$&')
    .replace(/\*\*\/?/g, '<<DOUBLESTAR>>')
    .replace(/\*/g, '[^/]*')
    .replace(/<<DOUBLESTAR>>/g, '(?:.*/)?') + '$';
  try {
    return new RegExp(re).test(filename);
  } catch {
    return false;
  }
}
