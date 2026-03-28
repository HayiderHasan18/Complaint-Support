import { useState } from "react";
import * as reportService from "../services/reports.service";

export default function useReports() {
  const [stats, setStats] = useState(null);
  const [categories, setCategories] = useState([]);
  const [urgency, setUrgency] = useState([]);

  const loadReports = async (params) => {
    const [s, c, u] = await Promise.all([
      reportService.getDashboardStats(),
      reportService.getComplaintsByCategory(params),
      reportService.getUrgencyStats(params),
    ]);

    setStats(s.data);
    setCategories(c.data);
    setUrgency(u.data);
  };

  return { stats, categories, urgency, loadReports };
}
