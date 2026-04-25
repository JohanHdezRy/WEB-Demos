import type { MasonryItem } from "@/components/animations/Masonry";

export interface Product {
  id: number;
  src: string;
  label: string;
  price: string;
}

export interface Look {
  id: number;
  src: string;
  label: string;
  desc: string;
}

export type { MasonryItem };
