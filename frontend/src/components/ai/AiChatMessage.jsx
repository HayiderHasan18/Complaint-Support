import { Bot } from "lucide-react";

function AiChatMessage({ text, isUser }) {
  const bubble = isUser
    ? "bg-blue-500 text-white rounded-2xl rounded-br-sm"
    : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-2xl rounded-bl-sm";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} gap-2`}>
      {!isUser && (
        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
          <Bot size={20} className="text-blue-600" />
        </div>
      )}

      <div className={`px-4 py-2 text-sm max-w-xs shadow-sm ${bubble}`}>
        {text}
      </div>
    </div>
  );
}

export default AiChatMessage;
