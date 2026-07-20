-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'EDITOR', 'SEO_MANAGER');

-- CreateEnum
CREATE TYPE "PostStatus" AS ENUM ('draft', 'in_review', 'scheduled', 'published', 'archived');

-- CreateEnum
CREATE TYPE "SubmissionStatus" AS ENUM ('new', 'reviewed', 'replied', 'archived');

-- CreateEnum
CREATE TYPE "RedirectType" AS ENUM ('R301', 'R302');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'ADMIN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlogPost" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "excerpt" TEXT NOT NULL,
    "directAnswer" TEXT NOT NULL,
    "keyTakeaways" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "contentJson" JSONB,
    "checklist" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "faqs" JSONB,
    "authorName" TEXT NOT NULL,
    "authorRole" TEXT NOT NULL,
    "authorBio" TEXT NOT NULL,
    "reviewerName" TEXT,
    "reviewerRole" TEXT,
    "publishedDate" TIMESTAMP(3),
    "updatedDate" TIMESTAMP(3),
    "readingTime" TEXT,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "relatedServices" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "relatedServiceSlugs" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "relatedPosts" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "metaTitle" TEXT,
    "metaDescription" TEXT,
    "schemaDescription" TEXT,
    "status" "PostStatus" NOT NULL DEFAULT 'draft',
    "noindex" BOOLEAN NOT NULL DEFAULT false,
    "canonicalUrl" TEXT,
    "ogTitle" TEXT,
    "ogDescription" TEXT,
    "ogImage" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BlogPost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PageSEO" (
    "id" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "pageName" TEXT NOT NULL,
    "metaTitle" TEXT,
    "metaDescription" TEXT,
    "canonicalUrl" TEXT,
    "ogTitle" TEXT,
    "ogDescription" TEXT,
    "ogImage" TEXT,
    "twitterTitle" TEXT,
    "twitterDescription" TEXT,
    "twitterImage" TEXT,
    "noindex" BOOLEAN NOT NULL DEFAULT false,
    "nofollow" BOOLEAN NOT NULL DEFAULT false,
    "schemaType" TEXT,
    "customJsonLd" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PageSEO_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactSubmission" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "companyWebsite" TEXT,
    "currentWebsiteUrl" TEXT,
    "serviceNeeded" TEXT,
    "budgetRange" TEXT,
    "timeline" TEXT,
    "message" TEXT NOT NULL,
    "sourcePage" TEXT,
    "status" "SubmissionStatus" NOT NULL DEFAULT 'new',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContactSubmission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditRequest" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "company" TEXT,
    "websiteUrl" TEXT NOT NULL,
    "focus" TEXT,
    "budgetRange" TEXT,
    "message" TEXT NOT NULL,
    "sourcePage" TEXT,
    "status" "SubmissionStatus" NOT NULL DEFAULT 'new',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AuditRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Redirect" (
    "id" TEXT NOT NULL,
    "sourcePath" TEXT NOT NULL,
    "destinationUrl" TEXT NOT NULL,
    "type" "RedirectType" NOT NULL DEFAULT 'R301',
    "active" BOOLEAN NOT NULL DEFAULT true,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Redirect_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SiteSetting" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SiteSetting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MediaAsset" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "alt" TEXT,
    "caption" TEXT,
    "category" TEXT,
    "width" INTEGER,
    "height" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MediaAsset_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AEOBlock" (
    "id" TEXT NOT NULL,
    "pagePath" TEXT NOT NULL,
    "primaryQuestion" TEXT,
    "directAnswer" TEXT,
    "keyTakeaways" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "faqs" JSONB,
    "entityMentions" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "reviewedBy" TEXT,
    "lastReviewedDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AEOBlock_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "BlogPost_slug_key" ON "BlogPost"("slug");

-- CreateIndex
CREATE INDEX "BlogPost_status_idx" ON "BlogPost"("status");

-- CreateIndex
CREATE INDEX "BlogPost_category_idx" ON "BlogPost"("category");

-- CreateIndex
CREATE UNIQUE INDEX "PageSEO_path_key" ON "PageSEO"("path");

-- CreateIndex
CREATE INDEX "ContactSubmission_status_idx" ON "ContactSubmission"("status");

-- CreateIndex
CREATE INDEX "AuditRequest_status_idx" ON "AuditRequest"("status");

-- CreateIndex
CREATE UNIQUE INDEX "Redirect_sourcePath_key" ON "Redirect"("sourcePath");

-- CreateIndex
CREATE UNIQUE INDEX "SiteSetting_key_key" ON "SiteSetting"("key");

-- CreateIndex
CREATE UNIQUE INDEX "AEOBlock_pagePath_key" ON "AEOBlock"("pagePath");

