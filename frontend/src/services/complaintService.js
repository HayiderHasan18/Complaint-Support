import api from "./api";

export const createComplaint = (data) =>
  api.post("/complaints", data);

export const getComplaints = (params) =>
  api.get("/complaints", { params });

export const getComplaintById = (id) =>
  api.get(`/complaints/${id}`);

export const markResolved = (id) =>
  api.put(`/complaints/${id}/resolve`);

export const closeComplaint = (id, responseText) =>
  api.put(`/complaints/${id}/close`, { responseText });