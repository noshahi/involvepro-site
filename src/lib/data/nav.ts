import { services, serviceGroups } from "@/data/services";

const navServiceGroupDefs: { key: string; slugs: string[] }[] = [
  { key: "ecommerce", slugs: ["shopify-development", "shopify-store-design", "shopify-revenue-optimization"] },
  { key: "websites", slugs: ["wordpress-development", "enterprise-marketing-websites", "ui-ux-design"] },
  { key: "growth", slugs: ["seo", "aeo-geo-ai-search-optimization", "cro-ab-testing-funnel-optimization"] },
  { key: "software", slugs: ["saas-product-development", "full-stack-development", "mvp-development"] },
  { key: "ai-automation", slugs: ["ai-automation", "ai-chatbot-llm-integration", "workflow-automation"] },
];

export const navServiceGroups = navServiceGroupDefs.map((group) => ({
  heading: serviceGroups.find((g) => g.key === group.key)?.label ?? group.key,
  items: group.slugs
    .map((slug) => services.find((s) => s.slug === slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s)),
}));

export const navLinks = [
  { label: "Services", href: "/services", hasMegaMenu: true },
  { label: "Work", href: "/#work" },
  { label: "Process", href: "/#process" },
  { label: "Insights", href: "/#insights" },
  { label: "Contact", href: "/#contact" },
];
