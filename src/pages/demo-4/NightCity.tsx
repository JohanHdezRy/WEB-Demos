import FloatingLines from "../../components/animations/FloatingLines";
import { useFonts } from "../../hooks/useFonts";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { C, FONTS_HREF } from "./data/tokens";
import { useNightCityStyles } from "./hooks/useNightCityStyles";
import { NavBar } from "./components/NavBar";
import { Hero } from "./components/Hero";
import { VinylRoulette } from "./components/VinylRoulette";
import { Manifesto } from "./components/Manifesto";
import { CitySessions } from "./components/CitySessions";
import { Footer } from "./components/Footer";
import { NowPlayingBar } from "./components/NowPlayingBar";

export function NightCity() {
  useDocumentTitle("NightCity Records · Vinyl", "en");
  useFonts(FONTS_HREF);
  const styles = useNightCityStyles();

  return (
    <div
      className="theme-nightcity nightcity-page overflow-x-hidden min-h-screen"
      style={{ background: C.bg, color: C.text }}
    >
      <style>{styles}</style>

      <NavBar />

      <div className="nc-bg">
        <FloatingLines
          enabledWaves={["top", "middle", "bottom"]}
          lineCount={5}
          lineDistance={5}
          bendRadius={5}
          bendStrength={-0.5}
          interactive
          parallax
        />
      </div>
      <div className="nc-overlay" />

      <div className="nc-content">
        <Hero />
        <VinylRoulette />
        <Manifesto />
        <CitySessions />
        <Footer />
      </div>

      <NowPlayingBar />
    </div>
  );
}
