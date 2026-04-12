-- Drop the sample_testing table (removed from schema)
DROP TABLE IF EXISTS "sample_testing";

-- ============================================================
-- Rename User -> users and columns to snake_case
-- ============================================================
ALTER TABLE "User" RENAME TO "users";

ALTER TABLE "users" RENAME COLUMN "avatarUrl" TO "avatar_url";
ALTER TABLE "users" RENAME COLUMN "createdAt" TO "created_at";
ALTER TABLE "users" RENAME COLUMN "updatedAt" TO "updated_at";

-- ============================================================
-- Rename GithubIntegration -> github_integrations and columns
-- ============================================================
ALTER TABLE "GithubIntegration" RENAME TO "github_integrations";

ALTER TABLE "github_integrations" RENAME COLUMN "userId" TO "user_id";
ALTER TABLE "github_integrations" RENAME COLUMN "githubId" TO "github_id";
ALTER TABLE "github_integrations" RENAME COLUMN "accessToken" TO "access_token";
ALTER TABLE "github_integrations" RENAME COLUMN "createdAt" TO "created_at";
ALTER TABLE "github_integrations" RENAME COLUMN "updatedAt" TO "updated_at";

-- Add the new avatar_url column to github_integrations
ALTER TABLE "github_integrations" ADD COLUMN IF NOT EXISTS "avatar_url" TEXT;

-- Make user_id unique (one GitHub account per user)
-- First drop the old index if it exists, then create unique constraint
DROP INDEX IF EXISTS "GithubIntegration_userId_idx";
DROP INDEX IF EXISTS "GithubIntegration_githubId_key";

CREATE UNIQUE INDEX IF NOT EXISTS "github_integrations_user_id_key" ON "github_integrations"("user_id");
CREATE UNIQUE INDEX IF NOT EXISTS "github_integrations_github_id_key" ON "github_integrations"("github_id");
CREATE INDEX IF NOT EXISTS "github_integrations_user_id_idx" ON "github_integrations"("user_id");
