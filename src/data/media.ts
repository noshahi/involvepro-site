export type SiteImageCategory =
  | "team"
  | "process"
  | "strategy"
  | "development"
  | "ecommerce"
  | "support"
  | "office"
  | "project"
  | "client-work"
  | "meeting"
  | "audit"
  | "automation";

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
 * - "team"        -> Home proof/testimonial strip, About story section
 * - "strategy"    -> Process discovery/strategy panels, RequirementGathering
 * - "process"     -> Process communication section, ProcessOverviewRail, CommunicationModel
 * - "development" -> Service detail pages (Shopify/WordPress/full-stack), ProjectServicesDelivered
 * - "ecommerce"   -> Shopify/CRO service pages, ecommerce case studies
 * - "support"     -> Website Maintenance & Support service page, ProcessQualityAssurance
 * - "office"      -> About page, Contact trust panel
 * - "project"     -> Work project detail pages, as a supplement to abstract visuals
 * - "client-work" -> Work list/detail pages, case study proof blocks
 * - "meeting"     -> Contact trust panel, Schedule a Meeting / Calendly context
 * - "audit"       -> Free Audit value section
 * - "automation"  -> AI/automation service pages, Services hero visuals where relevant
 */
export const siteImages: SiteImage[] = [];

export function getSiteImagesByCategory(category: SiteImageCategory): SiteImage[] {
  return siteImages.filter((image) => image.category === category);
}

export function getSiteImageById(id: string): SiteImage | undefined {
  return siteImages.find((image) => image.id === id);
}
