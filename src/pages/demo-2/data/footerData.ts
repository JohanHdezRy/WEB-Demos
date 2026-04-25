import type { FooterColumn } from "../types";

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "Restaurante",
    links: ["Menú del día", "Carta de vinos", "Postres", "Menú niños", "Alérgenos"],
  },
  {
    title: "Visítanos",
    links: ["Reservar mesa", "Eventos privados", "Catering", "Gift cards", "Trabaja con nosotros"],
  },
  {
    title: "Horarios",
    links: [
      "Lun–Vie: 7–23:30",
      "Sáb–Dom: 8–00:00",
      "Cocina hasta las 23:00",
      "Tel: +39 02 4829",
      "hello@rinacita.it",
    ],
  },
];

export const SOCIAL_LINKS = ["ig", "fb", "tw", "yt"] as const;
export const NAV_LINKS = ["Menú", "Historia", "Reservas"] as const;
export const LEGAL_LINKS = ["Privacidad", "Cookies", "Aviso legal"] as const;
