import { Subheading } from "@/components/elements/subheading";
import { Heading } from "@/components/elements/heading";

export const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <section className="border-b border-zinc-800 pb-8 mb-8 last:border-0 last:pb-0 flex justify-items-start items-start flex-col w-full">
        <Heading className="text-3xl font-bold mb-4 tracking-tight">
            {title}
            hello
        </Heading>
        <Subheading className="text-zinc-400 leading-relaxed text-lg text-left">
            {children}
        </Subheading>
    </section>
);