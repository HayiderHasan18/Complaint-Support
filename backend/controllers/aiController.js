import { StatusCodes } from "http-status-codes";
import db from "../config/db.js";
import {analyzeComplaint,chatWithAI,adminAICopilot,adminChatAI
} from "../services/aiService.js";

export const analyzeComplaintController = async (req, res) => {
  const { complaint_text } = req.body;

  if (!complaint_text) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "complaint_text is required" });
  }

  try {
    const aiResult = await analyzeComplaint(complaint_text);

    return res.status(StatusCodes.OK).json({
      msg: "Analysis successful",
      analysis: aiResult,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong" });
  }
};


export const aiChatController = async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Message is required" });
  }

  try {
    const aiReply = await chatWithAI(message);
    return res.status(StatusCodes.OK).json({ reply: aiReply });
  } catch (err) {
    console.error(err);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "AI chat failed" });
  }
};


export const adminChatController = async (req, res) => {
  const { message } = req.body;
  const adminId = req.user.userid;

  if (!message) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Message is required" });
  }

  try {
    
    const copilotRegex =
      /summary|summarize|trend|urgent|report|stats|analysis|actions/i;

    const isCopilot = copilotRegex.test(message);

    const aiReply = isCopilot
      ? await adminAICopilot(message) 
      : await adminChatAI(message);  

  
    const [sessions] = await db.query(
      "SELECT id FROM ai_chat_sessions WHERE user_type='admin' AND user_identifier=? LIMIT 1",
      [adminId]
    );

    let sessionId;
    if (sessions.length === 0) {
      const [newSession] = await db.query(
        "INSERT INTO ai_chat_sessions (user_type, user_identifier) VALUES (?, ?)",
        ["admin", adminId]
      );
      sessionId = newSession.insertId;
    } else {
      sessionId = sessions[0].id;
    }

    await db.query(
      "INSERT INTO ai_chat_messages (session_id, sender, message) VALUES (?, 'admin', ?)",
      [sessionId, message]
    );

    await db.query(
      "INSERT INTO ai_chat_messages (session_id, sender, message) VALUES (?, 'ai', ?)",
      [sessionId, typeof aiReply === "string" ? aiReply : JSON.stringify(aiReply)]
    );

    return res.status(StatusCodes.OK).json({
      mode: isCopilot ? "copilot" : "admin-chat",
      reply: aiReply,
    });
  } catch (err) {
    console.error("Admin chat failed:", err);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Admin AI chat failed" });
  }
};

export const aiChatHistoryController = async (req, res) => {
  try {
    const adminId = req.user.userid;

    const [sessions] = await db.query(
      "SELECT id FROM ai_chat_sessions WHERE user_type='admin' AND user_identifier=? LIMIT 1",
      [adminId]
    );

    if (sessions.length === 0) {
      return res.status(StatusCodes.OK).json({ history: [] });
    }

    const sessionId = sessions[0].id;

    const [messages] = await db.query(
      `SELECT sender, message, created_at
       FROM ai_chat_messages
       WHERE session_id = ?
       ORDER BY created_at ASC`,
      [sessionId]
    );

    return res.status(StatusCodes.OK).json({ history: messages });
  } catch (error) {
    console.error(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong" });
  }
};
