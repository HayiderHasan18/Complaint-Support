import api from "./api";

export const fetchSettings = () => api.get("/settings");

export const updateSettingsAPI = (data) => api.put("/settings", data);
