import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SplitHero } from "@/components/sections/SplitHero";
import { ServiceMarquee } from "@/components/sections/ServiceMarquee";
import { DiagnosticPanel } from "@/components/sections/DiagnosticPanel";
import { BentoServices } from "@/components/sections/BentoServices";
import { ProofBand } from "@/components/sections/ProofBand";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { AIWorkflowVisual } from "@/components/sections/AIWorkflowVisual";
import { SearchVisibilityPanel } from "@/components/sections/SearchVisibilityPanel";
import { WorkBento } from "@/components/sections/WorkBento";
import { TestimonialStrip } from "@/components/sections/TestimonialStrip";
import { ToolStackGrid } from "@/components/sections/ToolStackGrid";
import { InsightsPreview } from "@/components/sections/InsightsPreview";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content" className="flex-1">
        <SplitHero />
        <ServiceMarquee />
        <DiagnosticPanel />
        <BentoServices />
        <ProofBand />
        <ProcessTimeline />
        <AIWorkflowVisual />
        <SearchVisibilityPanel />
        <WorkBento />
        <TestimonialStrip />
        <ToolStackGrid />
        <InsightsPreview />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
