import {
  LayoutDashboard,
  Calendar,
  User,
  Heart,
  Bell,
  Settings,
  ShoppingCart,
  Users,
  BarChart2,
  Package,
  ClipboardList,
  Layout,
} from "lucide-react";
import {
  SidebarMenuItem,
  AdminNavigationItem,
} from "../types/SidebarDataTypes";

// Customer Dashboard Menu Items
export const CustomerMenuItems: SidebarMenuItem[] = [
  { icon: LayoutDashboard, label: "Overview", path: "/dashboard" },
  { icon: Calendar, label: "Appointments", path: "/dashboard/appointments" },
  {
    icon: ShoppingCart,
    label: "Marketplace",
    path: "/dashboard/marketplace",
  },
  { icon: User, label: "Pet Profile", path: "/dashboard/profile" },
  { icon: Heart, label: "Health", path: "/dashboard/health" },
  { icon: Bell, label: "Notifications", path: "/dashboard/notifications" },
  { icon: Settings, label: "Settings", path: "/dashboard/settings" },
];

// Admin Dashboard Menu Items
export const AdminNavigationItems: AdminNavigationItem[] = [
  { id: "overview", label: "Overview", icon: Layout, path: "/admin/overview" },
  { id: "users", label: "Users", icon: Users, path: "/admin/users" },
  {
    id: "appointments",
    label: "Appointments",
    icon: Calendar,
    path: "/admin/appointments",
  },
  { id: "services", label: "Services", icon: Package, path: "/admin/services" },
  {
    id: "analytics",
    label: "Analytics",
    icon: BarChart2,
    path: "/admin/analytics",
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    path: "/admin/settings",
  },
  {
    id: "logs",
    label: "Activity Logs",
    icon: ClipboardList,
    path: "/admin/logs",
  },
];
