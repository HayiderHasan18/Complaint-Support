import { useState } from "react";
import Login from "./Login";
import SignUp from "./SignUp";

export default function AuthPage() {
  const [mode, setMode] = useState("login");

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br` from-blue-100 to-blue-300 px-4">
      {mode === "login" ? (
        <Login goToSignup={() => setMode("signup")} />
      ) : (
        <SignUp goToLogin={() => setMode("login")} />
      )}
    </div>
  );
}
