import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { useState } from "react";

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
   
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

  
      <div className="flex flex-col flex-1 transition-all duration-300 ease-in-out">
    
        <Topbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      
        <main className="p-4 overflow-y-auto flex-1 bg-white shadow-lg rounded-lg mt-4 mx-2">
          {children}
        </main>
      </div>

    {sidebarOpen && (
  <div
    className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
    onClick={() => setSidebarOpen(false)}
  ></div>
)}

    </div>
  );
};

export default DashboardLayout;
