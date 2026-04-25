import type { MasonryItem, Product, Look } from "../types";

export const NAV_LINKS: string[] = ["Collections", "Editorial", "About", "Contact"];

export const HERO_VIDEO = "https://cdn.pixabay.com/video/2025/01/21/253877_large.mp4";

export const FULLWIDTH_VIDEO = "https://www.pexels.com/es-es/download/video/6460106/";

export const PRODUCTS: Product[] = [
  {
    id: 1,
    src: "https://cdn.pixabay.com/photo/2024/08/25/13/49/woman-8996552_1280.jpg",
    label: "Evening Dress",
    price: "$890",
  },
  {
    id: 2,
    src: "https://images.pexels.com/photos/2220316/pexels-photo-2220316.jpeg?auto=compress&cs=tinysrgb&w=800&h=1200&fit=crop",
    label: "Silk Blouse",
    price: "$340",
  },
  {
    id: 3,
    src: "https://images.pexels.com/photos/9950902/pexels-photo-9950902.jpeg",
    label: "Tailored Coat",
    price: "$1,200",
  },
  {
    id: 4,
    src: "https://cdn.pixabay.com/photo/2019/08/07/07/05/woman-4390055_1280.jpg",
    label: "Wide Trousers",
    price: "$480",
  },
  {
    id: 5,
    src: "https://cdn.pixabay.com/photo/2024/11/08/05/28/man-9182458_1280.jpg",
    label: "Linen Suit",
    price: "$760",
  },
  {
    id: 6,
    src: "https://cdn.pixabay.com/photo/2021/08/12/13/39/woman-6540891_1280.jpg",
    label: "Draped Skirt",
    price: "$295",
  },
  {
    id: 7,
    src: "https://cdn.pixabay.com/photo/2026/04/06/08/06/08-06-52-345_1280.jpg",
    label: "Leather Jacket",
    price: "$980",
  },
  {
    id: 8,
    src: "https://cdn.pixabay.com/photo/2025/03/12/09/59/fashion-9464875_1280.jpg",
    label: "Satin Gown",
    price: "$1,450",
  },
  {
    id: 9,
    src: "https://cdn.pixabay.com/photo/2017/03/02/16/12/asian-2111681_1280.jpg",
    label: "Knit Cardigan",
    price: "$320",
  },
];

export const LOOKS: Look[] = [
  {
    id: 1,
    src: "https://cdn.pixabay.com/photo/2022/06/07/15/56/child-7248693_1280.jpg",
    label: "Look 01",
    desc: "Spring / Summer",
  },
  {
    id: 2,
    src: "https://images.pexels.com/photos/3755706/pexels-photo-3755706.jpeg?auto=compress&cs=tinysrgb&w=700&h=1000&fit=crop",
    label: "Look 02",
    desc: "Resort Collection",
  },
  {
    id: 3,
    src: "https://cdn.pixabay.com/photo/2023/10/24/21/15/nature-8339115_1280.jpg",
    label: "Look 03",
    desc: "Autumn / Winter",
  },
  {
    id: 4,
    src: "https://images.pexels.com/photos/1844012/pexels-photo-1844012.jpeg?auto=compress&cs=tinysrgb&w=700&h=1000&fit=crop",
    label: "Look 04",
    desc: "Capsule Edition",
  },
  {
    id: 5,
    src: "https://images.pexels.com/photos/2220316/pexels-photo-2220316.jpeg?auto=compress&cs=tinysrgb&w=700&h=1000&fit=crop",
    label: "Look 05",
    desc: "Couture Line",
  },
];

export const MASONRY_ITEMS: MasonryItem[] = [
  { id: "m1", img: "https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=600", url: "#", height: 900 },
  { id: "m2", img: "https://images.pexels.com/photos/2220316/pexels-photo-2220316.jpeg?auto=compress&cs=tinysrgb&w=600", url: "#", height: 740 },
  { id: "m3", img: "https://images.pexels.com/photos/3622608/pexels-photo-3622608.jpeg?auto=compress&cs=tinysrgb&w=600", url: "#", height: 820 },
  { id: "m4", img: "https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?auto=compress&cs=tinysrgb&w=600", url: "#", height: 680 },
  { id: "m5", img: "https://cdn.pixabay.com/photo/2023/10/24/21/15/nature-8339115_1280.jpg", url: "#", height: 760 },
  { id: "m6", img: "https://images.pexels.com/photos/3755706/pexels-photo-3755706.jpeg?auto=compress&cs=tinysrgb&w=600", url: "#", height: 840 },
  { id: "m7", img: "https://cdn.pixabay.com/photo/2022/11/12/00/05/girl-7586011_1280.jpg", url: "#", height: 720 },
  { id: "m8", img: "https://cdn.pixabay.com/photo/2020/09/25/16/50/portrait-5601950_1280.jpg", url: "#", height: 860 },
  { id: "m9", img: "https://images.pexels.com/photos/1844012/pexels-photo-1844012.jpeg?auto=compress&cs=tinysrgb&w=600", url: "#", height: 780 },
  { id: "m10", img: "https://cdn.pixabay.com/photo/2025/07/31/20/00/woman-9747618_1280.jpg", url: "#", height: 700 },
  { id: "m11", img: "https://cdn.pixabay.com/photo/2024/04/16/23/00/young-8700870_1280.jpg", url: "#", height: 810 },
  { id: "m12", img: "https://images.pexels.com/photos/2220318/pexels-photo-2220318.jpeg?auto=compress&cs=tinysrgb&w=600", url: "#", height: 750 },
];

export const MAGAZINE_COVERS: string[] = [
  "https://media.vogue.es/photos/60f162af8cd5d756f8ca22c7/master/pass/SEPT_COVER01_SINCODIGO_page-0001.jpg",
  "https://www.yourcelebritymagazines.com/cdn/shop/files/juliagarner.webp?v=1757071255",
  "https://vanityfair.blob.core.windows.net/vanityfair20240601thumbnails/Spreads/0x600/1.jpg",
  "https://files.coverscdn.com/covers/191757/low/0000.jpg",
  "https://m.media-amazon.com/images/I/81hKsyzqlKL._AC_UF1000,1000_QL80_.jpg",
];
