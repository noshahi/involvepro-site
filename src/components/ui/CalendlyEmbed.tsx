const CALENDLY_URL = "https://calendly.com/involvepro/30min";
const CALENDLY_EMBED_URL = `${CALENDLY_URL}?hide_event_type_details=1&hide_gdpr_banner=1`;

type CalendlyEmbedProps = {
  className?: string;
  height?: number;
};

/**
 * Inline (non-modal) Calendly embed for future use on a dedicated
 * contact page, e.g. a side-by-side contact form + scheduling panel.
 */
export function CalendlyEmbed({ className, height = 700 }: CalendlyEmbedProps) {
  return (
    <div className={className}>
      <iframe
        src={CALENDLY_EMBED_URL}
        title="Schedule a meeting with involvepro via Calendly"
        className="w-full rounded-2xl border border-border-soft"
        style={{ height }}
        loading="lazy"
      />
      <p className="mt-3 text-center text-[12.5px] text-text-muted">
        Having trouble loading the scheduler?{" "}
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-brand-green hover:text-brand-green-deep"
        >
          Open Calendly in a new tab
        </a>
        .
      </p>
    </div>
  );
}
