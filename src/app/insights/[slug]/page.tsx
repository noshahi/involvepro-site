import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ArticleHero } from "@/components/sections/ArticleHero";
import { ArticleDirectAnswer } from "@/components/sections/ArticleDirectAnswer";
import { ArticleKeyTakeaways } from "@/components/sections/ArticleKeyTakeaways";
import { ArticleTOC } from "@/components/sections/ArticleTOC";
import { ArticleBody } from "@/components/sections/ArticleBody";
import { ArticleChecklist } from "@/components/sections/ArticleChecklist";
import { ArticleFAQ } from "@/components/sections/ArticleFAQ";
import { ArticleAuthorBox } from "@/components/sections/ArticleAuthorBox";
import { ArticleReviewBlock } from "@/components/sections/ArticleReviewBlock";
import { ArticleRelatedServices } from "@/components/sections/ArticleRelatedServices";
import { ArticleRelatedPosts } from "@/components/sections/ArticleRelatedPosts";
import { ArticleCTA } from "@/components/sections/ArticleCTA";
import { getPostBySlug, getRelatedPosts, getAllPostSlugs } from "@/data/posts";
import { blogPostingSchema, faqPageSchema, breadcrumbSchema, jsonLdProps } from "@/lib/schema";

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.metaTitle,
    description: post.metaDescription,
  };
}

export default async function InsightArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(post);

  const articleSchema = blogPostingSchema({
    title: post.title,
    description: post.schemaDescription,
    slug: post.slug,
    authorName: post.author.name,
    publishedDate: post.publishedDate,
    updatedDate: post.updatedDate,
  });
  const breadcrumbs = breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Insights", path: "/insights" },
    { name: post.title, path: `/insights/${post.slug}` },
  ]);
  const faqSchema = post.faqs.length > 0 ? faqPageSchema(post.faqs) : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdProps(articleSchema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdProps(breadcrumbs)} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdProps(faqSchema)} />}
      <Header />
      <main id="main-content" className="flex-1">
        <ArticleHero post={post} />

        <section aria-label="Article content" className="bg-white px-6 py-16 sm:py-20">
          <div className="mx-auto grid max-w-[1080px] grid-cols-1 gap-10 lg:grid-cols-[1fr_260px]">
            <div className="flex flex-col gap-10">
              <ArticleDirectAnswer answer={post.directAnswer} />
              <ArticleKeyTakeaways takeaways={post.keyTakeaways} />
              <ArticleTOC sections={post.sections} variant="mobile" />
              <ArticleBody sections={post.sections} />
              {post.checklist && <ArticleChecklist items={post.checklist} />}
              <ArticleFAQ faqs={post.faqs} />
              <ArticleReviewBlock reviewer={post.reviewer} />
              <ArticleAuthorBox author={post.author} />
            </div>

            <aside>
              <ArticleTOC sections={post.sections} variant="desktop" />
            </aside>
          </div>
        </section>

        <ArticleRelatedServices slugs={post.relatedServiceSlugs} />
        <ArticleRelatedPosts posts={related} />
        <ArticleCTA showAuditLink={post.category === "Shopify"} />
      </main>
      <Footer />
    </>
  );
}

export const dynamicParams = false;
