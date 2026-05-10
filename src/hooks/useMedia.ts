import { useState, useEffect } from "react";

export function useMedia(
  queries: string[],
  values: number[],
  defaultValue: number,
): number {
  const get = () =>
    values[queries.findIndex((q) => matchMedia(q).matches)] ?? defaultValue;
  const [value, setValue] = useState<number>(get);

  const key = queries.join("|");

  useEffect(() => {
    const list = key.split("|");
    const mqls = list.map((q) => matchMedia(q));
    const handler = () => setValue(get);
    mqls.forEach((mql) => mql.addEventListener("change", handler));
    return () => mqls.forEach((mql) => mql.removeEventListener("change", handler));
    // get cierra sobre queries/values/defaultValue; key estabiliza la suscripción
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return value;
}
