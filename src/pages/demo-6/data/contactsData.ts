import type { Contact } from "../types";

export const CONTACTS: Contact[] = [
  {
    id: 1,
    name: "Nataniel Donowan",
    role: "Sales Lead",
    email: "n.donowan@co.com",
    phone: "+1 555 0101",
    status: "online",
    highlight: true,
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "Account Mgr",
    email: "priya@co.com",
    phone: "+1 555 0102",
    status: "busy",
    highlight: false,
  },
  {
    id: 3,
    name: "Marco Torres",
    role: "Support",
    email: "marco@co.com",
    phone: "+1 555 0103",
    status: "online",
    highlight: false,
  },
  {
    id: 4,
    name: "Julia Chen",
    role: "Marketing",
    email: "julia@co.com",
    phone: "+1 555 0104",
    status: "away",
    highlight: false,
  },
  {
    id: 5,
    name: "Amir Hassan",
    role: "DevOps",
    email: "amir@co.com",
    phone: "+1 555 0105",
    status: "offline",
    highlight: false,
  },
];
