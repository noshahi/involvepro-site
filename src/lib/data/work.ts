export type WorkItem = {
  name: string;
  platform: string;
  tags: string[];
  result: string;
  size: "large" | "medium" | "small";
  gradient: string;
};

export const workItems: WorkItem[] = [
  {
    name: "Ecommerce storefront rebuild",
    platform: "Shopify",
    tags: ["Ecommerce", "CRO", "SEO"],
    result: "Custom-coded rebuild off a page builder — faster load times and a cleaner checkout path.",
    size: "large",
    gradient: "linear-gradient(135deg, #082848, #50A932)",
  },
  {
    name: "B2B lead engine",
    platform: "WordPress",
    tags: ["WordPress", "SEO"],
    result: "Technical SEO structure and content system built for organic lead volume.",
    size: "medium",
    gradient: "linear-gradient(135deg, #06120D, #00BCEA)",
  },
  {
    name: "SaaS MVP",
    platform: "Full Stack",
    tags: ["SaaS", "Full Stack"],
    result: "Architecture and MVP build for an early-stage product, launch-ready in one cycle.",
    size: "medium",
    gradient: "linear-gradient(135deg, #082848, #061527)",
  },
  {
    name: "Revenue optimization sprint",
    platform: "Shopify",
    tags: ["CRO"],
    result: "Merchandising and checkout changes across a high-traffic catalog.",
    size: "small",
    gradient: "linear-gradient(135deg, #2F7A21, #50A932)",
  },
  {
    name: "AI support workflow",
    platform: "Automation",
    tags: ["AI", "Automation"],
    result: "Assistant + human review loop for inbound customer support.",
    size: "small",
    gradient: "linear-gradient(135deg, #00BCEA, #082848)",
  },
  {
    name: "Local service site",
    platform: "WordPress",
    tags: ["WordPress", "Local SEO"],
    result: "Custom-coded site replacing a slow, unmaintainable theme.",
    size: "small",
    gradient: "linear-gradient(135deg, #061527, #50A932)",
  },
];
