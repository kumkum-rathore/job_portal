import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

function RecruiterDashboard() {
  const [jobs, setJobs] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const fetchJobs = async () => {
    try {
      const res = await API.get("/jobs");
      setJobs(res.data);
    } catch (err) {
      console.error("Error fetching jobs", err);
    }
  };

  const fetchApplicants = async (jobId) => {
    setLoading(true);
    setSelectedJobId(jobId);
    try {
      const res = await API.get(`/applications/job/${jobId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setApplications(res.data);
    } catch (err) {
      console.error("Error fetching applicants");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (appId, status) => {
    try {
      await API.put(
        `/applications/status/${appId}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchApplicants(selectedJobId);
    } catch (err) {
      alert("Failed to update status");
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="bg-[#0f172a] min-h-screen text-gray-100">
      <Navbar />
      <div className="max-w-7xl mx-auto p-6">
        
        {/* Header Section */}
        <header className="mb-8">
          <h2 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            Recruiter Command Center
          </h2>
          <p className="text-slate-400 mt-2 text-lg">Manage your listings and review top talent.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Side: Jobs List (4 Columns) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center justify-between mb-2 px-2">
                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500">Your Postings</h3>
                <span className="bg-slate-800 text-slate-300 text-[10px] px-2 py-0.5 rounded-full border border-slate-700">{jobs.length} Jobs</span>
            </div>
            
            <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
              {jobs.map((job) => (
                <div 
                  key={job._id} 
                  onClick={() => fetchApplicants(job._id)}
                  className={`group p-5 rounded-2xl cursor-pointer transition-all duration-300 border ${
                    selectedJobId === job._id 
                    ? "bg-indigo-600 border-indigo-400 shadow-[0_0_20px_-5px_rgba(99,102,241,0.5)]" 
                    : "bg-slate-900/50 border-slate-800 hover:border-slate-600 hover:bg-slate-800"
                  }`}
                >
                  <h4 className={`font-bold text-lg ${selectedJobId === job._id ? "text-white" : "text-slate-200"}`}>
                    {job.title}
                  </h4>
                  <div className="flex items-center justify-between mt-2">
                    <p className={`text-xs ${selectedJobId === job._id ? "text-indigo-100" : "text-slate-500"}`}>
                       {job.company} • {job.location}
                    </p>
                    <span className="text-[10px] bg-black/20 px-2 py-1 rounded-md">Details →</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Applicants Table (8 Columns) */}
          <div className="lg:col-span-8 bg-slate-900/40 backdrop-blur-xl rounded-[2rem] border border-slate-800 p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-white">
                {selectedJobId ? "Candidate Pipeline" : "Select a Job Listing"}
                </h3>
                {selectedJobId && (
                    <div className="text-xs text-slate-500 bg-slate-800/50 px-3 py-1.5 rounded-lg border border-slate-700">
                        Total Applicants: <span className="text-indigo-400 font-bold">{applications.length}</span>
                    </div>
                )}
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 space-y-4">
                <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-slate-400 font-medium">Fetching candidate data...</p>
              </div>
            ) : selectedJobId && applications.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-separate border-spacing-y-3">
                  <thead>
                    <tr className="text-slate-500 text-xs uppercase tracking-widest">
                      <th className="px-4 pb-4">Candidate Info</th>
                      <th className="px-4 pb-4 text-center">Resume</th>
                      <th className="px-4 pb-4">Current Status</th>
                      <th className="px-4 pb-4 text-right">Decision</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications.map((app) => (
                      <tr key={app._id} className="bg-slate-800/30 hover:bg-slate-800/60 transition-colors group">
                        <td className="p-4 rounded-l-2xl">
                          <div className="flex items-center gap-3">
                             <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-sm">
                                {app.full_name?.charAt(0)}
                             </div>
                             <div>
                                <p className="font-bold text-white group-hover:text-indigo-300 transition-colors">{app.full_name}</p>
                                <p className="text-xs text-slate-500 italic">{app.applicant?.email}</p>
                             </div>
                          </div>
                        </td>
                        <td className="p-4 text-center">
                          <button
                            type="button"
                            onClick={async () => {
                              try {
                                const res = await API.get(`/applications/resume/${app._id}`, { responseType: "blob" });
                                const file = new Blob([res.data], { type: "application/pdf" });
                                const fileURL = URL.createObjectURL(file);
                                window.open(fileURL, "_blank");
                              } catch (err) {
                                alert("Resume error");
                              }
                            }}
                            className="inline-flex items-center gap-1 text-xs font-bold text-cyan-400 hover:text-cyan-300 bg-cyan-400/10 px-3 py-1.5 rounded-lg border border-cyan-400/20 transition-all"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                            VIEW PDF
                          </button>
                        </td>
                        <td className="p-4">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter border ${
                            app.status === 'accepted' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                            app.status === 'rejected' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                          }`}>
                            {app.status}
                          </span>
                        </td>
                        <td className="p-4 rounded-r-2xl text-right">
                          <div className="flex justify-end gap-2">
                             <button
                               onClick={() => updateStatus(app._id, "accepted")}
                               className="p-2 bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-white rounded-xl border border-emerald-600/30 transition-all shadow-lg hover:shadow-emerald-600/20 active:scale-90"
                               title="Accept Application"
                             >
                               ✓
                             </button>
                             <button
                               onClick={() => updateStatus(app._id, "rejected")}
                               className="p-2 bg-rose-600/20 hover:bg-rose-600 text-rose-400 hover:text-white rounded-xl border border-rose-600/30 transition-all shadow-lg hover:shadow-rose-600/20 active:scale-90"
                               title="Reject Application"
                             >
                               ✕
                             </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-24 text-slate-500 border-2 border-dashed border-slate-800 rounded-[2rem]">
                <span className="text-5xl mb-4 opacity-20 text-indigo-400">👤</span>
                <p className="text-lg font-medium">No talent data available for this role.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecruiterDashboard;