import AnimatedContent from "@/components/animations/AnimatedContent";
import Masonry from "@/components/animations/Masonry";
import { MASONRY_ITEMS } from "../data/fashionData";

export function MasonrySection() {
  return (
    <section className="bg-white py-24 px-4 md:px-10">
      <AnimatedContent distance={30} className="mb-16 text-center">
        <p className="text-xs tracking-[0.4em] uppercase text-stone-400 mb-3">
          The Edit
        </p>
        <h2 className="font-[var(--font-cormorant)] text-5xl md:text-7xl text-stone-800 font-light">
          Gallery
        </h2>
      </AnimatedContent>
      <div className="max-w-7xl mx-auto">
        <Masonry
          items={MASONRY_ITEMS}
          columns={[4, 3, 2, 2, 1]}
          animateFrom="bottom"
          scaleOnHover
          blurToFocus
          stagger={0.04}
        />
      </div>
    </section>
  );
}
