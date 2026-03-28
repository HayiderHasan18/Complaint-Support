import api from "./api";


export async function sendMessageToAi(message, role = "customer") {
  try {
    let res;
    if (role === "admin") {
      res = await api.post("/ai/admin/chat", { message });
    } else {
      res = await api.post("/ai/chat", { message });
    }
    return res.data.reply; 
  } catch (err) {
    console.error("AI API error:", err);
    return "AI is unavailable right now.";
  }
}
export async function fetchAdminChatHistory() {
  try {
    const res = await api.get("/ai/chat-history");
    if (res.data && Array.isArray(res.data.history)) {
      return res.data.history;
    } else {
      return [];
    }
  } catch (err) {
    console.error("Failed to fetch chat history:", err);
    return [];
  }
}