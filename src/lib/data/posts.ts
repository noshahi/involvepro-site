export type Post = {
  category: string;
  title: string;
  excerpt: string;
  readingTime: string;
};

export const posts: Post[] = [
  {
    category: "Shopify",
    title: "How to Plan a Shopify Website Redesign Without Hurting SEO",
    excerpt: "A practical checklist for preserving rankings, redirects, and structured data through a full storefront rebuild.",
    readingTime: "7 min read",
  },
  {
    category: "AI Automation",
    title: "What AI Automation Should Actually Do for Your Business",
    excerpt: "Less manual work, faster responses, cleaner reporting — a real framework for scoping AI into operations.",
    readingTime: "6 min read",
  },
  {
    category: "SaaS",
    title: "SaaS MVP Planning: What to Build First",
    excerpt: "The core feature set, data model, and architecture decisions that keep an MVP from becoming a rewrite.",
    readingTime: "8 min read",
  },
];
