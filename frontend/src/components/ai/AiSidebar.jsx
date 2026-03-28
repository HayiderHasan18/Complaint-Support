import { useRef, useEffect, useState } from "react";
import { Brain, X } from "lucide-react";
import AiChatMessage from "./AiChatMessage";
import AiInput from "./AiInput";
import { useAiChat } from "../../hooks/useAiChat";
import { fetchAdminChatHistory } from "../../services/aiService";

function AiSidebar({ role = "customer", aiOpen, setAiOpen }) {
  const [historyLoaded, setHistoryLoaded] = useState(false);

  const { messages, setMessages, sendMessage, loading } = useAiChat(role, []);

  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (role !== "admin" || historyLoaded) return;

    async function loadHistory() {
      try {
        const pastMessages = await fetchAdminChatHistory();
        if (pastMessages?.length) {
          const formatted = pastMessages.map(m => ({
            text: m.message,
            isUser: m.sender === "admin",
          }));
          setMessages(formatted);
        }
        setHistoryLoaded(true);
      } catch (err) {
        console.error("Failed to load AI history", err);
      }
    }

    loadHistory();
  }, [role, historyLoaded, setMessages]);

  return (
    <aside
      className={`
        fixed lg:static z-40
        top-0 right-0 h-full w-80
        bg-white dark:bg-gray-900
        border-l border-gray-200 dark:border-gray-700
        transform transition-transform duration-300
        ${aiOpen ? "translate-x-0" : "translate-x-full"}
        lg:translate-x-0
        flex flex-col
      `}
    >
      <div className="p-2 flex justify-between items-center border-b dark:border-gray-700">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
            <Brain size={18} className="text-blue-600" />
          </div>
          <span className="font-semibold dark:text-white">AI Copilot</span>
        </div>

        <button
          onClick={() => setAiOpen(false)}
          className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 lg:hidden"
        >
          <X size={20} className="dark:text-white" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        <AiChatMessage
          text={
            role === "admin"
              ? "👋 Hello! Ask me to summarize complaints and suggest actions."
              : "👋 Hello! Let AI help you write and organize your complaint relating to our trading issues"
          }
        />
        {messages.map((m, i) => (
          <AiChatMessage key={i} {...m} />
        ))}

        {loading && <AiChatMessage text="AI is typing..." />}

        <div ref={endRef} />
      </div>

      <div className="border-t dark:border-gray-700">
        <AiInput onSend={sendMessage} />
      </div>
    </aside>
  );
}

export default AiSidebar;
