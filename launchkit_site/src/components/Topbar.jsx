import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Topbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="flex items-center justify-between px-6 py-3 bg-white border-b">
      <div className="text-lg font-bold">Dashboard</div>
      <div className="flex items-center space-x-4">
        <span>{user?.username}</span>
        <button
          onClick={logout}
          className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Topbar;
