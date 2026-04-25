import { useEffect } from 'react'

/**
 * Inyecta una hoja de estilos de Google Fonts en el <head> del documento.
 * Solo la agrega una vez, aunque el componente monte/desmonte varias veces.
 */
export function useFonts(href: string) {
  useEffect(() => {
    if (document.querySelector(`link[href="${href}"]`)) return
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = href
    document.head.appendChild(link)
  }, [href])
}
