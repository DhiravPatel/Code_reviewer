-- CreateTable: enabled_repositories
CREATE TABLE "enabled_repositories" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "github_repo_id" INTEGER NOT NULL,
    "full_name" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "owner" TEXT NOT NULL,
    "language" TEXT,
    "description" TEXT,
    "is_private" BOOLEAN NOT NULL DEFAULT false,
    "default_branch" TEXT NOT NULL DEFAULT 'main',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "enabled_repositories_pkey" PRIMARY KEY ("id")
);

-- CreateTable: pr_reviews
CREATE TABLE "pr_reviews" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "repo_id" TEXT NOT NULL,
    "pr_number" INTEGER NOT NULL,
    "pr_title" TEXT NOT NULL,
    "pr_author" TEXT NOT NULL,
    "pr_branch" TEXT NOT NULL,
    "additions" INTEGER NOT NULL DEFAULT 0,
    "deletions" INTEGER NOT NULL DEFAULT 0,
    "files_changed" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "score" INTEGER,
    "verdict" TEXT,
    "summary" JSONB,
    "review_comments" JSONB,
    "reviewed_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pr_reviews_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "enabled_repositories_user_id_github_repo_id_key" ON "enabled_repositories"("user_id", "github_repo_id");
CREATE INDEX "enabled_repositories_user_id_idx" ON "enabled_repositories"("user_id");

CREATE UNIQUE INDEX "pr_reviews_repo_id_pr_number_key" ON "pr_reviews"("repo_id", "pr_number");
CREATE INDEX "pr_reviews_user_id_idx" ON "pr_reviews"("user_id");
CREATE INDEX "pr_reviews_repo_id_idx" ON "pr_reviews"("repo_id");

-- AddForeignKey
ALTER TABLE "enabled_repositories" ADD CONSTRAINT "enabled_repositories_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "pr_reviews" ADD CONSTRAINT "pr_reviews_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "pr_reviews" ADD CONSTRAINT "pr_reviews_repo_id_fkey" FOREIGN KEY ("repo_id") REFERENCES "enabled_repositories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
