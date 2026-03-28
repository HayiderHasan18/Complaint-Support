import { useState, useEffect } from "react"; 
import Header from "./Header";
import AiSidebar from "../ai/AiSidebar";
import Footer from "./Footer";

function CustomerLayout({ children }) {
  const [dark, setDark] = useState(false);
  const [aiOpen, setAiOpen] = useState(false); 

  
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <div className="h-screen flex flex-col">
      
    
      <Header dark={dark} setDark={setDark} setAiOpen={setAiOpen} />

      <div className="flex flex-1 overflow-hidden">

        
        <main className="flex-1 p-6 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          {children}
        </main>

       
        <AiSidebar role="customer" aiOpen={aiOpen} setAiOpen={setAiOpen} />

      </div>

      <Footer />
    </div>
  );
}

export default CustomerLayout;
