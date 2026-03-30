import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/authApi";
import { Eye, EyeOff } from "lucide-react";

function Login({ goToSignup }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState("");

  const onChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login(form);
      sessionStorage.setItem("token", data.token);
      navigate("/admin");
    } catch (err) {
      setMsg(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-8">
      <h2 className="text-2xl font-bold text-center mb-6">Login to your account</h2>
      <p className="text-center text-sm text-gray-500 mb-6">
       Default Login → Email: admin@gmail.com | Password: admin123
   </p>

      {msg && (
        <p className="text-center text-sm mb-4 text-red-500">{msg}</p>
      )}

      <form onSubmit={onSubmit} className="space-y-5">
        <div>
          <label className="text-sm text-gray-500">Email</label>
          <input
            name="email"
            value={form.email}
            onChange={onChange}
            placeholder="Enter your email"
            className="w-full mt-1 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div>
          <label className="text-sm text-gray-500">Password</label>
          <div className="relative mt-1">
            <input
              type={show ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={onChange}
              placeholder="Enter your password"
              className="w-full border rounded-lg px-4 py-2 pr-10 focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <button
              type="button"
              onClick={() => setShow(!show)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {show ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <button className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition">
          Login now
        </button>
      </form>

      <p className="text-center text-sm text-gray-400 mt-6">
        Don’t have an account?{" "}
        <span
          onClick={goToSignup}
          className="text-blue-600 hover:underline cursor-pointer"
        >
          Sign up
        </span>
      </p>
    </div>
  );
}
export default Login;
