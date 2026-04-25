import { FuzzyText } from "../../../components/animations/FuzzyText";
import { C } from "../data/tokens";

export function Hero() {
  return (
    <section className="nc-hero">
      <FuzzyText
        fontSize="clamp(3rem,9vw,8.5rem)"
        fontWeight={900}
        fontFamily="'Space Grotesk', sans-serif"
        color={C.text}
        baseIntensity={0.12}
        hoverIntensity={0.5}
        fuzzRange={26}
      >
        NightCity
      </FuzzyText>
      <FuzzyText
        fontSize="clamp(3rem,9vw,8.5rem)"
        fontWeight={900}
        fontFamily="'Space Grotesk', sans-serif"
        color={C.accent}
        baseIntensity={0.18}
        hoverIntensity={0.6}
        fuzzRange={30}
      >
        Records
      </FuzzyText>

      <p className="nc-hero-sub">
        // Rare Vinyl · Underground Pressings · Est. 2019
      </p>
      <button className="nc-hero-cta">Enter the Archive</button>

      <div className="nc-scroll-hint">
        <span>SCROLL</span>
        <div className="nc-scroll-line" />
      </div>
    </section>
  );
}
