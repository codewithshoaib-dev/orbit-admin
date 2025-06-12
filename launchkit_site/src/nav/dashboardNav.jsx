import { Home, FileText, Settings, Layout, List } from "lucide-react";

export const dashboardNav = [
  { name: "Dashboard", path: "/dashboard", icon: Home },
  { name: "Content", path: "/dashboard/content", icon: FileText }, 
  { name: "Settings", path: "/dashboard/settings", icon: Settings }, 
  { name: "Categories", path: "/categories", icon: List }, 
  { name: "Landing Page", path: "", icon: Layout }, 
];
