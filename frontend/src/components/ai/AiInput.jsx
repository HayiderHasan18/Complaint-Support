import { Send } from "lucide-react";
import { useState } from "react";

function AiInput({ onSend }) {
  const [value, setValue] = useState("");

  const handleSend = () => {
    if (!value.trim()) return;
    onSend(value); 
    setValue(""); 
  };

  return (
    <div className="border-t-2 border-gray-200 p-3 flex gap-2">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        placeholder="Type your message..."
        className="flex-1 border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
      />
      <button
        onClick={handleSend}
        className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
      >
        <Send size={16} />
      </button>
    </div>
  );
}

export default AiInput;
