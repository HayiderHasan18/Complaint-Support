import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useState, useEffect } from "react";

import AdminLayout from "./components/layouts/AdminLayout";
import Complaints from "./pages/admin/Complaints";
import ComplaintDetails from "./pages/admin/ComplaintDetail";
import Dashboard from "./pages/admin/Dashboard";
import Reports from "./pages/admin/Reports";
import Settings from "./pages/admin/Settings";

import SubmitComplaint from "./pages/customer/SubmitComplaint";
import AuthPage from "./components/Auth/AuthPage";


function App() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <BrowserRouter>
        <ToastContainer position="top-right" autoClose={3000} />

        <Routes>
          
          <Route path="/" element={<SubmitComplaint />} />
          <Route path="/login" element={<AuthPage />} />
         
          <Route
            path="/admin"
            element={<AdminLayout dark={dark} setDark={setDark} />}
          >
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="complaints" element={<Complaints />} />
            <Route path="complaints/:id" element={<ComplaintDetails />} />
            <Route path="reports" element={<Reports />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          
          <Route path="*" element={<AuthPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
