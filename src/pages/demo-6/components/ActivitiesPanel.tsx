import { useState, useCallback } from "react";
import { gsap } from "gsap";
import { S } from "../data/tokens";
import { INIT_ACTIVITIES } from "../data/activitiesData";
import type { Activity } from "../types";

export function ActivitiesPanel() {
  const [activities, setActivities] = useState<Activity[]>(INIT_ACTIVITIES);

  const toggle = useCallback(
    (id: number) => {
      const el = document.querySelector(
        `[data-activity="${id}"] .activity-text`,
      ) as HTMLElement | null;
      const isDone = activities.find((a) => a.id === id)?.done;
      if (el) {
        gsap.to(el, {
          textDecoration: isDone ? "none" : "line-through",
          opacity: isDone ? 1 : 0.45,
          duration: 0.25,
        });
      }
      setActivities((prev) =>
        prev.map((a) => (a.id === id ? { ...a, done: !a.done } : a)),
      );
    },
    [activities],
  );

  return (
    <div
      style={{ borderTop: `1px solid ${S.border}`, padding: "14px 14px 16px" }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <p style={{ color: S.text, fontWeight: 600, fontSize: "0.85rem" }}>
          Activities
        </p>
        <span style={{ color: S.muted, fontSize: "0.65rem" }}>
          {activities.filter((a) => a.done).length}/{activities.length} done
        </span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {activities.map((a) => (
          <div
            key={a.id}
            data-activity={a.id}
            onClick={() => toggle(a.id)}
            style={{
              display: "flex",
              gap: 8,
              alignItems: "flex-start",
              cursor: "pointer",
              padding: "4px 0",
            }}
          >
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: 3,
                flexShrink: 0,
                marginTop: 2,
                border: `1.5px solid ${a.done ? S.green : S.muted}`,
                background: a.done ? S.green : "transparent",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s",
              }}
            >
              {a.done && (
                <span
                  style={{
                    color: "#0D1117",
                    fontSize: "0.6rem",
                    lineHeight: 1,
                  }}
                >
                  ✓
                </span>
              )}
            </div>
            <p
              className="activity-text"
              style={{
                color: a.done ? S.muted : S.text,
                fontSize: "0.74rem",
                lineHeight: 1.4,
                textDecoration: a.done ? "line-through" : "none",
                opacity: a.done ? 0.45 : 1,
                transition: "color 0.2s",
              }}
            >
              {a.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
