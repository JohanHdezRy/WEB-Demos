import vinil0 from "../../../styles/img/vinil_0.png";
import vinil1 from "../../../styles/img/vinil_1.webp";
import vinil2 from "../../../styles/img/vinil_2.png";
import vinil3 from "../../../styles/img/vinil_3.png";
import vinil4 from "../../../styles/img/vinil_4.png";
import vinil5 from "../../../styles/img/vinil_5.webp";
import vinil6 from "../../../styles/img/vinil_6.webp";
import vinil7 from "../../../styles/img/vinil_7.webp";
import vinil8 from "../../../styles/img/vinil_8.webp";
import vinil9 from "../../../styles/img/vinil_9.webp";
import vinil10 from "../../../styles/img/vinil_10.webp";
import type { RouletteItem, FolderItem } from "../types";

export { vinil3 };

export const ROULETTE: RouletteItem[] = [
  {
    img: vinil0,
    title: "EVANGELION FINALLY",
    artist: "Various Artists",
    genre: "Anime OST / 180G",
    label: "Special Press",
  },
  {
    img: vinil3,
    title: "HIT ME HARD & SOFT",
    artist: "Billie Eilish",
    genre: "Pop / Color Vinyl",
    label: "Featured Selection",
  },
  {
    img: vinil4,
    title: "DISCOVERY",
    artist: "Daft Punk",
    genre: "Electronic / 2LP",
    label: "Rare Pressing",
  },
  {
    img: vinil1,
    title: "PLASTIC BEACH",
    artist: "Gorillaz",
    genre: "Alternative / 2LP",
    label: "Now Spinning",
  },
  {
    img: vinil8,
    title: "ANALOG BLOOM",
    artist: "Aphex Twin",
    genre: "IDM / Limited Ed",
    label: "Collector's Pick",
  },
  {
    img: vinil6,
    title: "NEON CORRIDORS",
    artist: "Boards of Canada",
    genre: "IDM / Double LP",
    label: "Staff Favourite",
  },
  {
    img: vinil2,
    title: "PURPLE EP",
    artist: "Unknown Signal",
    genre: "Electronic / Ltd Ed",
    label: "Underground Cut",
  },
];

export const FOLDERS: FolderItem[] = [
  {
    title: "SYNTHIA VOLT",
    subtitle: "Midnight Modulations",
    genre: "Electronic / 180G",
    price: "$34",
    imgs: [vinil0, vinil3, vinil8],
  },
  {
    title: "RAILWAY NOISE",
    subtitle: "Underpass Echoes",
    genre: "Techno / Ltd Ed",
    price: "$42",
    imgs: [vinil1, vinil4, vinil9],
  },
  {
    title: "OBLIVION CORE",
    subtitle: "Frozen Frequency",
    genre: "Ambient / Double LP",
    price: "$29",
    imgs: [vinil2, vinil5, vinil10],
  },
  {
    title: "NEON PULSE",
    subtitle: "Vector Subsets",
    genre: "Synthwave / Color",
    price: "$38",
    imgs: [vinil3, vinil6, vinil0],
  },
  {
    title: "METROPOLIS",
    subtitle: "Echo Chamber",
    genre: "Industrial / Dark",
    price: "$45",
    imgs: [vinil4, vinil7, vinil1],
  },
  {
    title: "VOID RATIO",
    subtitle: "The Glitch",
    genre: "Glitch / Experimental",
    price: "$31",
    imgs: [vinil5, vinil8, vinil2],
  },
];
