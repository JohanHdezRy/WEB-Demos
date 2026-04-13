import { useState, useEffect } from 'react'

export function useMedia(queries: string[], values: number[], defaultValue: number): number {
  const get = () => values[queries.findIndex(q => matchMedia(q).matches)] ?? defaultValue
  const [value, setValue] = useState<number>(get)

  useEffect(() => {
    const mqls = queries.map(q => matchMedia(q))
    const handler = () => setValue(get)
    mqls.forEach(mql => mql.addEventListener('change', handler))
    return () => mqls.forEach(mql => mql.removeEventListener('change', handler))
  }, [queries])

  return value
}
