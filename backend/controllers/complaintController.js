import { StatusCodes } from "http-status-codes";
import * as complaintService from "../services/complaintService.js";
import { analyzeComplaint } from "../services/aiService.js";
import { sendMail } from "../services/mailService.js";

export const submitComplaint = async (req, res) => {
  const { customer_name, contact, issue, message } = req.body;

  if (!customer_name || !contact || !issue || !message) {
    return res.status(StatusCodes.BAD_REQUEST).json({ msg: "All fields are required" });
  }

  try {
    
    const complaintId = await complaintService.saveComplaint({ customer_name, contact, issue, message });

    const aiResult = await analyzeComplaint(message);

    await complaintService.saveAIAnalysis({
      complaintId,
      category: aiResult.category,
      urgency: aiResult.urgency,
      confidence: aiResult.confidence,
      summary: aiResult.summary || "AI analysis not available.",
      draftResponse: aiResult.draftResponse
    });

    return res.status(StatusCodes.CREATED).json({
      msg: "Complaint submitted successfully",
      complaintId,
      aiAnalysis: aiResult
    });
  } catch (error) {
    console.error(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Something went wrong, try again later" });
  }
};

export const getAllComplaints = async (req, res) => {
  try {
    const complaints = await complaintService.getAllComplaints();
    return res.status(StatusCodes.OK).json(complaints);
  } catch (err) {
    console.error(err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Something went wrong" });
  }
};
export const getSingleComplaints = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await complaintService.getComplaintWithAnalysis(id);

    if (!result) {
      return res.status(StatusCodes.NOT_FOUND).json({ msg: "Complaint not found" });
    }

    return res.status(StatusCodes.OK).json(result);
  } catch (error) {
    console.error(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Something went wrong" });
  }
};
export const markResolved = async (req, res) => {
  try {
    const { id } = req.params;
    await complaintService.markComplaintResolved(id);
    res.json({ msg: "Complaint marked as resolved" });
  } catch (e) {
    res.status(500).json({ msg: "Failed to update status" });
  }
};
export const closeComplaint = async (req, res) => {
  try {
    const { id } = req.params;
    const { responseText } = req.body;

    const result = await complaintService.getComplaintWithAnalysis(id);

    if (!result || !result.complaint) return res.status(404).json({ msg: "Complaint not found" });

    await sendMail(
      result.complaint.contact,
      `Response to your complaint #${id}`,
      responseText
    );

    await complaintService.closeComplaint(id, responseText);

    res.json({ msg: "Complaint closed and draft response sent to customer" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: "Failed to close complaint" });
  }
};
