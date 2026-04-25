import { useState, useCallback } from "react";

export function useVinylRoulette(count: number) {
  const [active, setActive] = useState(0);

  const prev = useCallback(
    () => setActive((i) => (i - 1 + count) % count),
    [count]
  );
  const next = useCallback(
    () => setActive((i) => (i + 1) % count),
    [count]
  );

  const leftIdx = (active - 1 + count) % count;
  const rightIdx = (active + 1) % count;

  return { active, leftIdx, rightIdx, prev, next };
}
