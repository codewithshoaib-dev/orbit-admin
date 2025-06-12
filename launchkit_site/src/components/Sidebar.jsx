import { Link, useLocation } from "react-router-dom";
import { dashboardNav } from "../nav/dashboardNav";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { pathname } = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black bg-opacity-30 z-30 md:hidden"
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 flex flex-col bg-white border-r shadow-md transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
          ${isCollapsed ? "w-16" : "w-64"}`}
      >
        {/* Top section */}
        <div className="p-4 flex items-center justify-between border-b">
          <span className={`${isCollapsed ? "hidden" : "text-xl font-bold"}`}>
            Admin
          </span>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
            aria-label={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {isCollapsed ? (
              <Menu className="w-5 h-5 text-gray-600" />
            ) : (
              <X className="w-5 h-5 text-gray-600" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto">
          {dashboardNav.map(({ name, path, icon: Icon }) => (
            <Link
              key={path}
              to={path}
              onClick={toggleSidebar}
              className={`flex items-center px-4 py-3 hover:bg-gray-100 transition duration-200
                ${pathname === path ? "bg-gray-200 font-semibold" : ""}`}
            >
              <Icon className="w-5 h-5 mr-3" />
              <span className={`${isCollapsed ? "hidden" : ""}`}>{name}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile close button */}
      {isOpen && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 right-4 z-50 md:hidden p-2 rounded-full bg-gray-200 hover:bg-gray-300"
          aria-label="Close Sidebar"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>
      )}
    </>
  );
};

export default Sidebar;
