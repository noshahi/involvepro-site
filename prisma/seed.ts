import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { posts } from "../src/data/posts";

const PAGE_SEO_SEED = [
  { path: "/", pageName: "Home" },
  { path: "/services/", pageName: "Services" },
  { path: "/work/", pageName: "Work" },
  { path: "/process/", pageName: "Process" },
  { path: "/insights/", pageName: "Insights" },
  { path: "/contact/", pageName: "Contact" },
  { path: "/free-audit/", pageName: "Free Audit" },
];

async function main() {
  if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL is not set. Aborting seed.");
    process.exit(1);
  }

  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
  const prisma = new PrismaClient({ adapter });

  console.log("Seeding PageSEO records...");
  for (const page of PAGE_SEO_SEED) {
    await prisma.pageSEO.upsert({
      where: { path: page.path },
      update: {},
      create: { path: page.path, pageName: page.pageName },
    });
  }

  if (process.env.SEED_POSTS === "true") {
    console.log("Seeding static posts into BlogPost table...");
    for (const post of posts) {
      const existing = await prisma.blogPost.findUnique({ where: { slug: post.slug } });
      if (existing) continue;

      await prisma.blogPost.create({
        data: {
          title: post.title,
          slug: post.slug,
          category: post.category,
          tags: post.tags,
          excerpt: post.excerpt,
          directAnswer: post.directAnswer,
          keyTakeaways: post.keyTakeaways,
          contentJson: {
            markdown: post.sections.map((s) => `## ${s.heading}\n\n${s.body}`).join("\n\n"),
          },
          checklist: post.checklist ?? [],
          faqs: post.faqs,
          authorName: post.author.name,
          authorRole: post.author.role,
          authorBio: post.author.bio,
          reviewerName: post.reviewer?.name ?? null,
          reviewerRole: post.reviewer?.role ?? null,
          publishedDate: new Date(post.publishedDate),
          updatedDate: new Date(post.updatedDate),
          readingTime: post.readingTime,
          featured: post.featured,
          relatedServices: post.relatedServices,
          relatedServiceSlugs: post.relatedServiceSlugs,
          relatedPosts: post.relatedPosts,
          metaTitle: post.metaTitle,
          metaDescription: post.metaDescription,
          schemaDescription: post.schemaDescription,
          status: "published",
        },
      });
    }
  }

  console.log("Seed complete.");
  await prisma.$disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
