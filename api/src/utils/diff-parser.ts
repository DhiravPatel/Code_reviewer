/**
 * Parse GitHub unified-diff patches into the set of HEAD-side line numbers
 * that are valid targets for inline review comments.
 *
 * GitHub's Reviews API rejects comments anchored to lines that are not part
 * of any diff hunk, so AI-generated line numbers must be validated before
 * we submit them.
 */

export interface DiffFile {
  filename: string;
  patch?: string;
}

export interface FileAnchorMap {
  /** All HEAD-side line numbers that appear in any hunk (added or context). */
  commentableLines: Set<number>;
  /** Line numbers that were added (`+` lines) — best targets for suggestions. */
  addedLines: Set<number>;
}

export type DiffAnchorIndex = Map<string, FileAnchorMap>;

/**
 * Build a per-file index of which HEAD-side lines are inside a diff hunk.
 */
export function buildAnchorIndex(files: DiffFile[]): DiffAnchorIndex {
  const index: DiffAnchorIndex = new Map();

  for (const file of files) {
    if (!file.patch) continue;

    const commentable = new Set<number>();
    const added = new Set<number>();
    let currentNewLine = 0;
    let inHunk = false;

    for (const rawLine of file.patch.split('\n')) {
      const hunkMatch = rawLine.match(/^@@\s*-\d+(?:,\d+)?\s*\+(\d+)(?:,\d+)?\s*@@/);
      if (hunkMatch && hunkMatch[1]) {
        currentNewLine = parseInt(hunkMatch[1], 10);
        inHunk = true;
        continue;
      }
      if (!inHunk) continue;

      const marker = rawLine[0];
      if (marker === '+') {
        commentable.add(currentNewLine);
        added.add(currentNewLine);
        currentNewLine++;
      } else if (marker === ' ') {
        commentable.add(currentNewLine);
        currentNewLine++;
      } else if (marker === '-' || marker === '\\') {
        // removed line or "\ No newline at end of file" — does not advance HEAD
      } else if (marker === undefined || rawLine === '') {
        // blank trailing line in the patch — ignore safely
      } else {
        // Unknown marker (shouldn't happen in valid unified diffs); skip
      }
    }

    index.set(file.filename, { commentableLines: commentable, addedLines: added });
  }

  return index;
}

/**
 * Snap an AI-suggested (file, startLine, endLine) to the nearest valid
 * anchor inside a diff hunk. Returns null if the file isn't in the diff
 * or no nearby line is commentable.
 *
 * "Nearby" = within 3 lines, since AI line numbers are often off-by-one
 * due to how it counts hunk headers vs. file lines.
 */
export function snapToAnchor(
  index: DiffAnchorIndex,
  file: string,
  startLine: number | null,
  endLine: number | null
): { startLine: number; endLine: number } | null {
  const anchors = index.get(file);
  if (!anchors || anchors.commentableLines.size === 0) return null;
  if (startLine == null) return null;

  const snap = (line: number): number | null => {
    if (anchors.commentableLines.has(line)) return line;
    for (let delta = 1; delta <= 3; delta++) {
      if (anchors.commentableLines.has(line - delta)) return line - delta;
      if (anchors.commentableLines.has(line + delta)) return line + delta;
    }
    return null;
  };

  const snappedStart = snap(startLine);
  if (snappedStart == null) return null;

  const snappedEnd = endLine != null ? snap(endLine) : snappedStart;
  const finalEnd = snappedEnd != null && snappedEnd >= snappedStart ? snappedEnd : snappedStart;

  return { startLine: snappedStart, endLine: finalEnd };
}
