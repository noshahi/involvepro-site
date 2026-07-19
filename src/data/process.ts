export type ProcessStep = {
  num: string;
  title: string;
  description: string;
};

export const processSteps: ProcessStep[] = [
  {
    num: "01",
    title: "Discovery & Requirements",
    description:
      "We review the business, audience, current systems, goals, pain points, competitors, existing assets, and technical constraints.",
  },
  {
    num: "02",
    title: "Strategy & Architecture",
    description:
      "We map the sitemap, user flows, service structure, content model, technology stack, SEO requirements, integrations, and launch path.",
  },
  {
    num: "03",
    title: "UI/UX & Content Structure",
    description:
      "We plan the experience before the build, including navigation, page hierarchy, CTAs, conversion flows, and content sections.",
  },
  {
    num: "04",
    title: "Development",
    description:
      "We build using the right platform and architecture, whether that is Shopify, WordPress, Next.js, SaaS infrastructure, AI workflows, or custom tooling.",
  },
  {
    num: "05",
    title: "SEO, AEO & Tracking Setup",
    description:
      "We implement metadata, schema-ready sections, heading structure, internal links, analytics, events, and AI-search-friendly content patterns.",
  },
  {
    num: "06",
    title: "QA & Launch",
    description:
      "We test responsiveness, speed, browser behavior, forms, integrations, tracking, redirects, content, and key user paths before launch.",
  },
  {
    num: "07",
    title: "Optimization & Support",
    description: "We monitor, refine, update, fix, report, and keep improving the system after launch.",
  },
];

export type RequirementGroup = {
  key: string;
  title: string;
  items: string[];
};

export const requirementGroups: RequirementGroup[] = [
  {
    key: "business-strategy",
    title: "Business & Strategy",
    items: [
      "Business goals",
      "Target audience",
      "Competitors or reference websites",
      "Primary conversion goal",
      "Desired functionality",
      "Timeline expectations",
    ],
  },
  {
    key: "brand-content",
    title: "Brand & Content",
    items: [
      "Logo files",
      "Brand colors and typography",
      "Brand guidelines",
      "Website copy or content direction",
      "Product/service information",
      "About and contact content",
      "Photography, banners, graphics, or design assets",
    ],
  },
  {
    key: "platform-access",
    title: "Platform & Access",
    items: [
      "Domain details",
      "Hosting or platform access",
      "Shopify store access or collaborator approval",
      "WordPress access where applicable",
      "CMS access where applicable",
      "Existing admin accounts or required permissions",
    ],
  },
  {
    key: "ecommerce",
    title: "Ecommerce Requirements",
    items: [
      "Product information",
      "Product images",
      "Categories and subcategories",
      "Payment gateway preferences",
      "Shipping methods, rates, and zones",
      "Existing customer, order, or user data if migrating",
      "Required apps or third-party integrations",
    ],
  },
  {
    key: "seo-analytics",
    title: "SEO & Analytics",
    items: [
      "Google Analytics access",
      "Google Search Console access",
      "Existing keyword or SEO reports",
      "Current sitemap or important URLs",
      "Redirect requirements",
      "Tracking requirements",
      "Local SEO or Google Business Profile access where applicable",
    ],
  },
  {
    key: "technical-integration",
    title: "Technical & Integration",
    items: [
      "API documentation",
      "CRM or email platform access",
      "Automation tools",
      "Database or export files",
      "Existing workflows",
      "Required documents, manuals, resources, certifications, or downloads",
    ],
  },
];

export type TimelineBand = {
  label: string;
  duration: string;
  weight: number;
};

export const timelineBands: TimelineBand[] = [
  { label: "Discovery", duration: "1–2 weeks", weight: 1.5 },
  { label: "Design", duration: "2–4+ weeks depending on scope", weight: 3 },
  { label: "Development", duration: "3–8+ weeks depending on complexity", weight: 5.5 },
  { label: "QA", duration: "1–2 weeks", weight: 1.5 },
  { label: "Launch", duration: "1 week or less for most prepared launches", weight: 1 },
];

export const largeBuildTimeline = {
  label: "Larger Shopify, SaaS, or custom builds",
  duration: "10–12+ weeks depending on features, integrations, content, and approval cycles",
};

export type EngagementType = {
  key: string;
  title: string;
  bestFor: string;
  typicalFocus: string;
  ctaLabel: string;
};

export const engagementTypes: EngagementType[] = [
  {
    key: "project-build",
    title: "Project Build",
    bestFor: "New websites, Shopify builds, redesigns, SaaS MVPs, or custom tools.",
    typicalFocus: "Full-scope discovery through launch, on a defined timeline and deliverable set.",
    ctaLabel: "Discuss this path",
  },
  {
    key: "optimization-sprint",
    title: "Optimization Sprint",
    bestFor: "CRO, SEO implementation, performance fixes, AEO/GEO improvements, and technical cleanup.",
    typicalFocus: "A focused, time-boxed engagement against an existing site or store.",
    ctaLabel: "Discuss this path",
  },
  {
    key: "ongoing-support",
    title: "Ongoing Support",
    bestFor: "Monthly website updates, Shopify/WordPress maintenance, tracking, QA, and implementation support.",
    typicalFocus: "A retainer or as-needed relationship with defined response times.",
    ctaLabel: "Discuss this path",
  },
  {
    key: "automation-build",
    title: "Automation Build",
    bestFor: "AI workflows, reporting automations, CRM/ecommerce integrations, and internal tools.",
    typicalFocus: "Mapping a workflow, then building and monitoring the automation around it.",
    ctaLabel: "Discuss this path",
  },
];

export type CommunicationMethod = {
  label: string;
  icon: "mail" | "video" | "message-circle" | "message-square" | "users" | "monitor";
};

export const communicationMethods: CommunicationMethod[] = [
  { label: "Email", icon: "mail" },
  { label: "Microsoft Teams", icon: "users" },
  { label: "Google Chat", icon: "message-square" },
  { label: "WhatsApp", icon: "message-circle" },
  { label: "Google Meet", icon: "video" },
  { label: "Zoom", icon: "monitor" },
];

export type CommunicationMilestone = {
  title: string;
  description: string;
};

export const communicationMilestones: CommunicationMilestone[] = [
  { title: "Kickoff alignment", description: "Scope, timeline, access, and priorities confirmed before work starts." },
  { title: "Milestone updates", description: "Structured check-ins tied to project phases, not ad hoc pings." },
  { title: "Feedback rounds", description: "Defined review cycles so revisions stay scoped and on schedule." },
  { title: "Launch checklist", description: "A shared, reviewed checklist before anything goes live." },
  { title: "Post-launch support notes", description: "Clear documentation of what was delivered and what happens next." },
];

export const qaChecklist: string[] = [
  "Desktop, tablet, and mobile responsiveness",
  "Cross-browser review",
  "Forms and CTAs",
  "Navigation and menu behavior",
  "Page speed basics",
  "SEO metadata",
  "Heading hierarchy",
  "Schema-ready sections",
  "Redirects where needed",
  "Analytics and tracking",
  "Core user flows",
  "Final content review",
];
