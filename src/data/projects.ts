export type ProjectVisual = {
  type: "image" | "abstract" | "browser-frame";
  src?: string;
  alt: string;
};

export type ProjectResult = {
  metric: string;
  description: string;
};

export type Project = {
  title: string;
  slug: string;
  clientName: string;
  websiteUrl?: string;
  industry: string;
  platform: string;
  projectType: "Portfolio Entry" | "Case Study";
  featured: boolean;
  services: string[];
  serviceSlugs: string[];
  tags: string[];
  shortDescription: string;
  overview: string;
  challenge?: string;
  solution?: string;
  deliverables: string[];
  results?: ProjectResult[];
  visuals?: ProjectVisual[];
  gradient: string;
  metaTitle: string;
  metaDescription: string;
  schemaDescription: string;
};

function proj(input: Omit<Project, "metaTitle" | "metaDescription" | "schemaDescription">): Project {
  return {
    ...input,
    metaTitle: `${input.title} | involvepro Work`,
    metaDescription: `See how involvepro approached ${input.tags[0]?.toLowerCase() ?? input.industry.toLowerCase()} for ${input.clientName}, including strategy, development, SEO, automation, and technical execution.`,
    schemaDescription: input.shortDescription,
  };
}

export const projects: Project[] = [
  proj({
    title: "Ecommerce Storefront Rebuild",
    slug: "ecommerce-storefront-rebuild",
    clientName: "Consumer Goods Brand",
    industry: "Ecommerce",
    platform: "Shopify",
    projectType: "Case Study",
    featured: true,
    services: ["Shopify Development", "Shopify Store Design"],
    serviceSlugs: ["shopify-development", "shopify-store-design"],
    tags: ["Shopify", "Ecommerce", "UI/UX"],
    shortDescription:
      "A custom-coded Shopify rebuild off a page builder theme, focused on faster load times and a cleaner checkout path.",
    overview:
      "This brand was running on a page-builder Shopify theme that had become slow and difficult to maintain as their catalog grew. involvepro led a full storefront rebuild using Shopify's Online Store 2.0 architecture, with a focus on section-based flexibility, cleaner product storytelling, and a more scalable technical foundation.",
    challenge:
      "The existing theme relied on a page builder app, which added render-blocking scripts and made every new landing page slower than the last. Product and collection templates were inconsistent, mobile conversion paths were cluttered, and the internal team had no clean way to manage seasonal campaigns without developer help.",
    solution:
      "We rebuilt the storefront as a custom-coded, section-based Shopify theme, restructured product and collection templates around clearer merchandising, and simplified the cart and checkout path. The new theme uses reusable sections so the internal team can build campaign pages without touching code.",
    deliverables: [
      "Custom-coded Shopify Online Store 2.0 theme",
      "Reusable, merchant-editable sections",
      "Redesigned product and collection templates",
      "Simplified cart and mobile checkout flow",
      "Core Web Vitals performance pass",
    ],
    results: [
      { metric: "Faster page loads", description: "Removed page-builder scripts in favor of a lightweight, section-based theme." },
      { metric: "Cleaner checkout path", description: "Reduced steps and friction between cart and purchase completion." },
      { metric: "Self-serve campaign pages", description: "Marketing team can now assemble new landing pages without developer time." },
    ],
    visuals: [
      { type: "browser-frame", alt: "Storefront homepage in a browser frame" },
      { type: "abstract", alt: "Product page layout composition" },
      { type: "abstract", alt: "Mobile checkout flow preview" },
    ],
    gradient: "linear-gradient(135deg, #082848, #50A932)",
  }),
  proj({
    title: "Revenue Optimization Sprint",
    slug: "revenue-optimization-sprint",
    clientName: "DTC Retail Brand",
    industry: "Ecommerce",
    platform: "Shopify",
    projectType: "Case Study",
    featured: true,
    services: ["Shopify Revenue Optimization", "CRO / A/B Testing / Funnel Optimization"],
    serviceSlugs: ["shopify-revenue-optimization", "cro-ab-testing-funnel-optimization"],
    tags: ["Shopify", "CRO", "Ecommerce"],
    shortDescription:
      "Merchandising, product page, and checkout changes across a high-traffic Shopify catalog to strengthen the conversion path.",
    overview:
      "This brand had solid traffic volume but a conversion rate that had plateaued. involvepro ran a structured CRO sprint across product pages, collection merchandising, and the cart-to-checkout flow, prioritized by a full funnel audit rather than guesswork.",
    challenge:
      "Analytics showed healthy top-of-funnel traffic but a steep drop-off between product view and add-to-cart, plus a secondary drop between cart and checkout on mobile. The existing product pages lacked clear trust signals and the mobile cart drawer was easy to miss.",
    solution:
      "We audited the full funnel using GA4 and Shopify analytics, then prioritized a testing roadmap: clearer product page hierarchy, stronger trust and shipping messaging, a redesigned mobile cart drawer, and simplified upsell placement to lift average order value without adding friction.",
    deliverables: [
      "Full-funnel CRO audit",
      "Redesigned product page hierarchy",
      "Mobile cart drawer improvements",
      "Bundle and upsell placement strategy",
      "Quarter-by-quarter testing roadmap",
    ],
    results: [
      { metric: "Stronger conversion path", description: "Reworked product-to-cart flow to reduce drop-off points identified in the funnel audit." },
      { metric: "Clearer mobile cart experience", description: "Redesigned cart drawer with visible next steps and trust messaging." },
      { metric: "Structured testing roadmap", description: "Delivered a prioritized, quarter-by-quarter A/B testing plan for the internal team." },
    ],
    visuals: [
      { type: "abstract", alt: "Funnel audit visualization" },
      { type: "abstract", alt: "Product page before and after comparison" },
    ],
    gradient: "linear-gradient(135deg, #2F7A21, #50A932)",
  }),
  proj({
    title: "B2B Lead Generation Website",
    slug: "b2b-lead-generation-website",
    clientName: "Industrial Services Company",
    industry: "B2B",
    platform: "WordPress",
    projectType: "Case Study",
    featured: true,
    services: ["WordPress Development", "SEO"],
    serviceSlugs: ["wordpress-development", "seo"],
    tags: ["WordPress", "SEO", "B2B"],
    shortDescription:
      "A custom WordPress rebuild with technical SEO structure and a content system built for organic lead volume.",
    overview:
      "This B2B services company was running on a slow, plugin-heavy WordPress site with no real content structure for search. involvepro rebuilt the site with a custom ACF-powered theme and paired it with a technical SEO implementation designed to support long-term organic lead generation.",
    challenge:
      "The existing site depended on a stacked page-builder setup that made every page slow to load and difficult to edit. There was no consistent service page template, metadata was largely missing, and internal linking between service and location pages was thin, limiting organic visibility.",
    solution:
      "We built a custom WordPress theme with ACF-editable sections, reusable service page templates, and a structured content hierarchy. Technical SEO work included metadata, schema markup, internal linking between service and location pages, and a cleaner URL structure.",
    deliverables: [
      "Custom WordPress theme with ACF-editable sections",
      "Reusable service page templates",
      "Technical SEO audit and implementation",
      "Schema markup across key templates",
      "Internal linking structure for service and location pages",
    ],
    results: [
      { metric: "Stronger SEO foundation", description: "Rebuilt metadata, schema, and internal linking across the full site." },
      { metric: "Easier content management", description: "Editable sections let the internal team publish new service pages without developer support." },
      { metric: "Better technical foundation", description: "Removed page-builder bloat in favor of a lean, custom-coded template system." },
    ],
    visuals: [
      { type: "browser-frame", alt: "Service page template in a browser frame" },
      { type: "abstract", alt: "Site architecture and internal linking map" },
    ],
    gradient: "linear-gradient(135deg, #06120D, #00BCEA)",
  }),
  proj({
    title: "Technical SEO Implementation",
    slug: "technical-seo-implementation",
    clientName: "Regional Service Provider",
    industry: "Local Business",
    platform: "WordPress",
    projectType: "Case Study",
    featured: false,
    services: ["SEO", "Analytics, Tracking & Reporting"],
    serviceSlugs: ["seo", "analytics-tracking-reporting"],
    tags: ["SEO", "Local Business", "WordPress"],
    shortDescription:
      "A full technical SEO pass covering site structure, metadata, schema, and search console cleanup for a regional service business.",
    overview:
      "This regional business had an existing website but stalled organic traffic and no reliable way to measure search performance. involvepro ran a technical SEO implementation focused on fixing structural issues before layering in content strategy.",
    challenge:
      "The site had duplicate metadata across pages, missing schema markup, unoptimized heading structure, and a Search Console account that had never been fully configured, making it difficult to diagnose why organic traffic had stalled.",
    solution:
      "We audited and rebuilt the site's technical SEO foundation: unique metadata per page, schema markup for local business and service entities, corrected heading hierarchy, sitemap and robots.txt review, and a properly configured GA4 and Search Console setup for ongoing reporting.",
    deliverables: [
      "Full technical SEO audit",
      "Unique metadata across all key pages",
      "Local business and service schema markup",
      "GA4 and Search Console configuration",
      "Monthly rank and traffic reporting setup",
    ],
    results: [
      { metric: "Stronger SEO foundation", description: "Rebuilt metadata, headings, and schema across the entire site." },
      { metric: "Reduced manual reporting steps", description: "Configured GA4 and Search Console for reliable, ongoing reporting." },
      { metric: "Clearer technical baseline", description: "Established a clean starting point for future content and link-building work." },
    ],
    visuals: [
      { type: "abstract", alt: "Technical SEO audit summary panel" },
    ],
    gradient: "linear-gradient(135deg, #061527, #50A932)",
  }),
  proj({
    title: "Custom Reporting Dashboard",
    slug: "custom-reporting-dashboard",
    clientName: "Multi-Location Retailer",
    industry: "Retail Operations",
    platform: "Full Stack",
    projectType: "Case Study",
    featured: false,
    services: ["Custom Tool Development", "Full Stack Development"],
    serviceSlugs: ["custom-tool-development", "full-stack-development"],
    tags: ["Custom Tools", "Full Stack", "SaaS"],
    shortDescription:
      "A custom internal dashboard that replaced manual spreadsheet reporting across multiple retail locations.",
    overview:
      "This retailer was consolidating sales and inventory data from multiple locations by hand in spreadsheets every week. involvepro built a custom reporting dashboard that pulls data automatically and presents it in a single, role-based view for their operations team.",
    challenge:
      "Store managers were exporting data from separate systems and emailing spreadsheets to a central operations team, who then manually reconciled numbers before reporting to leadership. The process took days and was prone to manual entry errors.",
    solution:
      "We built a custom full-stack dashboard with API integrations into the retailer's existing point-of-sale and inventory systems, role-based access for store managers versus operations leadership, and automated weekly summary views replacing the manual spreadsheet process.",
    deliverables: [
      "Custom-built reporting dashboard",
      "API integrations with existing POS and inventory systems",
      "Role-based access for store and operations staff",
      "Automated weekly summary reporting",
      "Documentation and team handoff training",
    ],
    results: [
      { metric: "Reduced manual reporting steps", description: "Replaced weekly spreadsheet consolidation with automated data pulls." },
      { metric: "Real-time operational visibility", description: "Store and leadership teams can view current numbers without waiting on manual reports." },
      { metric: "Fewer manual entry errors", description: "Removed the manual reconciliation step that previously introduced data inconsistencies." },
    ],
    visuals: [
      { type: "abstract", alt: "Dashboard interface composition" },
      { type: "abstract", alt: "Data flow between POS system and dashboard" },
    ],
    gradient: "linear-gradient(135deg, #082848, #061527)",
  }),
  proj({
    title: "SaaS MVP Build",
    slug: "saas-mvp-build",
    clientName: "Early-Stage Founder",
    industry: "SaaS",
    platform: "Full Stack",
    projectType: "Case Study",
    featured: true,
    services: ["MVP Development", "SaaS Product Development"],
    serviceSlugs: ["mvp-development", "saas-product-development"],
    tags: ["SaaS", "Full Stack", "UI/UX"],
    shortDescription:
      "Architecture and MVP build for an early-stage product, scoped and launched in a single development cycle.",
    overview:
      "An early-stage founder came to involvepro with a validated idea but no technical team. We scoped a focused MVP, prioritized the core feature set, and built a launch-ready product on architecture designed to support growth beyond the first version.",
    challenge:
      "The founder's initial feature list was broad enough to take many months to build, which risked delaying validation with real users. There was no existing technical architecture, and the product needed authentication, billing, and a usable admin layer from day one.",
    solution:
      "We ran a scoping phase to prioritize the core use case, then built a multi-tenant architecture with authentication, subscription billing, a customer-facing dashboard, and a lightweight admin panel — scoped tightly enough to launch in one development cycle while remaining extensible.",
    deliverables: [
      "Prioritized MVP feature scope",
      "Multi-tenant architecture with authentication",
      "Subscription and billing integration",
      "Customer dashboard and admin panel",
      "Launch-ready deployment with analytics",
    ],
    results: [
      { metric: "Launch-ready in one cycle", description: "Scoped and built a usable MVP without expanding beyond the core validated use case." },
      { metric: "Scalable technical setup", description: "Architecture built to extend into a full SaaS product without a rebuild." },
      { metric: "Clearer iteration roadmap", description: "Delivered a post-launch roadmap based on the prioritized feature backlog." },
    ],
    visuals: [
      { type: "browser-frame", alt: "SaaS dashboard interface in a browser frame" },
      { type: "abstract", alt: "Product architecture diagram" },
    ],
    gradient: "linear-gradient(135deg, #00BCEA, #082848)",
  }),
  proj({
    title: "AI Support Workflow",
    slug: "ai-support-workflow",
    clientName: "Ecommerce Customer Support Team",
    industry: "Ecommerce",
    platform: "Automation",
    projectType: "Case Study",
    featured: false,
    services: ["AI Automation", "AI Chatbot & LLM Integration"],
    serviceSlugs: ["ai-automation", "ai-chatbot-llm-integration"],
    tags: ["AI Automation", "AI", "Ecommerce"],
    shortDescription:
      "An AI assistant paired with a human review loop that handles repetitive inbound customer support questions.",
    overview:
      "This ecommerce support team was spending a large share of their day answering the same order-status and policy questions. involvepro built an AI assistant grounded in their actual help content, with a clear handoff path to a human agent whenever the question required judgment.",
    challenge:
      "The team's inbox was dominated by repetitive questions — order status, return policy, sizing — that pulled attention away from more complex customer issues. Existing chatbot tools they had tried gave generic, unhelpful answers and had no reliable fallback to a human.",
    solution:
      "We built a retrieval-augmented assistant grounded in their knowledge base and order data, with explicit fallback rules so ambiguous or high-stakes questions route directly to a human agent. Conversation analytics were added so the team can review and refine the assistant's coverage over time.",
    deliverables: [
      "AI assistant grounded in existing knowledge base and order data",
      "Human-in-the-loop escalation rules",
      "Integration with existing support and order systems",
      "Conversation analytics and review reporting",
    ],
    results: [
      { metric: "Reduced manual operational effort", description: "Automated responses to the highest-volume repetitive question categories." },
      { metric: "Reliable escalation path", description: "Clear fallback rules route ambiguous questions to a human agent rather than guessing." },
      { metric: "Visibility into support volume", description: "Conversation analytics give the team ongoing insight into what customers are asking." },
    ],
    visuals: [
      { type: "abstract", alt: "AI workflow routing diagram" },
    ],
    gradient: "linear-gradient(135deg, #00BCEA, #06120D)",
  }),
  proj({
    title: "Website Maintenance & SEO Support",
    slug: "website-maintenance-seo-support",
    clientName: "Professional Services Firm",
    industry: "Professional Services",
    platform: "WordPress",
    projectType: "Case Study",
    featured: false,
    services: ["Website Maintenance & Support", "SEO"],
    serviceSlugs: ["website-maintenance-support", "seo"],
    tags: ["Maintenance", "SEO", "WordPress"],
    shortDescription:
      "Ongoing maintenance, technical fixes, and SEO upkeep for a WordPress site after a previous agency went unresponsive.",
    overview:
      "This professional services firm had a functional WordPress site but no ongoing technical ownership after their previous agency stopped responding to requests. involvepro took over maintenance and SEO upkeep, starting with a full stability and security review.",
    challenge:
      "Plugins and WordPress core were several versions out of date, several forms had stopped submitting correctly without anyone noticing, and there had been no SEO monitoring in over a year, leaving broken links and outdated metadata unaddressed.",
    solution:
      "We ran a full site stability audit, updated core and plugins safely, fixed broken forms and navigation issues, and resumed ongoing SEO monitoring with monthly reporting so issues get caught before they affect traffic or lead volume.",
    deliverables: [
      "Full site stability and security audit",
      "WordPress core and plugin updates",
      "Broken form and navigation fixes",
      "Ongoing SEO monitoring and monthly reporting",
    ],
    results: [
      { metric: "Better maintainability", description: "Brought core and plugins current and established a regular update cadence." },
      { metric: "Restored lead capture", description: "Identified and fixed forms that had silently stopped submitting." },
      { metric: "Ongoing technical ownership", description: "Established monthly monitoring so issues are caught proactively." },
    ],
    visuals: [
      { type: "abstract", alt: "Site health and maintenance checklist" },
    ],
    gradient: "linear-gradient(135deg, #061527, #082848)",
  }),
  proj({
    title: "B2B Marketing Website",
    slug: "b2b-marketing-website",
    clientName: "Enterprise Technology Company",
    industry: "B2B",
    platform: "Next.js",
    projectType: "Case Study",
    featured: false,
    services: ["Enterprise Marketing Websites", "UI/UX Design"],
    serviceSlugs: ["enterprise-marketing-websites", "ui-ux-design"],
    tags: ["Full Stack", "B2B", "UI/UX"],
    shortDescription:
      "A performance-first marketing website built on Next.js with a headless CMS content model for a growing B2B team.",
    overview:
      "This enterprise technology company was outgrowing their legacy marketing site, which couldn't keep pace with their campaign and content publishing cadence. involvepro designed and built a new marketing site on Next.js with a structured headless CMS model.",
    challenge:
      "The legacy site required developer involvement for nearly every new landing page, page load times were inconsistent across regions, and there was no consistent design system across marketing, product, and resource pages.",
    solution:
      "We designed a reusable component system in Figma, then built the site on Next.js with a headless CMS content model so the marketing team could publish new pages independently. SEO metadata, schema, and analytics were integrated from the start rather than retrofitted after launch.",
    deliverables: [
      "Figma design system across marketing, product, and resource pages",
      "Next.js frontend with headless CMS integration",
      "Self-serve landing page templates for the marketing team",
      "SEO metadata and schema implementation",
      "Analytics and tracking integration",
    ],
    results: [
      { metric: "Improved content structure", description: "Reusable sections let the marketing team publish pages without developer time." },
      { metric: "More scalable technical setup", description: "Headless architecture decouples content management from frontend performance." },
      { metric: "Cleaner mobile experience", description: "Redesigned layouts with consistent performance across regions and devices." },
    ],
    visuals: [
      { type: "browser-frame", alt: "Marketing website homepage in a browser frame" },
      { type: "abstract", alt: "Component design system overview" },
    ],
    gradient: "linear-gradient(135deg, #082848, #00BCEA)",
  }),
  proj({
    title: "Headless Marketing Website Migration",
    slug: "headless-marketing-website-migration",
    clientName: "High-Visibility Consumer Brand",
    industry: "Consumer Brand",
    platform: "Next.js",
    projectType: "Case Study",
    featured: false,
    services: ["Headless CMS & Next.js Websites", "SEO"],
    serviceSlugs: ["headless-cms-nextjs-websites", "seo"],
    tags: ["Full Stack", "SEO", "UI/UX"],
    shortDescription:
      "A migration from a legacy CMS to a headless Next.js architecture for a brand navigating a period of increased public visibility.",
    overview:
      "This consumer brand experienced a period of sharp visibility growth, including momentum from Shark Tank-related exposure, and needed a website that could handle unpredictable traffic spikes without falling over. involvepro migrated the site to a headless Next.js architecture built for speed and stability under load.",
    challenge:
      "The brand's legacy CMS setup struggled under sudden traffic surges tied to press and social visibility moments, and page speed was inconsistent, which risked losing visitors exactly when interest was highest.",
    solution:
      "We migrated the site to a decoupled Next.js frontend backed by a headless CMS, with careful redirect mapping and metadata migration to protect existing SEO equity. The new architecture is built to handle traffic spikes reliably, with schema and technical SEO carried over cleanly.",
    deliverables: [
      "Full migration to a headless Next.js architecture",
      "Redirect mapping and metadata migration",
      "Schema-ready page templates",
      "Performance testing for high-traffic scenarios",
    ],
    results: [
      { metric: "More scalable technical setup", description: "Rebuilt on architecture designed to handle unpredictable traffic spikes." },
      { metric: "Protected SEO equity", description: "Careful redirect and metadata migration preserved existing search visibility." },
      { metric: "Stronger technical foundation", description: "Decoupled frontend and CMS reduce the risk of site-wide slowdowns under load." },
    ],
    visuals: [
      { type: "browser-frame", alt: "Migrated homepage in a browser frame" },
      { type: "abstract", alt: "Traffic and performance monitoring visualization" },
    ],
    gradient: "linear-gradient(135deg, #50A932, #06120D)",
  }),
];

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export const featuredProjects = projects.filter((p) => p.featured);

export function getRelatedProjects(project: Project, count = 3) {
  const scored = projects
    .filter((p) => p.slug !== project.slug)
    .map((p) => {
      let score = 0;
      if (p.industry === project.industry) score += 2;
      if (p.platform === project.platform) score += 2;
      score += p.serviceSlugs.filter((s) => project.serviceSlugs.includes(s)).length;
      score += p.tags.filter((t) => project.tags.includes(t)).length;
      return { project: p, score };
    })
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, count).map((s) => s.project);
}

export const filterTags = [
  "All",
  "Shopify",
  "WordPress",
  "SEO",
  "UI/UX",
  "SaaS",
  "AI Automation",
  "Full Stack",
  "Custom Tools",
  "Maintenance",
  "Ecommerce",
  "B2B",
  "Local Business",
] as const;

export type FilterTag = (typeof filterTags)[number];

export function getProjectsByTag(tag: FilterTag) {
  if (tag === "All") return projects;
  return projects.filter((p) => p.tags.includes(tag) || p.industry === tag);
}
