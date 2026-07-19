export type ToolGroup = {
  category: string;
  tools: string[];
};

export const toolGroups: ToolGroup[] = [
  { category: "Ecommerce", tools: ["Shopify", "WooCommerce"] },
  { category: "Frontend", tools: ["Next.js", "React", "Tailwind", "GSAP"] },
  { category: "Backend", tools: ["Node.js", "APIs", "PostgreSQL"] },
  { category: "Marketing", tools: ["GA4", "Search Console", "Klaviyo", "Meta Pixel"] },
  { category: "Automation", tools: ["Make", "Zapier", "OpenAI", "Webhooks"] },
  { category: "CMS", tools: ["WordPress", "Headless CMS", "ACF"] },
];
