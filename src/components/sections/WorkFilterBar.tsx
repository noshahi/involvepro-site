import { filterTags, type FilterTag } from "@/data/projects";
import { cn } from "@/lib/cn";

type WorkFilterBarProps = {
  active: FilterTag;
  onChange: (tag: FilterTag) => void;
};

export function WorkFilterBar({ active, onChange }: WorkFilterBarProps) {
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects">
      {filterTags.map((tag) => (
        <button
          key={tag}
          type="button"
          onClick={() => onChange(tag)}
          aria-pressed={active === tag}
          className={cn(
            "rounded-full border px-4 py-2 text-[13px] font-medium transition-colors",
            active === tag
              ? "border-brand-green bg-brand-green text-white"
              : "border-border-soft bg-white text-text-muted hover:border-brand-green/40 hover:text-canvas-dark",
          )}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
