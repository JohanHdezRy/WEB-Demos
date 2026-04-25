import { useState, useRef, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import { S } from "../data/tokens";
import { INIT_NOTIFICATIONS } from "../data/notificationsData";
import type { Notification } from "../types";

export function NotificationsPanel() {
  const [items, setItems] = useState<Notification[]>(INIT_NOTIFICATIONS);
  const [clearing, setClearing] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const animateOut = useCallback((targets: Element[], onDone: () => void) => {
    gsap.to(targets, {
      x: 60,
      opacity: 0,
      height: 0,
      marginBottom: 0,
      paddingTop: 0,
      paddingBottom: 0,
      duration: 0.35,
      stagger: 0.05,
      ease: "power2.in",
      onComplete: onDone,
    });
  }, []);

  const animateIn = useCallback((targets: Element[]) => {
    gsap.fromTo(
      targets,
      { x: 40, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.4, stagger: 0.07, ease: "power2.out" },
    );
  }, []);

  const clearAll = useCallback(() => {
    if (clearing || !listRef.current) return;
    setClearing(true);
    const els = Array.from(listRef.current.querySelectorAll(".notif-item"));
    animateOut(els, () => {
      setItems([]);
      setClearing(false);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setItems(INIT_NOTIFICATIONS);
      }, 25000);
    });
  }, [clearing, animateOut]);

  const dismissOne = useCallback((id: number) => {
    if (!listRef.current) return;
    const el = listRef.current.querySelector(`[data-notif="${id}"]`);
    if (!el) return;
    gsap.to(el, {
      x: 60,
      opacity: 0,
      height: 0,
      marginBottom: 0,
      paddingTop: 0,
      paddingBottom: 0,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => setItems((prev) => prev.filter((n) => n.id !== id)),
    });
  }, []);

  useEffect(() => {
    if (!items.length || !listRef.current) return;
    const els = Array.from(listRef.current.querySelectorAll(".notif-item"));
    if (els.length) animateIn(els);
  }, [items.length, animateIn]);

  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    },
    [],
  );

  return (
    <div style={{ padding: "0 14px 16px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <p style={{ color: S.text, fontWeight: 600, fontSize: "0.85rem" }}>
          Notifications
        </p>
        {items.length > 0 && (
          <button
            onClick={clearAll}
            style={{
              background: "transparent",
              border: `1px solid ${S.border}`,
              color: S.muted,
              padding: "3px 8px",
              borderRadius: 5,
              fontSize: "0.62rem",
              cursor: "pointer",
              letterSpacing: "0.5px",
              transition: "color 0.2s, border-color 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.color = S.red;
              (e.target as HTMLElement).style.borderColor = S.red;
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.color = S.muted;
              (e.target as HTMLElement).style.borderColor = S.border;
            }}
          >
            Clear all
          </button>
        )}
      </div>

      <div
        ref={listRef}
        style={{ display: "flex", flexDirection: "column", gap: 8 }}
      >
        {items.length === 0 ? (
          <p
            style={{
              color: S.muted,
              fontSize: "0.72rem",
              textAlign: "center",
              padding: "12px 0",
            }}
          >
            No notifications · reappearing soon…
          </p>
        ) : (
          items.map((n) => (
            <div
              key={n.id}
              data-notif={n.id}
              className="notif-item"
              style={{
                display: "flex",
                gap: 8,
                padding: "9px 10px",
                background: S.bg,
                borderRadius: 8,
                border: `1px solid ${S.border}`,
                cursor: "pointer",
                overflow: "hidden",
              }}
              onClick={() => dismissOne(n.id)}
            >
              <span style={{ fontSize: "0.95rem", flexShrink: 0 }}>
                {n.icon}
              </span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p
                  style={{ color: S.text, fontSize: "0.7rem", lineHeight: 1.4 }}
                >
                  {n.text}
                </p>
                <p style={{ color: S.muted, fontSize: "0.6rem", marginTop: 2 }}>
                  {n.time}
                </p>
              </div>
              <span
                style={{
                  color: S.muted,
                  fontSize: "0.65rem",
                  flexShrink: 0,
                  paddingTop: 1,
                }}
              >
                ✕
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
