export type Section = "overview" | "ecommerce" | "analytics" | "customers";
export type SettingsSection = "messages" | "reviews" | "settings" | "help";

export interface Notification {
  id: number;
  icon: string;
  text: string;
  time: string;
}

export interface Activity {
  id: number;
  text: string;
  done: boolean;
}

export interface Contact {
  id: number;
  name: string;
  role: string;
  email: string;
  phone: string;
  status: "online" | "busy" | "away" | "offline";
  highlight: boolean;
}
