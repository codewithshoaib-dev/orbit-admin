import { Link, useLocation } from "react-router-dom";
import { dashboardNav } from "../nav/dashboardNav";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { pathname } = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className={`${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 fixed md:relative z-40 bg-white border-r shadow-md transition-transform duration-300 ease-in-out ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Sidebar Header */}
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

      {/* Navigation Links */}
      <nav className="flex-1">
        {dashboardNav.map(({ name, path, icon: Icon }) => (
          <Link
            key={path}
            to={path}
            className={`flex items-center px-4 py-3 hover:bg-gray-100 transition duration-200 ease-in-out ${
              pathname === path ? "bg-gray-200 font-semibold" : ""
            }`}
          >
            <Icon className="w-5 h-5 mr-3" />
            <span className={`${isCollapsed ? "hidden" : ""}`}>{name}</span>
          </Link>
        ))}
      </nav>

      {/* Close Button for Mobile */}
      <button
        onClick={toggleSidebar}
        className="absolute top-4 right-4 md:hidden p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-all duration-200"
        aria-label="Close Sidebar"
      >
        <X className="w-5 h-5 text-gray-600" />
      </button>
    </div>
  );
};

export default Sidebar;
