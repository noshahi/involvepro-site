export type PrimaryService = {
  title: string;
  category: string;
  description: string;
  icon: string;
  accent: "green" | "blue" | "navy";
};

export type SecondaryService = {
  title: string;
  description: string;
  icon: string;
};

export const primaryServices: PrimaryService[] = [
  {
    title: "Shopify Development",
    category: "Ecommerce",
    description: "Custom-coded storefronts built for speed, scale, and real conversion — not template shortcuts.",
    icon: "shopping-bag",
    accent: "green",
  },
  {
    title: "SaaS Product Development",
    category: "Product",
    description: "From MVP to scaled platform, engineered on a foundation that won't need a rewrite later.",
    icon: "layers",
    accent: "blue",
  },
  {
    title: "AI Automation",
    category: "Operations",
    description: "Assistants, workflows, and integrations that plug into how your team already works.",
    icon: "workflow",
    accent: "blue",
  },
  {
    title: "SEO + AEO",
    category: "Growth",
    description: "Technical SEO and answer-engine optimization built into the code, not bolted on after launch.",
    icon: "search",
    accent: "green",
  },
];

export const secondaryServices: SecondaryService[] = [
  { title: "WordPress Development", description: "Custom themes and blocks with real technical ownership.", icon: "globe" },
  { title: "UI/UX Design", description: "Interfaces designed around how buyers actually decide.", icon: "layout-grid" },
  { title: "Full Stack Development", description: "Custom platforms, dashboards, and internal tools.", icon: "code-2" },
  { title: "Shopify Revenue Optimization", description: "CRO and merchandising for existing stores.", icon: "trending-up" },
  { title: "Website Maintenance", description: "Monitoring, updates, and technical support after launch.", icon: "shield-check" },
  { title: "Workflow Automation", description: "Manual processes turned into reliable systems.", icon: "zap" },
];

export const marqueeServices: string[] = [
  "Shopify Development",
  "Shopify Store Design",
  "Shopify Revenue Optimization",
  "WordPress Development",
  "SEO",
  "AEO & GEO",
  "SaaS Product Development",
  "AI Automation",
  "Full Stack Development",
  "Workflow Automation",
  "Maintenance & Support",
];
