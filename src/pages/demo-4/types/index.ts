export interface RouletteItem {
  img: string;
  title: string;
  artist: string;
  genre: string;
  label: string;
}

export interface FolderItem {
  title: string;
  subtitle: string;
  genre: string;
  price: string;
  imgs: string[];
}

export interface FooterColumn {
  heading: string;
  links: string[];
}
