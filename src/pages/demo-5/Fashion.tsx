import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { ProductGrid } from "./components/ProductGrid";
import { SubtitleSection } from "./components/SubtitleSection";
import { FullWidthVideo } from "./components/FullWidthVideo";
import { LooksSection } from "./components/LooksSection";
import { MasonrySection } from "./components/MasonrySection";
import { MagazineSection } from "./components/MagazineSection";
import { Footer } from "./components/Footer";

export function Fashion() {
  return (
    <div className="bg-white">
      <style>{`
        @keyframes slideDown {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
      `}</style>
      <Navbar />
      <HeroSection />
      <ProductGrid />
      <SubtitleSection />
      <FullWidthVideo />
      <LooksSection />
      <MasonrySection />
      <MagazineSection />
      <Footer />
    </div>
  );
}
