import { useState, useEffect } from "react";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import { fetchSettings, updateSettingsAPI } from "../../services/settingsService";
import { changePassword } from "../../services/authApi";
import { toast } from "react-toastify";

const Input = ({ label, value, setValue, type = "text" }) => (
  <div className="mb-3">
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
    />
  </div>
);
function Settings() {
  const BACKEND_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
  const [profile, setProfile] = useState({ companyName: "", address: "", email: "", phone: "" });
  const [password, setPassword] = useState({ current: "", new: "", confirm: "" });
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState("");

  useEffect(() => {
    fetchSettings()
      .then(res => {
        const data = res.data;
        setProfile({
          companyName: data.company_name || "",
          address: data.address || "",
          email: data.email || "",
          phone: data.phone || ""
        });
        setLogoPreview(data.logo ? BACKEND_URL + data.logo : "");
      })
      .catch(() => toast.error("Failed to load settings"));
  }, []);

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLogoFile(file);
    setLogoPreview(URL.createObjectURL(file));
  };

  const handleUpdateProfile = async () => {
    if (!profile.companyName || !profile.address || !profile.email || !profile.phone) {
      return toast.error("All fields are required");
    }
    try {
      const formData = new FormData();
      Object.entries(profile).forEach(([key, value]) => formData.append(key, value));
      if (logoFile) formData.append("logo", logoFile);

      const res = await updateSettingsAPI(formData);
      toast.success(res.data.msg);
      if (res.data.logo) setLogoPreview(BACKEND_URL + res.data.logo);
      setLogoFile(null);
    } catch (err) {
      toast.error(err.response?.data?.msg || "Failed to update profile");
    }
  };

  const handleChangePassword = async () => {
    if (!password.current || !password.new || !password.confirm) return toast.error("All fields are required");
    if (password.new.length < 8) return toast.error("Password must be at least 8 characters");
    if (password.new !== password.confirm) return toast.error("Passwords do not match");

    try {
      const res = await changePassword({ currentPassword: password.current, newPassword: password.new });
      toast.success(res.data.msg);
      setPassword({ current: "", new: "", confirm: "" });
    } catch {
      toast.error("Failed to change password");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-4 text-gray-900 dark:text-gray-100">
      <h1 className="text-2xl font-bold mb-2">Settings</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">Manage your business profile</p>

      
      <Card title="Business Profile" className="mb-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="relative w-20 h-20">
            {logoPreview ? (
              <img
                src={logoPreview}
                alt="Company Logo"
                className="w-20 h-20 rounded-full object-cover border-2 border-blue-500 shadow-md"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center border-2 border-gray-300 dark:border-gray-600 shadow-md text-gray-500 dark:text-gray-200 font-bold">
                Logo
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleLogoChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer rounded-full"
            />
          </div>
        </div>

        {["companyName", "address", "email", "phone"].map(field => (
          <Input
            key={field}
            label={field.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase())}
            value={profile[field]}
            setValue={(v) => setProfile(prev => ({ ...prev, [field]: v }))}
          />
        ))}

        <Button onClick={handleUpdateProfile}>Update Profile</Button>
      </Card>

      <Card title="Account Management">
        {["current", "new", "confirm"].map(field => (
          <Input
            key={field}
            label={field === "current" ? "Current Password" : field === "new" ? "New Password" : "Confirm Password"}
            type="password"
            value={password[field]}
            setValue={(v) => setPassword(prev => ({ ...prev, [field]: v }))}
          />
        ))}
        <Button onClick={handleChangePassword}>Change Password</Button>
      </Card>
    </div>
  );
}

export default Settings;

