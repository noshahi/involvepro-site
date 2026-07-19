import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProjectDetailHero } from "@/components/sections/ProjectDetailHero";
import { ProjectOverview } from "@/components/sections/ProjectOverview";
import { ProjectChallengeSolution } from "@/components/sections/ProjectChallengeSolution";
import { ProjectServicesDelivered } from "@/components/sections/ProjectServicesDelivered";
import { ProjectResults } from "@/components/sections/ProjectResults";
import { ProjectGallery } from "@/components/sections/ProjectGallery";
import { RelatedProjects } from "@/components/sections/RelatedProjects";
import { WorkCTA } from "@/components/sections/WorkCTA";
import { projects, getProjectBySlug, getRelatedProjects } from "@/data/projects";
import { creativeWorkSchema, breadcrumbSchema, jsonLdProps } from "@/lib/schema";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.metaTitle,
    description: project.metaDescription,
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const related = getRelatedProjects(project);

  const schema = creativeWorkSchema({
    name: project.title,
    description: project.schemaDescription,
    slug: project.slug,
    clientName: project.clientName,
  });
  const breadcrumbs = breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Work", path: "/work" },
    { name: project.title, path: `/work/${project.slug}` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdProps(schema)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdProps(breadcrumbs)} />
      <Header />
      <main id="main-content" className="flex-1">
        <ProjectDetailHero project={project} />
        <ProjectOverview project={project} />
        <ProjectChallengeSolution project={project} />
        <ProjectServicesDelivered project={project} />
        <ProjectResults project={project} />
        <ProjectGallery project={project} />
        <RelatedProjects related={related} />
        <WorkCTA
          headline="Planning something similar?"
          body="Schedule a meeting with involvepro to discuss the right scope, platform, and execution path."
        />
      </main>
      <Footer />
    </>
  );
}
