export type ProcessStep = {
  num: string;
  title: string;
  description: string;
};

export const processSteps: ProcessStep[] = [
  { num: "01", title: "Discover", description: "We map your business, buyers, and technical constraints before writing a line of code." },
  { num: "02", title: "Architect", description: "Information architecture, data structure, and integrations planned up front." },
  { num: "03", title: "Design", description: "Interfaces built around real conversion paths, not decoration." },
  { num: "04", title: "Build", description: "Custom-coded, performance-audited, and SEO-structured from day one." },
  { num: "05", title: "Optimize", description: "Core Web Vitals, conversion testing, and search visibility tuned pre-launch." },
  { num: "06", title: "Support", description: "Monitoring, updates, and continuous improvement after you go live." },
];
