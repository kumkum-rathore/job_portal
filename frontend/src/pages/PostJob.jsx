import { useState, useEffect } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function PostJob() {
  const navigate = useNavigate();
  const [jobData, setJobData] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    description: "",
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== "recruiter") {
      alert("Access Denied! Only recruiters can post jobs.");
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/jobs", jobData); 
      alert("Job Posted Successfully! 🚀");
      navigate("/recruiter"); 
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-gray-100">
      <Navbar />
      
      <div className="max-w-3xl mx-auto p-6 md:p-12">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent inline-block">
            Create a New Opportunity
          </h2>
          <p className="text-slate-400 mt-3">Fill in the details to find the perfect candidate for your team.</p>
        </div>

        {/* Glassmorphic Form Card */}
        <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800 p-8 md:p-10 rounded-[2.5rem] shadow-2xl shadow-indigo-500/10">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Job Title */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-400 ml-1">Job Title</label>
                <input 
                  type="text" 
                  placeholder="e.g. Senior MERN Developer" 
                  className="w-full bg-slate-800/50 border border-slate-700 p-4 rounded-2xl outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition-all placeholder:text-slate-600 text-white" 
                  required
                  onChange={(e) => setJobData({ ...jobData, title: e.target.value })} 
                />
              </div>

              {/* Company Name */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-400 ml-1">Company Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Tech Solutions Inc." 
                  className="w-full bg-slate-800/50 border border-slate-700 p-4 rounded-2xl outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition-all placeholder:text-slate-600 text-white" 
                  required
                  onChange={(e) => setJobData({ ...jobData, company: e.target.value })} 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Location */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-400 ml-1">Location</label>
                <div className="relative">
                    <span className="absolute left-4 top-4 text-slate-500">📍</span>
                    <input 
                    type="text" 
                    placeholder="Remote / City" 
                    className="w-full bg-slate-800/50 border border-slate-700 p-4 pl-10 rounded-2xl outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition-all placeholder:text-slate-600 text-white" 
                    onChange={(e) => setJobData({ ...jobData, location: e.target.value })} 
                    />
                </div>
              </div>

              {/* Salary */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-400 ml-1">Salary (LPA)</label>
                <div className="relative">
                    <span className="absolute left-4 top-4 text-slate-500">₹</span>
                    <input 
                    type="number" 
                    placeholder="e.g. 12" 
                    className="w-full bg-slate-800/50 border border-slate-700 p-4 pl-10 rounded-2xl outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition-all placeholder:text-slate-600 text-white" 
                    onChange={(e) => setJobData({ ...jobData, salary: e.target.value })} 
                    />
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-400 ml-1">Detailed Job Description</label>
              <textarea 
                placeholder="Tell us about the role, technical requirements, and responsibilities..." 
                className="w-full bg-slate-800/50 border border-slate-700 p-4 rounded-2xl h-44 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition-all placeholder:text-slate-600 text-white resize-none" 
                required
                onChange={(e) => setJobData({ ...jobData, description: e.target.value })}
              ></textarea>
            </div>

            {/* Action Button */}
            <div className="pt-4">
                <button 
                type="submit" 
                className="group relative w-full bg-indigo-600 hover:bg-indigo-500 text-white py-5 rounded-2xl font-bold text-lg transition-all duration-300 shadow-xl shadow-indigo-500/20 active:scale-95 overflow-hidden"
                >
                <span className="relative z-10 flex items-center justify-center gap-2">
                    🚀 Launch Job Posting
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                </button>
                <p className="text-center text-slate-500 text-xs mt-4 uppercase tracking-widest font-medium">
                    This will be visible to all eligible candidates immediately
                </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PostJob;