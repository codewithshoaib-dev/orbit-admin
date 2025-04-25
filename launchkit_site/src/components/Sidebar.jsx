import { Link, useLocation } from "react-router-dom";
import { dashboardNav } from "../nav/dashboardNav";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // Icons for toggle

const Sidebar = () => {
  const { pathname } = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className={`${
        isCollapsed ? "w-16" : "w-64"
      } bg-white border-r hidden md:flex flex-col transition-all duration-300`}
    >
      <div className="p-4 flex items-center justify-between border-b">
        <span className={`${isCollapsed ? "hidden" : "text-xl font-bold"}`}>
          Admin
        </span>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-all duration-200"
          aria-label={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {isCollapsed ? (
            <Menu className="w-5 h-5 text-gray-600" />
          ) : (
            <X className="w-5 h-5 text-gray-600" />
          )}
        </button>
      </div>
      <nav className="flex-1">
        {dashboardNav.map(({ name, path, icon: Icon }) => (
          <Link
            key={path}
            to={path}
            className={`flex items-center px-4 py-3 hover:bg-gray-100 ${
              pathname === path ? "bg-gray-200 font-semibold" : ""
            }`}
          >
            <Icon className="w-5 h-5 mr-3" />
            <span className={`${isCollapsed ? "hidden" : ""}`}>{name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
