import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ServiceDetailHero } from "@/components/sections/ServiceDetailHero";
import { ServiceProblemPanel } from "@/components/sections/ServiceProblemPanel";
import { ServiceDeliverables } from "@/components/sections/ServiceDeliverables";
import { ServiceProcess } from "@/components/sections/ServiceProcess";
import { ServiceFAQ } from "@/components/sections/ServiceFAQ";
import { RelatedServices } from "@/components/sections/RelatedServices";
import { ServiceCTA } from "@/components/sections/ServiceCTA";
import { services, getServiceBySlug, getRelatedServices } from "@/data/services";
import { serviceSchema, breadcrumbSchema, jsonLdProps } from "@/lib/schema";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: service.metaTitle,
    description: service.metaDescription,
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const related = getRelatedServices(service);
  const fallbackRelated =
    related.length >= 3
      ? related
      : [...related, ...services.filter((s) => s.slug !== service.slug && !related.includes(s))].slice(0, 3);

  const schema = serviceSchema({
    name: service.title,
    description: service.schemaDescription,
    slug: service.slug,
  });
  const breadcrumbs = breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: service.title, path: `/services/${service.slug}` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdProps(schema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdProps(breadcrumbs)} />
      <Header />
      <main id="main-content" className="flex-1">
        <ServiceDetailHero service={service} />
        <ServiceProblemPanel service={service} />
        <ServiceDeliverables service={service} />
        <ServiceProcess service={service} />
        <RelatedServices service={service} related={fallbackRelated} />
        <ServiceFAQ service={service} />
        <ServiceCTA service={service} />
      </main>
      <Footer />
    </>
  );
}
