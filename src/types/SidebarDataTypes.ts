import { LucideIcon } from "lucide-react";

// Define a type for the Admin Section IDs
export type AdminSection =
  | "overview"
  | "users"
  | "appointments"
  | "services"
  | "analytics"
  | "settings"
  | "logs";

// Define the Sidebar Menu Item interface
export interface SidebarMenuItem {
  icon: LucideIcon;
  label: string;
  path: string;
}

// Define the Admin Navigation Item type for admin-specific items
export interface AdminNavigationItem {
  id: AdminSection;
  label: string;
  icon: LucideIcon;
  path: string; // Added path property
}
