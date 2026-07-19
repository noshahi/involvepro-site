import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { InsightsHero } from "@/components/sections/InsightsHero";
import { FeaturedInsight } from "@/components/sections/FeaturedInsight";
import { InsightsGrid } from "@/components/sections/InsightsGrid";
import { InsightNewsletterCTA } from "@/components/sections/InsightNewsletterCTA";
import { WorkCTA } from "@/components/sections/WorkCTA";
import { posts, getFeaturedPost } from "@/data/posts";
import { blogSchema, collectionPageSchema, breadcrumbSchema, jsonLdProps } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Shopify, SEO, SaaS & AI Automation Guides | involvepro",
  description:
    "Practical guides for Shopify, WordPress, SEO, AEO, SaaS, AI automation, full-stack development, ecommerce growth, and website maintenance.",
};

export default function InsightsPage() {
  const featured = getFeaturedPost();

  const blog = blogSchema({
    name: "Involvepro Insights",
    description:
      "Practical guides for Shopify, WordPress, SEO, AEO, SaaS, AI automation, full-stack development, ecommerce growth, and website maintenance.",
    path: "/insights",
  });
  const collection = collectionPageSchema({
    name: "Involvepro Insights",
    description:
      "Practical guides for Shopify, WordPress, SEO, AEO, SaaS, AI automation, full-stack development, ecommerce growth, and website maintenance.",
    path: "/insights",
  });
  const breadcrumbs = breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Insights", path: "/insights" },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdProps(blog)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdProps(collection)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdProps(breadcrumbs)} />
      <Header />
      <main id="main-content" className="flex-1">
        <InsightsHero />
        {featured && <FeaturedInsight post={featured} />}
        <InsightsGrid posts={posts} />
        <InsightNewsletterCTA />
        <WorkCTA
          headline="Need help applying this to your website?"
          body="Schedule a meeting and we will review the right next step for your website, store, SEO structure, automation workflow, or SaaS build."
        />
      </main>
      <Footer />
    </>
  );
}
