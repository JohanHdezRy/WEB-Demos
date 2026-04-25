import AnimatedContent from "@/components/animations/AnimatedContent";
import { PRODUCTS } from "../data/fashionData";

export function ProductGrid() {
  return (
    <section id="collection" className="bg-[#f5f3ef] py-24 px-6 md:px-16">
      <AnimatedContent distance={40} delay={0.1} className="mb-16 text-center">
        <p className="text-xs tracking-[0.4em] uppercase text-stone-400 mb-3">
          New Arrivals
        </p>
        <h2 className="font-[var(--font-cormorant)] text-5xl md:text-7xl text-stone-800 font-light">
          The Collection
        </h2>
      </AnimatedContent>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
        {PRODUCTS.map((p, i) => (
          <AnimatedContent
            key={p.id}
            distance={50}
            delay={i * 0.07}
            duration={0.9}
            threshold={0.05}
          >
            <div className="group relative overflow-hidden cursor-pointer">
              <div className="relative aspect-[3/4.5] overflow-hidden bg-stone-200">
                <img
                  src={p.src}
                  alt={p.label}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                  <button className="w-full bg-white text-stone-800 text-xs tracking-[0.2em] uppercase py-3 hover:bg-stone-800 hover:text-white transition-colors duration-300">
                    Quick Add
                  </button>
                </div>
              </div>
              <div className="pt-3 pb-1 flex justify-between items-start">
                <p className="text-stone-700 text-sm tracking-wide">
                  {p.label}
                </p>
                <p className="text-stone-500 text-sm">{p.price}</p>
              </div>
            </div>
          </AnimatedContent>
        ))}
      </div>
    </section>
  );
}
