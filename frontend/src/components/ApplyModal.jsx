import { useState } from "react";
import API from "../services/api";

function ApplyModal({ jobId, onClose }) {
  const [formData, setFormData] = useState({
    full_name: "",
    experience: "",
    cover_letter: "",
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!file) {
      alert("Please select your resume before submitting.");
      setLoading(false);
      return;
    }

    const data = new FormData();
    data.append("full_name", formData.full_name);
    data.append("experience", formData.experience);
    data.append("cover_letter", formData.cover_letter);
    data.append("resume", file);

    try {
      await API.post(`/applications/${jobId}`, data);
      alert("Application Sent Successfully! 📄");
      onClose();
    } catch (error) {
      alert(error.response?.data?.message || "Upload Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Animated Backdrop */}
      <div 
        className="absolute inset-0 bg-[#020617]/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      ></div>

      {/* Glassmorphic Modal Card */}
      <div className="relative w-full max-w-lg bg-slate-900/90 border border-slate-800 p-8 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] animate-in fade-in zoom-in duration-300">
        
        {/* Header */}
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h2 className="text-3xl font-black bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              Finalize Application
            </h2>
            <p className="text-slate-400 text-sm mt-1">Showcase your potential to the recruiter.</p>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-500 hover:text-white transition-colors text-2xl"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Inputs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Full Name</label>
              <input 
                type="text" 
                placeholder="John Doe" 
                required 
                className="w-full bg-slate-800/50 border border-slate-700 p-3 rounded-xl outline-none focus:border-indigo-500 transition-all text-white placeholder:text-slate-600"
                onChange={(e) => setFormData({...formData, full_name: e.target.value})} 
              />
            </div>
            
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Experience</label>
              <input 
                type="text" 
                placeholder="e.g. 2 Years" 
                required 
                className="w-full bg-slate-800/50 border border-slate-700 p-3 rounded-xl outline-none focus:border-indigo-500 transition-all text-white placeholder:text-slate-600"
                onChange={(e) => setFormData({...formData, experience: e.target.value})} 
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Cover Letter</label>
            <textarea 
              placeholder="Why are you a good fit?" 
              className="w-full bg-slate-800/50 border border-slate-700 p-4 rounded-2xl h-28 outline-none focus:border-indigo-500 transition-all text-white placeholder:text-slate-600 resize-none"
              onChange={(e) => setFormData({...formData, cover_letter: e.target.value})} 
            />
          </div>

          {/* Futuristic File Upload Zone */}
          <div className={`relative border-2 border-dashed rounded-2xl p-6 transition-all group ${file ? 'border-emerald-500/50 bg-emerald-500/5' : 'border-slate-700 hover:border-indigo-500/50 bg-slate-800/30'}`}>
            <input 
              type="file" 
              accept=".pdf" 
              required 
              onChange={(e) => setFile(e.target.files[0])} 
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <div className="text-center">
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">
                {file ? "✅" : "📄"}
              </div>
              <p className={`text-sm font-medium ${file ? 'text-emerald-400' : 'text-slate-400'}`}>
                {file ? file.name : "Upload Resume (PDF only)"}
              </p>
              {!file && <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-widest font-bold">Max size 5MB</p>}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button 
              type="button" 
              onClick={onClose} 
              className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 py-4 rounded-2xl font-bold transition-all active:scale-95"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={loading} 
              className="flex-[2] relative overflow-hidden bg-white text-black py-4 rounded-2xl font-black transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50"
            >
              <span className="relative z-10">
                {loading ? "PROCESSING..." : "SUBMIT APPLICATION"}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-cyan-400 opacity-0 hover:opacity-10 transition-opacity"></div>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ApplyModal;