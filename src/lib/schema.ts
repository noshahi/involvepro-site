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

export function blogSchema(params: { name: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: params.name,
    description: params.description,
    url: `${SITE_URL}${params.path}`,
    publisher: {
      "@type": "Organization",
      name: "Involvepro",
      url: SITE_URL,
    },
  };
}

export function blogPostingSchema(params: {
  title: string;
  description: string;
  slug: string;
  authorName: string;
  publishedDate: string;
  updatedDate: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: params.title,
    description: params.description,
    url: `${SITE_URL}/insights/${params.slug}`,
    datePublished: params.publishedDate,
    dateModified: params.updatedDate,
    author: {
      "@type": "Organization",
      name: params.authorName,
    },
    publisher: {
      "@type": "Organization",
      name: "Involvepro",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/brand/logo-black.svg`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/insights/${params.slug}`,
    },
  };
}

export function faqPageSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function jsonLdProps(data: object) {
  return {
    __html: JSON.stringify(data),
  };
}
