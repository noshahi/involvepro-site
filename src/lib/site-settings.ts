export const SITE_SETTING_KEYS = [
  "siteName",
  "contactEmail",
  "contactPhone",
  "calendlyUrl",
  "shopifyPartnerUrl",
  "upworkUrl",
  "googleBusinessProfileUrl",
  "linkedinUrl",
  "facebookUrl",
  "footerDescription",
  "globalCtaLabel",
  "globalCtaUrl",
] as const;

export type SiteSettingKey = (typeof SITE_SETTING_KEYS)[number];

export const SITE_SETTING_LABELS: Record<SiteSettingKey, string> = {
  siteName: "Site Name",
  contactEmail: "Contact Email",
  contactPhone: "Phone",
  calendlyUrl: "Calendly URL",
  shopifyPartnerUrl: "Shopify Partner URL",
  upworkUrl: "Upwork URL",
  googleBusinessProfileUrl: "Google Business Profile URL",
  linkedinUrl: "LinkedIn URL",
  facebookUrl: "Facebook URL",
  footerDescription: "Footer Description",
  globalCtaLabel: "Global CTA Label",
  globalCtaUrl: "Global CTA URL",
};
