import { useEffect, useState } from "react";
import { fetchSettings } from "../../services/settingsService";

function Footer() {
  const [profile, setProfile] = useState({
    companyName: "",
    address: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetchSettings();
        setProfile({
          companyName: res.data.company_name || "",
          address: res.data.address || "",
          email: res.data.email || "",
          phone: res.data.phone || "",
        });
      } catch {}
    };
    load();
  }, []);

  return (
    <footer className="bg-gray-300/60 backdrop-blur-md border-t border-gray-500/40 shadow-inner p-1">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-3 text-sm font-medium text-gray-900">
        
        <div className="flex flex-wrap md:flex-nowrap justify-evenly w-full items-center text-center md:text-left">
          <span>Copyright © {new Date().getFullYear()}</span>
          <span className="font-semibold">{profile.companyName || "Your Company"}</span>
          {profile.address && <span> {profile.address}</span>}
          {profile.email && <span> {profile.email}</span>}
          {profile.phone && <span> {profile.phone}</span>}
          <span> All rights reserved</span>
        </div>

        <div className="text-gray-700 whitespace-nowrap">
          Developed by <span className="font-semibold">Hayider</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
