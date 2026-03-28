import {
  LayoutDashboard,
  List,
  BarChart3,
  Settings,
  LogOut,
  X
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

const menu = [
  { label: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Complaints", path: "/admin/complaints", icon: List },
  { label: "Reports", path: "/admin/reports", icon: BarChart3 },
  { label: "Settings", path: "/admin/settings", icon: Settings },
];

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const navigate = useNavigate();
  const logout = () => {
    sessionStorage.removeItem("token");
    navigate("/");
  };

  return (
    <aside
      className={`
        fixed lg:static z-40
        top-0 left-0 h-full w-64
        bg-white dark:bg-gray-900
        border-r border-gray-200 dark:border-gray-700
        transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
        flex flex-col
      `}
    >

      <div className="p-2 flex justify-end border-b dark:border-gray-700 lg:hidden">
        <button
          onClick={() => setSidebarOpen(false)}
          className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <X className="dark:text-white" />
        </button>
      </div>

      
      <nav className="flex-1 p-3 space-y-1">
        {menu.map(({ label, path, icon: Icon }) => (
          <NavLink
            key={label}
            to={path}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded text-sm transition
              ${
                isActive
                  ? "bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-300"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      
      <div className="p-3 border-t dark:border-gray-700">
        <button
          onClick={logout}
          className="flex items-center gap-3 px-3 py-2 w-full rounded text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}
