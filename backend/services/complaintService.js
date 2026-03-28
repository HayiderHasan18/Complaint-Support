import db from "../config/db.js";


export const saveComplaint = async ({ customer_name, contact, issue, message }) => {
  const [result] = await db.query(
    "INSERT INTO complaints (customer_name, contact, issue, message, status) VALUES (?, ?, ?, ?, 'pending')",
    [customer_name || null, contact, issue, message]
  );

  return result.insertId;
};


export const saveAIAnalysis = async ({ complaintId, category, urgency, confidence,summary,draftResponse }) => {
  await db.query(
    "INSERT INTO ai_analysis (complaint_id, category, urgency, confidence,summary,draft_response) VALUES (?, ?, ?, ?,?,?)",
    [complaintId, category, urgency, confidence,summary,draftResponse]
  );
};


export const getComplaintWithAnalysis = async (complaintId) => {
  const [complaints] = await db.query(
    "SELECT id, customer_name, contact, issue, message, status FROM complaints WHERE id = ?",
    [complaintId]
  );

  if (!complaints.length) return null;

  const complaint = complaints[0];

  
  if (complaint.status === "pending") {
    await db.query(
      "UPDATE complaints SET status='open' WHERE id=?",
      [complaintId]
    );
    complaint.status = "open";
  }

  const [analysisRows] = await db.query(
    "SELECT category, urgency, confidence, summary, draft_response FROM ai_analysis WHERE complaint_id = ?",
    [complaintId]
  );

  return {
    complaint,
    ai_analysis: analysisRows[0] || null
  };
};

export const getAllComplaints = async () => {
  const [rows] = await db.query(
    "SELECT c.id, c.customer_name, c.contact, c.issue, c.status, a.category, a.urgency, a.confidence " +
    "FROM complaints c LEFT JOIN ai_analysis a ON c.id = a.complaint_id " +
    "ORDER BY c.id DESC"
  );
  return rows;
};
export const markComplaintResolved = async (id) => {
  await db.query("UPDATE complaints SET status='resolved',resolved_at=NOW() WHERE id=?", [id]);
};
export const closeComplaint = async (id, draftResponse) => {
  await db.query(
    "UPDATE ai_analysis SET draft_response=? WHERE complaint_id=?",
    [draftResponse, id]
  );

  await db.query(
    "UPDATE complaints SET status='closed' WHERE id=?",
    [id]
  );
};
