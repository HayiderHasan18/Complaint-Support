import { useState } from "react";
import * as complaintService from "../services/complaintService";

export default function useComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchComplaints = async (params) => {
    setLoading(true);
    try {
      const res = await complaintService.getComplaints(params);
      setComplaints(res.data);
    } catch (err) {
      console.error("Failed to fetch complaints:", err);
    } finally {
      setLoading(false);
    }
  };

  return { complaints, loading, fetchComplaints };
}
