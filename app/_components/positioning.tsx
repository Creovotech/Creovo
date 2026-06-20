import { Reveal } from "./reveal";

export function Positioning() {
  return (
    <section className="px-6 py-24 md:py-32">
      <Reveal className="mx-auto max-w-[760px]">
        <p className="font-display text-[clamp(1.6rem,3.3vw,2.5rem)] leading-[1.34] tracking-[-0.01em]">
          We build for businesses that refuse to look average — whether that&rsquo;s
          a funded startup or a trade that does world-class work and was tired of
          a website that didn&rsquo;t show it.{" "}
          <span className="italic text-ember">Same standard, every time.</span>
        </p>
      </Reveal>
    </section>
  );
}
