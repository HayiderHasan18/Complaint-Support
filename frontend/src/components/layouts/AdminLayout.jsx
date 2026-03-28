import { Outlet } from "react-router-dom";
import { useState } from "react";
import Header from "./Header";
import Sidebar from "../layouts/LeftSidebar";
import AiSidebar from "../ai/AiSidebar";
import Footer from "./Footer";
import ProtectedRoute from "../ProtectedRoute";

function AdminLayout({ dark, setDark }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);

  return (
    <ProtectedRoute>
      <div className="h-screen flex flex-col">
        
     
        <Header
          dark={dark}
          setDark={setDark}
          setSidebarOpen={setSidebarOpen}
          setAiOpen={setAiOpen}
        />

        
        <div className="flex flex-1 overflow-hidden">

         
          <Sidebar
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />

          
          <main className="flex-1 p-4 sm:p-6 overflow-y-auto bg-gray-50 dark:bg-gray-800">
            <Outlet />
          </main>

          
          <AiSidebar role="admin" aiOpen={aiOpen} setAiOpen={setAiOpen} />

        </div>

        <Footer />
      </div>
    </ProtectedRoute>
  );
}

export default AdminLayout;
