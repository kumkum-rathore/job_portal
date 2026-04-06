import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; 
import API from "../services/api";
import Navbar from "../components/Navbar";
import ApplyModal from "../components/ApplyModal"; // Modal import karo

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [selectedJobId, setSelectedJobId] = useState(null); // Modal control ke liye

  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const urlKeyword = queryParams.get("keyword") || "";

  const fetchJobs = async (searchKeyword = "") => {
    try {
      const finalKeyword = searchKeyword || keyword || "";
      const res = await API.get(`/jobs?keyword=${finalKeyword}&location=${location}`);
      setJobs(res.data);
    } catch (error) {
      console.error("Error fetching jobs", error);
    }
  };

  useEffect(() => {
    if (urlKeyword) {
      setKeyword(urlKeyword);
      fetchJobs(urlKeyword);
    } else {
      setKeyword("");
      fetchJobs("");
    }
  }, [urlKeyword]);

  return (
    <div className="bg-[#31436c] min-h-screen text-gray-100">
      <Navbar />
      
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            Explore Opportunities
          </h1>
          <p className="text-gray-400 mt-2 text-lg">Find your dream job from the best companies.</p>
        </div>
        
        {/* Modern Glassmorphic Search Bar */}
        <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800 p-2 rounded-2xl mb-12 flex flex-col md:flex-row items-center gap-2 shadow-2xl">
          <div className="flex-1 w-full flex items-center px-4 gap-2">
             <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
             <input
                type="text"
                placeholder="Job title or keyword"
                className="w-full bg-transparent p-3 outline-none text-white placeholder-slate-500"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
          </div>
          
          <div className="hidden md:block w-[1px] h-10 bg-slate-800"></div>

          <div className="flex-1 w-full flex items-center px-4 gap-2">
             <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
             <input
                type="text"
                placeholder="Location"
                className="w-full bg-transparent p-3 outline-none text-white placeholder-slate-500"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
          </div>

          <div className="flex w-full md:w-auto gap-2 p-1">
            <button 
              onClick={() => { setKeyword(""); setLocation(""); fetchJobs(""); }}
              className="px-6 py-3 text-slate-400 hover:text-white transition-colors font-medium"
            >
              Reset
            </button>
            <button 
              onClick={() => fetchJobs()} 
              className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-indigo-500/20 active:scale-95"
            >
              Search
            </button>
          </div>
        </div>

        {/* Jobs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <div 
                key={job._id} 
                className="group relative bg-slate-900/60 border border-slate-800 p-8 rounded-[2rem] transition-all duration-300 hover:border-indigo-500/50 hover:bg-slate-800/80 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-indigo-500/10 p-3 rounded-2xl group-hover:bg-indigo-500/20 transition-colors">
                    <span className="text-2xl">💼</span>
                  </div>
                  <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    Full Time
                  </span>
                </div>

                <h2 className="text-2xl font-bold text-white group-hover:text-indigo-400 transition-colors mb-1">
                  {job.title}
                </h2>
                <p className="text-slate-400 font-medium mb-4 flex items-center gap-1">
                  {job.company}
                </p>

                <div className="flex flex-wrap gap-3 mb-6">
                  <div className="flex items-center gap-1 bg-slate-800 px-3 py-1.5 rounded-lg text-sm text-slate-300">
                    📍 {job.location || "Remote"}
                  </div>
                  <div className="flex items-center gap-1 bg-slate-800 px-3 py-1.5 rounded-lg text-sm text-indigo-300 font-semibold border border-indigo-500/20">
                    ₹ {job.salary} LPA
                  </div>
                </div>
                
                <button
                  onClick={() => setSelectedJobId(job._id)}
                  className="w-full bg-white text-black font-bold py-3.5 rounded-xl hover:bg-indigo-500 hover:text-white transition-all duration-300 transform active:scale-95"
                >
                  Apply Now
                </button>
              </div>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center py-20 bg-slate-900/30 rounded-3xl border border-dashed border-slate-800">
              <span className="text-5xl mb-4">🔍</span>
              <p className="text-slate-400 text-xl font-medium">No jobs matching your criteria.</p>
              <button onClick={() => {setKeyword(""); fetchJobs("");}} className="text-indigo-400 mt-2 hover:underline">View all jobs</button>
            </div>
          )}
        </div>
      </div>

      {selectedJobId && (
        <ApplyModal 
          jobId={selectedJobId} 
          onClose={() => setSelectedJobId(null)} 
        />
      )}
    </div>
  );
}

export default Jobs;