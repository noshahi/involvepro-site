import { CheckCircle2, Info } from "lucide-react";
import type { BlogPostSection } from "@/data/posts";

function BodyParagraphs({ body }: { body: string }) {
  const paragraphs = body.split("\n\n");
  return (
    <>
      {paragraphs.map((paragraph, i) => (
        <p key={i} className="text-[15.5px] leading-[1.75] text-text-main">
          {paragraph}
        </p>
      ))}
    </>
  );
}

function Section({ section }: { section: BlogPostSection }) {
  if (section.type === "callout") {
    return (
      <div
        id={section.id}
        className="scroll-mt-24 rounded-2xl border border-brand-blue/25 bg-[#eefaff] p-6 sm:p-7"
      >
        <div className="mb-2.5 flex items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-brand-navy">
          <Info className="h-3.5 w-3.5" /> {section.heading}
        </div>
        <p className="text-[15px] leading-relaxed text-canvas-dark">{section.body}</p>
      </div>
    );
  }

  return (
    <div id={section.id} className="scroll-mt-24">
      <h2 className="font-sans text-[clamp(20px,2.2vw,26px)] font-bold leading-[1.24] tracking-[-0.4px] text-canvas-dark">
        {section.heading}
      </h2>
      <div className="mt-4 flex flex-col gap-4">
        <BodyParagraphs body={section.body} />
      </div>

      {section.items && section.items.length > 0 && (
        <ul className="mt-5 flex flex-col gap-3 rounded-xl border border-border-soft bg-canvas-soft p-5">
          {section.items.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-[14px] leading-relaxed text-canvas-dark">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function ArticleBody({ sections }: { sections: BlogPostSection[] }) {
  return (
    <div className="flex flex-col gap-12">
      {sections.map((section) => (
        <Section key={section.id} section={section} />
      ))}
    </div>
  );
}
