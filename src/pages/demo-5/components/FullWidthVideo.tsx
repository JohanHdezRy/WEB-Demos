import AnimatedContent from "@/components/animations/AnimatedContent";
import { FULLWIDTH_VIDEO } from "../data/fashionData";

export function FullWidthVideo() {
  return (
    <section className="relative w-full h-[80vh] overflow-hidden">
      <video
        className="w-full h-full object-cover"
        src={FULLWIDTH_VIDEO}
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
        <AnimatedContent threshold={0.3} distance={30}>
          <div className="text-center">
            <p className="text-white/70 text-xs tracking-[0.5em] uppercase mb-4">
              Behind the Scenes
            </p>
            <h2 className="text-white font-[var(--font-cormorant)] text-5xl md:text-8xl font-light italic">
              The Atelier
            </h2>
          </div>
        </AnimatedContent>
      </div>
    </section>
  );
}
