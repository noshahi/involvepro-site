import { isDatabaseConfigured } from "@/lib/db";
import { DbSetupNotice } from "@/components/admin/ui";
import PostForm, { type PostFormValues } from "../post-form";
import { createPostAction } from "../actions";

const emptyValues: PostFormValues = {
  title: "",
  slug: "",
  category: "",
  tags: "",
  excerpt: "",
  directAnswer: "",
  keyTakeaways: "",
  contentMarkdown: "",
  checklist: "",
  faqsRaw: "",
  authorName: "involvepro Team",
  authorRole: "Shopify, SEO, and Web Development Team",
  authorBio: "",
  reviewerName: "",
  reviewerRole: "",
  relatedServices: "",
  relatedServiceSlugs: "",
  relatedPosts: "",
  metaTitle: "",
  metaDescription: "",
  schemaDescription: "",
  canonicalUrl: "",
  ogTitle: "",
  ogDescription: "",
  ogImage: "",
  readingTime: "",
  noindex: false,
  featured: false,
  status: "draft",
};

export default async function NewPostPage() {
  if (!isDatabaseConfigured()) {
    return (
      <div className="space-y-6">
        <h1 className="text-xl font-semibold text-[var(--brand-navy)]">New Post</h1>
        <DbSetupNotice feature="creating posts" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold text-[var(--brand-navy)]">New Post</h1>
      <PostForm action={createPostAction} initialValues={emptyValues} submitLabel="Create Post" />
    </div>
  );
}
