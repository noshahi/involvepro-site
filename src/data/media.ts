export type SiteImageCategory =
  | "team"
  | "process"
  | "strategy"
  | "development"
  | "ecommerce"
  | "support"
  | "office"
  | "project";

export type SiteImage = {
  id: string;
  src: string;
  alt: string;
  category: SiteImageCategory;
  usage?: string[];
};

/**
 * Central registry of human/team/project photography used across the site.
 *
 * No real assets are wired in yet — sections that want to use human imagery
 * should pull from this file by id or category rather than hardcoding image
 * paths, so photos can be dropped in later (see docs/content-refinement-notes.md
 * for the planned copy pass that will accompany this).
 *
 * Suggested placement once assets exist:
 * - "team"     -> About/team sections, footer trust strip
 * - "strategy" -> Process discovery/strategy panels, RequirementGathering
 * - "process"  -> ProcessOverviewRail, CommunicationModel
 * - "development" -> Service detail pages (Shopify/WordPress/full-stack), ProjectServicesDelivered
 * - "ecommerce"-> Shopify/CRO service pages, ecommerce case studies
 * - "support"  -> Website Maintenance & Support service page, ProcessQualityAssurance
 * - "office"   -> About page, testimonial/proof sections
 * - "project"  -> Work/[slug] galleries as a supplement to abstract visuals
 */
export const siteImages: SiteImage[] = [];

export function getSiteImagesByCategory(category: SiteImageCategory): SiteImage[] {
  return siteImages.filter((image) => image.category === category);
}

export function getSiteImageById(id: string): SiteImage | undefined {
  return siteImages.find((image) => image.id === id);
}
