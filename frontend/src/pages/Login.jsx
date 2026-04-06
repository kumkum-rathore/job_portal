import { useState, useEffect } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    if (token && user) {
      user.role === "recruiter" ? navigate("/recruiter") : navigate("/dashboard");
    }
  }, [navigate]);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Welcome Back! ⚡");
      
      if (res.data.user.role === "recruiter") {
        navigate("/recruiter");
      } else {
        navigate("/dashboard");
      } 
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Login failed. Please try again.";
      alert(errorMsg);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6 relative overflow-hidden">
      
      {/* Dynamic Background Effects */}
      <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[100px] animate-pulse delay-1000"></div>

      {/* 3D Perspective Container */}
      <div className="relative z-10 w-full max-w-md" style={{ perspective: "1000px" }}>
        <div className="bg-slate-900/40 backdrop-blur-3xl border border-white/10 p-10 rounded-[2.5rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] transform transition-all duration-500 hover:rotate-x-1 hover:rotate-y-1 hover:border-emerald-500/30 group">
          
          <header className="text-center mb-10">
            <div className="inline-block p-4 bg-emerald-500/10 rounded-2xl mb-4 group-hover:scale-110 transition-transform">
              <span className="text-3xl">🔑</span>
            </div>
            <h2 className="text-4xl font-black bg-gradient-to-br from-white to-slate-500 bg-clip-text text-transparent tracking-tight">
              Sign In
            </h2>
            <p className="text-slate-400 mt-2 font-medium">Continue your professional journey</p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div className="group/input">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] ml-1 transition-colors group-focus-within/input:text-emerald-400">
                Authorized Email
              </label>
              <input
                type="email"
                placeholder="name@nexus.com"
                className="w-full mt-1 bg-slate-800/40 border border-slate-700/50 p-4 rounded-2xl outline-none focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/5 transition-all text-white placeholder:text-slate-600"
                required
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            {/* Password Input */}
            <div className="group/input">
              <div className="flex justify-between items-center ml-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] transition-colors group-focus-within/input:text-emerald-400">
                  Secret Key
                </label>
                <span className="text-[10px] text-emerald-500 cursor-pointer hover:underline">Forgot?</span>
              </div>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full mt-1 bg-slate-800/40 border border-slate-700/50 p-4 rounded-2xl outline-none focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/5 transition-all text-white placeholder:text-slate-600 font-mono"
                required
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>

            {/* Login Button with Glow Effect */}
            <button 
              type="submit"
              className="relative w-full bg-white text-black font-black py-4 rounded-2xl transition-all duration-300 hover:scale-[1.02] active:scale-95 overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.1)]"
            >
              <span className="relative z-10 flex items-center justify-center gap-2 tracking-tighter">
                AUTHENTICATE <span className="text-xl">→</span>
              </span>
              {/* Shine Animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-400/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </button>
          </form>

          {/* Footer Link */}
          <footer className="mt-8 text-center border-t border-slate-800/50 pt-6">
            <p className="text-slate-500 text-sm font-medium">
              New to the platform?{" "}
              <Link 
                to="/register" 
                className="text-emerald-400 hover:text-emerald-300 transition-colors font-bold underline underline-offset-4"
              >
                Create Account
              </Link>
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default Login;