import { FaBars, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Topbar = ({ toggleSidebar}) => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const  handleLogout = () => logout();
  return (
    <div className="flex items-center justify-between h-14 bg-white border-b px-4 lg:px-6 sticky top-0 z-50">
      {/* Left Section: Hamburger Icon and Title */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="lg:hidden p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
          aria-label="Toggle Sidebar"
        >
          <FaBars className="text-xl text-gray-700" />
        </button>
        <h1 className="text-lg font-semibold text-gray-800">Dashboard</h1>
      </div>

      {/* Right Section: Actions */}
      <div className="flex items-center gap-3">
        <button
          onClick={ () => navigate('content/create')}
          className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition"
        >
          New Blog
        </button>
        <button
          onClick={() => handleLogout}
          className="px-3 py-1.5 bg-gray-100 text-gray-800 text-sm rounded hover:bg-gray-200 transition"
        >
          Logout
        </button>
        <button
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
          aria-label="User Profile"
        >
          <FaUserCircle className="text-xl text-gray-700" />
        </button>
      </div>
    </div>
  );
};

export default Topbar;
