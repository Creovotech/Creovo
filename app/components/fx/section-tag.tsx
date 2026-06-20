import { Reveal } from "../reveal";

// Mono "channel header" that opens every section — ties each one back to the
// hero's broadcast HUD. The signal line draws in from the left on reveal.
export function SectionTag({
  index,
  label,
}: {
  index: string;
  label: string;
}) {
  return (
    <Reveal className="mb-8 flex items-center gap-4">
      <span className="font-mono text-xs text-ember">{index}</span>
      <span className="size-1.5 rounded-full bg-ember shadow-[0_0_8px_var(--color-ember)]" />
      <span className="font-mono text-xs uppercase tracking-[0.25em] text-bone-dim">
        {label}
      </span>
      <span className="signal-line h-px flex-1 bg-gradient-to-r from-line to-transparent" />
    </Reveal>
  );
}
