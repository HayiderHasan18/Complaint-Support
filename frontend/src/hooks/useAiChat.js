import { useState } from "react";
import { sendMessageToAi } from "../services/aiService";

export function useAiChat(role = "customer",initialMessages = []) {
  const [messages, setMessages] = useState(initialMessages);
  const [loading, setLoading] = useState(false);
  const simulateTyping = (fullText) => {
    let index = 0;
    setMessages(prev => [...prev, { text: "", isUser: false }]);

    const interval = setInterval(() => {
      setMessages(prev => {
        const updated = [...prev];
        const last = updated[updated.length - 1];
        if (last && !last.isUser) {
          updated[updated.length - 1] = {
            ...last,
            text: fullText.slice(0, index + 1),
          };
        }

        return updated;
      });

      index++;
      if (index >= fullText.length) clearInterval(interval);
    }, 20); 
  };

  const sendMessage = async (text) => {
    if (!text.trim()) return;
    setMessages(prev => [...prev, { text, isUser: true }]);
    setLoading(true);

    const reply = await sendMessageToAi(text,role);

    simulateTyping(reply);

    setLoading(false);
  };

  return { messages,setMessages, sendMessage, loading };
}
