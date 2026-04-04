-- CreateTable
CREATE TABLE "sample_testing" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sample_testing_pkey" PRIMARY KEY ("id")
);
