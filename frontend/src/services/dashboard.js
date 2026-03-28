
import api from "./api";
export const fetchDashboard = () => api.get("/dashboard");
export const fetchReports = (params) =>
  api.get("/reports", { params }).then(res => res.data);
