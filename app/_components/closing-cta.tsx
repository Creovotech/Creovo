import { Reveal } from "./reveal";
import { CAL_URL, EMAIL } from "./constants";

export function ClosingCta() {
  return (
    <section className="relative overflow-hidden border-t border-line px-6 py-28 md:py-36">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[70%] bg-[radial-gradient(60%_110%_at_50%_120%,rgba(255,77,46,0.14),transparent_70%)]" />
      <Reveal className="mx-auto max-w-[820px] text-center">
        <h2 className="mx-auto max-w-[18ch] text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.025em]">
          Want a site that finally matches how good your business is?
        </h2>
        <p className="mx-auto mt-6 max-w-[58ch] text-lg leading-relaxed text-ink-soft">
          Book a 30-minute discovery call. We&rsquo;ll run your current site
          through Lighthouse live, show you where world-class would move it, and
          tell you honestly whether we&rsquo;re the right studio — whether or not
          we build it.
        </p>
        <div className="mt-10 flex flex-col items-center gap-5">
          <a
            href={CAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-ember px-8 py-4 text-base font-medium text-white transition-transform duration-200 hover:scale-[1.03]"
          >
            Book a discovery call
          </a>
          <p className="text-sm text-ink-faint">
            Not ready to talk? Email{" "}
            <a
              href={`mailto:${EMAIL}`}
              className="text-ink underline underline-offset-2"
            >
              {EMAIL}
            </a>{" "}
            for a 2-minute teardown of your current site.
          </p>
        </div>
      </Reveal>
    </section>
  );
}
