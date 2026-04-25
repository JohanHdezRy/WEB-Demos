import { useState, useRef } from "react";
import { gsap } from "gsap";
import type { Section, SettingsSection } from "../types";

export function useSectionTransition() {
  const [activeSection, setActiveSection] = useState<Section>("overview");
  const [activeSettings, setActiveSettings] = useState<SettingsSection | null>(null);
  const mainRef = useRef<HTMLDivElement>(null);

  const changeSection = (sec: Section) => {
    if (!mainRef.current || sec === activeSection) return;
    gsap.to(mainRef.current, {
      opacity: 0,
      y: 8,
      duration: 0.2,
      ease: "power2.in",
      onComplete: () => {
        setActiveSection(sec);
        setActiveSettings(null);
        gsap.to(mainRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      },
    });
  };

  const changeSettingsSection = (sec: SettingsSection) => {
    if (!mainRef.current) return;
    gsap.to(mainRef.current, {
      opacity: 0,
      y: 8,
      duration: 0.2,
      ease: "power2.in",
      onComplete: () => {
        setActiveSettings(sec);
        gsap.to(mainRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      },
    });
  };

  return { activeSection, activeSettings, mainRef, changeSection, changeSettingsSection };
}
