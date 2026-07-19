export const serviceOptions = [
  "Shopify Development",
  "Shopify Store Design",
  "Shopify Revenue Optimization",
  "WordPress Design & Development",
  "WordPress Plugin Development",
  "SEO",
  "AEO / GEO / AI Search Optimization",
  "UI/UX Design",
  "Custom Tool Development",
  "Full Stack Development",
  "SaaS Product Development",
  "MVP Development",
  "AI Automation",
  "AI Chatbot & LLM Integration",
  "Workflow Automation",
  "Enterprise Marketing Website",
  "Headless CMS & Next.js Website",
  "Website Maintenance & Support",
  "Analytics, Tracking & Reporting",
  "CRO / A/B Testing",
  "Email Marketing & Lead Nurture",
  "PPC Landing Page Support",
  "Free Audit",
  "Not sure yet",
];

export const budgetOptions = [
  "Under $1,000",
  "$1,000 – $3,000",
  "$3,000 – $5,000",
  "$5,000 – $10,000",
  "$10,000+",
  "Not sure yet",
];

export const timelineOptions = [
  "ASAP",
  "2–4 weeks",
  "1–2 months",
  "3+ months",
  "Ongoing support",
  "Not sure yet",
];

export type ContactOption = {
  title: string;
  description: string;
  ctaLabel: string;
  href?: string;
  action?: "meeting" | "scroll-form";
};

export const contactOptions: ContactOption[] = [
  {
    title: "Schedule a meeting",
    description:
      "Best for project discussions, redesigns, SaaS builds, AI automation, and larger technical scopes.",
    ctaLabel: "Schedule a Meeting",
    action: "meeting",
  },
  {
    title: "Send project details",
    description: "Best when you already know what you need and want us to review the scope.",
    ctaLabel: "Fill the Form",
    action: "scroll-form",
  },
  {
    title: "Request a free audit",
    description: "Best when you want a clear view of what is not working before deciding the next step.",
    ctaLabel: "Request Free Audit",
    href: "/free-audit",
  },
  {
    title: "Request technical support",
    description: "Best for existing Shopify, WordPress, SEO, tracking, performance, or maintenance needs.",
    ctaLabel: "Describe the Issue",
    action: "scroll-form",
  },
];

export const contactTrustSteps = [
  "We review your project context.",
  "We identify the best service path.",
  "We clarify scope, timeline, and technical requirements.",
  "We recommend the next practical step.",
  "If there is a fit, we move into discovery or proposal.",
];

export const contactDetails = {
  email: "support@involvepro.com",
  phone: "+1 201 979 4218",
  phoneHref: "+12019794218",
  location: "Jhelum, Pakistan — serving USA clients",
};

export const contactProfileLinks = [
  { label: "Shopify Partner", href: "https://www.shopify.com/partners/directory/partner/involvepro-agency" },
  { label: "Upwork", href: "https://www.upwork.com/agencies/1514309167629066240/" },
  { label: "Google Business Profile", href: "https://maps.app.goo.gl/rxxja2yAooTeWfCD9" },
  { label: "LinkedIn", href: "https://pk.linkedin.com/company/involvepro" },
  { label: "Facebook", href: "https://www.facebook.com/involvepro/" },
];

export const contactFAQs = [
  {
    question: "Do I need a complete project brief before contacting involvepro?",
    answer:
      "No. Share the current website, business goal, service area, and any known requirements. We can help clarify the scope and next steps.",
  },
  {
    question: "Do you work with USA-based businesses?",
    answer:
      "Yes. involvepro serves USA-focused clients across Shopify, WordPress, SEO, SaaS, AI automation, and custom web development.",
  },
  {
    question: "Can I schedule a meeting instead of filling out the form?",
    answer: "Yes. You can schedule a 30-minute consultation directly through the Calendly panel on this page.",
  },
  {
    question: "Can I request a free audit first?",
    answer:
      "Yes. Use the Free Audit page to request a website, Shopify, SEO, CRO, or automation audit before committing to a project.",
  },
  {
    question: "What types of projects can I contact you about?",
    answer:
      "You can contact involvepro for Shopify development, WordPress development, SEO, AEO/GEO, SaaS products, custom tools, AI automation, workflow automation, analytics, CRO, and ongoing website support.",
  },
  {
    question: "How soon will you respond?",
    answer:
      "We review inquiries and respond as soon as possible with the most practical next step based on the project details provided.",
  },
];
