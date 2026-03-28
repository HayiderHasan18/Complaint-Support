import api from "./api";

export const getDashboardStats = () =>
  api.get("/reports/dashboard");

export const getComplaintsByCategory = (params) =>
  api.get("/reports/categories", { params });

export const getUrgencyStats = (params) =>
  api.get("/reports/urgency", { params });
