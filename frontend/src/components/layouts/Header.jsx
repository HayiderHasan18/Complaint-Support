import { Sun, Moon, Sparkles, Menu, Bot } from "lucide-react";
import { useEffect, useState } from "react";
import { getProfile } from "../../services/authApi";
import { fetchSettings } from "../../services/settingsService";

function Header({ dark, setDark, setSidebarOpen, setAiOpen }) {
  const BACKEND_URL = "http://localhost:5000";
  const [user, setUser] = useState({});
  const [company, setCompany] = useState({});

  useEffect(() => {
    getProfile().then(res => setUser(res.data.user || {})).catch(() => {});
    fetchSettings().then(res =>
      setCompany({
        name: res.data.company_name || "Your Company",
        logo: res.data.logo ? BACKEND_URL + res.data.logo : ""
      })
    ).catch(() => {});
  }, []);

  const isLogged = !!user.username;
  const name = isLogged ? user.username : "Customer";
  const role = isLogged ? user.role : "User";
  const avatar = user.avatar
    ? user.avatar.startsWith("http") ? user.avatar : BACKEND_URL + user.avatar
    : null;

  return (
    <header className="h-14 border-b-4 border-gray-300 bg-white dark:bg-gray-900 flex items-center justify-between px-4 lg:px-6">
      
     
      <div className="flex items-center gap-2 font-semibold text-blue-600">
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <Menu className="dark:text-white" size={20} />
        </button>

        {company.logo ? (
          <img
            src={company.logo}
            alt="Logo"
            className="w-9 h-9 rounded-full object-cover border-2 border-blue-500 shadow-md"
          />
        ) : (
          <div className="w-9 h-9 bg-blue-600 text-white flex items-center justify-center rounded-full border-2 border-blue-400 shadow-md font-bold">
            {company.name?.charAt(0)}
          </div>
        )}
        <span className="hidden sm:block">{company.name}</span>
      </div>

      
      <h1 className="font-bold text-sm sm:text-base md:text-xl dark:text-white">
       AI Complaint Assistance System
      </h1>

      
      <div className="flex items-center gap-3">
        <button
          onClick={() => setDark(!dark)}
          className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          {dark ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} />}
        </button>

       
        <button
          onClick={() => setAiOpen(true)}
          className="lg:hidden p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <Bot size={20} className="dark:text-white" />
        </button>

        <div className="flex items-center gap-2">
          {isLogged ? (
            <>
              {avatar ? (
                <img src={avatar} alt={name} className="w-8 h-8 rounded-full object-cover" />
              ) : (
                <div className="w-8 h-8 bg-gray-400 flex items-center justify-center rounded-full text-white font-bold">
                  {name.charAt(0)}
                </div>
              )}
              <div className="hidden sm:block">
                <p className="text-sm font-semibold dark:text-gray-100">{name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{role}</p>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Sparkles size={22} className="text-blue-500" />
              <div className="hidden sm:block">
                <p className="text-sm font-semibold dark:text-gray-100">{name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{role}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
