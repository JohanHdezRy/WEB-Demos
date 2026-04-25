import AnimatedContent from "@/components/animations/AnimatedContent";
import BounceCards from "@/components/animations/BounceCards";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { MAGAZINE_COVERS } from "../data/fashionData";

export function MagazineSection() {
  return (
    <section className="bg-[#f5f3ef] py-28 px-6">
      <AnimatedContent distance={30} className="mb-16 text-center">
        <p className="text-xs tracking-[0.4em] uppercase text-stone-400 mb-3">
          As Seen In
        </p>
        <h2 className="font-[var(--font-cormorant)] text-5xl md:text-7xl text-stone-800 font-light">
          Press & Media
        </h2>
      </AnimatedContent>

      <div className="flex justify-center">
        <BounceCards
          images={MAGAZINE_COVERS}
          containerWidth={520}
          containerHeight={350}
          animationDelay={0.3}
          animationStagger={0.07}
          easeType="elastic.out(1, 0.7)"
          enableHover
          transformStyles={[
            "rotate(-14deg) translate(-160px, 20px)",
            "rotate(-7deg) translate(-80px, 10px)",
            "rotate(0deg)",
            "rotate(7deg) translate(80px, 10px)",
            "rotate(14deg) translate(160px, 20px)",
          ]}
        />
      </div>

      <div className="text-center mt-16">
        <ScrollReveal
          containerClassName="text-stone-400 text-sm tracking-[0.2em] uppercase"
          enableBlur={false}
          baseOpacity={0}
        >
          Vogue · Harper's Bazaar · Elle · Vanity Fair · W Magazine
        </ScrollReveal>
      </div>
    </section>
  );
}
