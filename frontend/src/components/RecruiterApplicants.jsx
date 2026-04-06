import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";

function RecruiterApplicants() {
  const { jobId } = useParams();
  const [applicants, setApplicants] = useState([]);

  const fetchApplicants = async () => {
    const res = await API.get(`/applications/job/${jobId}`);
    setApplicants(res.data);
  };

  useEffect(() => { fetchApplicants(); }, [jobId]);

  const handleStatus = async (id, status) => {
    try {
      await API.put(`/applications/status/${id}`, { status });
      alert(`Marked as ${status}`);
      fetchApplicants(); // List refresh karo
    } catch (error) {
      alert("Error updating status");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="p-8 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">Applicants List</h2>
        <div className="grid gap-4">
          {applicants.map((app) => (
            <div key={app._id} className="bg-white p-6 rounded-xl shadow-md flex flex-col md:flex-row md:justify-between md:items-center gap-4">
              <div className="flex-1">
                <h3 className="text-xl font-bold">{app.full_name}</h3>
                <p className="text-gray-600">📧 {app.email} | 💼 Exp: {app.experience}</p>
                <p className="mt-2 text-sm text-gray-500 italic">"{app.cover_letter}"</p>

                {/* 📄 Resume Link */}
                <button
                  type="button"
                  onClick={async () => {
                    try {
                      const res = await API.get(`/applications/resume/${app._id}`, { responseType: "blob" });
                      const file = new Blob([res.data], { type: "application/pdf" });
                      const fileURL = URL.createObjectURL(file);
                      window.open(fileURL, "_blank");
                    } catch (err) {
                      alert("Unable to open resume. Please try again.");
                    }
                  }}
                  className="text-blue-600 font-bold underline mt-2 inline-block"
                >
                  View Resume (PDF)
                </button>
              </div>

              <div className="flex flex-col gap-2 md:items-end">
                <span className={`text-center px-3 py-1 rounded-full text-xs font-bold uppercase ${
                  app.status === 'accepted' ? 'bg-green-100 text-green-700' :
                  app.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {app.status}
                </span>

                <div className="flex gap-2">
                  <button onClick={() => handleStatus(app._id, "accepted")} className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700">Accept</button>
                  <button onClick={() => handleStatus(app._id, "rejected")} className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700">Reject</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RecruiterApplicants;