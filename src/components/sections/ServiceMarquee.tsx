import { marqueeServices } from "@/data/services";

function MarqueeRow({ reverse = false }: { reverse?: boolean }) {
  const items = [...marqueeServices, ...marqueeServices];
  return (
    <div className="flex w-max shrink-0 [animation-play-state:running] hover:[animation-play-state:paused]">
      <div
        className={`flex shrink-0 items-center gap-8 pr-8 ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
      >
        {items.map((service, i) => (
          <span key={`${service}-${i}`} className="flex items-center gap-8 whitespace-nowrap">
            <span className="font-mono text-[13px] font-medium uppercase tracking-[0.08em] text-white">
              {service}
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#8FE070]" />
          </span>
        ))}
      </div>
    </div>
  );
}

export function ServiceMarquee() {
  return (
    <section aria-label="Services ticker" className="overflow-hidden border-y border-white/10 bg-canvas-navy py-5">
      <div className="flex flex-col gap-4">
        <MarqueeRow />
        <MarqueeRow reverse />
      </div>
    </section>
  );
}
