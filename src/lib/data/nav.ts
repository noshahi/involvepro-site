export type NavServiceItem = {
  title: string;
  description: string;
  icon: string;
};

export type NavServiceGroup = {
  heading: string;
  items: NavServiceItem[];
};

export const navServiceGroups: NavServiceGroup[] = [
  {
    heading: "Ecommerce",
    items: [
      { title: "Shopify Development", description: "Custom-coded storefronts built for speed and scale.", icon: "shopping-bag" },
      { title: "Shopify Store Design", description: "Conversion-led UX for product and collection pages.", icon: "layout-grid" },
      { title: "Shopify Revenue Optimization", description: "CRO, merchandising, and checkout improvements.", icon: "trending-up" },
    ],
  },
  {
    heading: "Web & Product",
    items: [
      { title: "WordPress Development", description: "Custom themes and blocks, no bloated builders.", icon: "globe" },
      { title: "Full Stack Development", description: "Custom web apps and internal tools, end to end.", icon: "code-2" },
      { title: "SaaS Product Development", description: "MVP to scale, built on a real technical foundation.", icon: "layers" },
    ],
  },
  {
    heading: "Growth & Systems",
    items: [
      { title: "SEO + AEO", description: "Technical SEO built for search engines and AI answers.", icon: "search" },
      { title: "AI Automation", description: "Workflows, assistants, and integrations that save hours.", icon: "workflow" },
      { title: "Website Maintenance", description: "Ongoing monitoring, updates, and technical support.", icon: "shield-check" },
    ],
  },
];

export const navLinks = [
  { label: "Services", href: "#services", hasMegaMenu: true },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "Insights", href: "#insights" },
  { label: "Contact", href: "#contact" },
];
