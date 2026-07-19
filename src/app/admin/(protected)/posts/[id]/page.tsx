import { notFound } from "next/navigation";
import { isDatabaseConfigured, prisma } from "@/lib/db";
import { DbSetupNotice } from "@/components/admin/ui";
import PostForm, { type PostFormValues } from "../post-form";
import { updatePostAction } from "../actions";
import { formatFaqs } from "@/lib/admin-schemas";

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  if (!isDatabaseConfigured()) {
    return (
      <div className="space-y-6">
        <h1 className="text-xl font-semibold text-[var(--brand-navy)]">Edit Post</h1>
        <DbSetupNotice feature="editing posts" />
      </div>
    );
  }

  const post = await prisma.blogPost.findUnique({ where: { id } });
  if (!post) notFound();

  const faqs = Array.isArray(post.faqs) ? (post.faqs as { question: string; answer: string }[]) : [];
  const contentJson = post.contentJson as { markdown?: string } | null;

  const initialValues: PostFormValues = {
    title: post.title,
    slug: post.slug,
    category: post.category,
    tags: post.tags.join(", "),
    excerpt: post.excerpt,
    directAnswer: post.directAnswer,
    keyTakeaways: post.keyTakeaways.join("\n"),
    contentMarkdown: contentJson?.markdown ?? "",
    checklist: post.checklist.join("\n"),
    faqsRaw: formatFaqs(faqs),
    authorName: post.authorName,
    authorRole: post.authorRole,
    authorBio: post.authorBio,
    reviewerName: post.reviewerName ?? "",
    reviewerRole: post.reviewerRole ?? "",
    relatedServices: post.relatedServices.join(", "),
    relatedServiceSlugs: post.relatedServiceSlugs.join(", "),
    relatedPosts: post.relatedPosts.join(", "),
    metaTitle: post.metaTitle ?? "",
    metaDescription: post.metaDescription ?? "",
    schemaDescription: post.schemaDescription ?? "",
    canonicalUrl: post.canonicalUrl ?? "",
    ogTitle: post.ogTitle ?? "",
    ogDescription: post.ogDescription ?? "",
    ogImage: post.ogImage ?? "",
    readingTime: post.readingTime ?? "",
    noindex: post.noindex,
    featured: post.featured,
    status: post.status,
  };

  const boundAction = updatePostAction.bind(null, post.id);

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold text-[var(--brand-navy)]">Edit Post</h1>
      <PostForm action={boundAction} initialValues={initialValues} submitLabel="Save Changes" />
    </div>
  );
}
