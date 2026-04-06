import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

function MyApplications() {
  const [applications, setApplications] = useState([]);

  const fetchApplications = async () => {
    try {
      const res = await API.get("/applications/my", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setApplications(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const getStatusStyle = (status) => {
    switch (status.toLowerCase()) {
      case "accepted": return "text-emerald-400 bg-emerald-400/10 border-emerald-400/20";
      case "rejected": return "text-rose-400 bg-rose-400/10 border-rose-400/20";
      default: return "text-amber-400 bg-amber-400/10 border-amber-400/20";
    }
  };

  return (
    <div className="min-h-screen bg-[#3b4c72] text-gray-100"> {/* Deep Blackish-Blue Theme */}
      <Navbar />
      
      <div className="max-w-5xl mx-auto p-6">
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>
            <h2 className="text-4xl font-extrabold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              My Applications
            </h2>
            <p className="text-gray-400 mt-2">Track your job application journey</p>
          </div>
          <div className="bg-slate-800/50 border border-slate-700 px-5 py-2 rounded-2xl">
            <span className="text-slate-400 text-sm">Total Applications: </span>
            <span className="text-indigo-400 font-bold ml-1 text-lg">{applications.length}</span>
          </div>
        </header>

        {applications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-slate-800 rounded-3xl">
            <p className="text-gray-500 text-xl font-medium">No applications found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {applications.map((app) => (
              <div 
                key={app._id} 
                className="group relative bg-slate-900/50 border border-slate-800 p-6 rounded-2xl transition-all duration-300 ease-out hover:scale-[1.02] hover:bg-slate-800 hover:border-indigo-500/50 hover:shadow-[0_0_30px_-10px_rgba(99,102,241,0.3)]"
              >
                {/* Status Badge */}
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-indigo-500/10 rounded-xl group-hover:bg-indigo-500/20 transition-colors">
                    <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className={`px-3 py-1 rounded-lg text-xs font-bold border tracking-wider uppercase ${getStatusStyle(app.status)}`}>
                    {app.status}
                  </span>
                </div>

                {/* Job Info */}
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">
                    {app.job?.title}
                  </h3>
                  <p className="text-gray-400 font-medium mt-1 uppercase tracking-tight text-sm">
                    {app.job?.company}
                  </p>
                </div>

                {/* Footer Info */}
                <div className="mt-6 pt-5 border-t border-slate-800 flex justify-between items-center">
                  <div className="text-xs text-slate-500">
                    Applied on <span className="text-slate-300 ml-1">{new Date(app.createdAt).toLocaleDateString()}</span>
                  </div>
                  <button className="text-sm font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 group/btn">
                    Details 
                    <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyApplications;