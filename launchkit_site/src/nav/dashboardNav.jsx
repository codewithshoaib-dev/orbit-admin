import { Home, FileText, Settings, ArrowDownToDot } from "lucide-react";

export const dashboardNav = [
  { name: "Dashboard", path: "/dashboard", icon: Home },
  { name: "Content", path: "/dashboard/content", icon: FileText },
  { name: "Settings", path: "/dashboard/settings", icon: Settings },
  { name: "Categories", path: "/categories", icon: ArrowDownToDot},
];
