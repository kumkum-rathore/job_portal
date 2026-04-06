import { useState } from "react";
import API from "../services/api";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "applicant", // Role select karne ka option bhi add kiya hai
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", form);
      alert("Welcome to the Future! 🚀");
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6 relative overflow-hidden">
      
      {/* Background 3D Orbs (Visual depth ke liye) */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-cyan-600/20 rounded-full blur-[120px] animate-pulse delay-700"></div>

      {/* Main Container with 3D Perspective */}
      <div className="relative z-10 w-full max-w-lg perspective-1000">
        <div className="bg-slate-900/40 backdrop-blur-2xl border border-white/10 p-10 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform transition-all duration-500 hover:rotate-x-2 hover:rotate-y-2 hover:shadow-indigo-500/10">
          
          <div className="text-center mb-10">
            <h2 className="text-5xl font-black bg-gradient-to-br from-white via-slate-300 to-slate-500 bg-clip-text text-transparent tracking-tighter">
              Join the Hub
            </h2>
            <p className="text-slate-400 mt-2 font-medium tracking-wide">
              Create your futuristic workspace account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Name Input */}
            <div className="group">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 transition-colors group-focus-within:text-indigo-400">Full Name</label>
              <div className="relative mt-1">
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full bg-slate-800/40 border border-slate-700/50 p-4 rounded-2xl outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all text-white placeholder:text-slate-600"
                  required
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="group">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 transition-colors group-focus-within:text-indigo-400">Digital Identity (Email)</label>
              <input
                type="email"
                placeholder="name@nexus.com"
                className="w-full mt-1 bg-slate-800/40 border border-slate-700/50 p-4 rounded-2xl outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all text-white placeholder:text-slate-600"
                required
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            {/* Role Selector (3D Toggle look) */}
            <div className="grid grid-cols-2 gap-4">
               <button 
                type="button"
                onClick={() => setForm({...form, role: 'applicant'})}
                className={`py-3 rounded-xl border font-bold transition-all ${form.role === 'applicant' ? 'bg-indigo-600 border-indigo-400 shadow-lg shadow-indigo-600/20 scale-105' : 'bg-slate-800/50 border-slate-700 text-slate-400'}`}
               >
                Applicant
               </button>
               <button 
                type="button"
                onClick={() => setForm({...form, role: 'recruiter'})}
                className={`py-3 rounded-xl border font-bold transition-all ${form.role === 'recruiter' ? 'bg-indigo-600 border-indigo-400 shadow-lg shadow-indigo-600/20 scale-105' : 'bg-slate-800/50 border-slate-700 text-slate-400'}`}
               >
                Recruiter
               </button>
            </div>

            {/* Password Input */}
            <div className="group">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 transition-colors group-focus-within:text-indigo-400">Secure Access</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full mt-1 bg-slate-800/40 border border-slate-700/50 p-4 rounded-2xl outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all text-white placeholder:text-slate-600 font-mono"
                required
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>

            {/* Futuristic Submit Button */}
            <button className="relative w-full group overflow-hidden bg-white text-black font-black py-5 rounded-2xl transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
              <span className="relative z-10 flex items-center justify-center gap-2 text-lg">
                INITIALIZE ACCOUNT <span className="text-xl">→</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-cyan-400 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 group-hover:bg-white group-hover:animate-pulse transition-all"></div>
            </button>
          </form>

          {/* Footer Link */}
          <p className="mt-8 text-center text-slate-500 text-sm font-medium">
            Already a member?{" "}
            <Link to="/login" className="text-indigo-400 hover:text-indigo-300 transition-colors font-bold underline underline-offset-4">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;