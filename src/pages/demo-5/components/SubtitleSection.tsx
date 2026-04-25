import ScrollReveal from "@/components/animations/ScrollReveal";

export function SubtitleSection() {
  return (
    <section className="bg-[#f5f3ef] py-20 px-6 md:px-20 max-w-8xl mx-auto">
      <ScrollReveal
        containerClassName="font-[var(--font-cormorant)] text-2xl md:text-3xl text-stone-700 font-light leading-relaxed text-center"
        enableBlur
        baseOpacity={0}
        blurStrength={6}
      >
        Crafted with intention, worn with grace. Each piece tells a story of
        quiet luxury — where simplicity meets the extraordinary.
      </ScrollReveal>
    </section>
  );
}
