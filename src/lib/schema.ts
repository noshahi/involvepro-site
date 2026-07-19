const SITE_URL = "https://involvepro.com";

export function serviceSchema(params: {
  name: string;
  description: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: params.name,
    name: params.name,
    description: params.description,
    url: `${SITE_URL}/services/${params.slug}`,
    provider: {
      "@type": "Organization",
      name: "Involvepro",
      url: SITE_URL,
    },
    areaServed: "US",
  };
}

export function collectionPageSchema(params: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: params.name,
    description: params.description,
    url: `${SITE_URL}${params.path}`,
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export function creativeWorkSchema(params: {
  name: string;
  description: string;
  slug: string;
  clientName: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: params.name,
    description: params.description,
    url: `${SITE_URL}/work/${params.slug}`,
    creator: {
      "@type": "Organization",
      name: "Involvepro",
      url: SITE_URL,
    },
    about: params.clientName,
  };
}

export function webPageSchema(params: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: params.name,
    description: params.description,
    url: `${SITE_URL}${params.path}`,
  };
}

export function howToSchema(params: {
  name: string;
  description: string;
  steps: { title: string; description: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: params.name,
    description: params.description,
    step: params.steps.map((step) => ({
      "@type": "HowToStep",
      name: step.title,
      text: step.description,
    })),
  };
}

export function jsonLdProps(data: object) {
  return {
    __html: JSON.stringify(data),
  };
}
