import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";

function JobApplicants() {
  const { jobId } = useParams();
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApplicants = async () => {
    try {
      const res = await API.get(`/applications/job/${jobId}`);
      setApplicants(res.data);
    } catch (error) {
      console.error("Error fetching applicants", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplicants();
  }, [jobId]);

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/applications/status/${id}`, { status });
      alert(`Application ${status}!`);
      fetchApplicants(); // List refresh karo status dekhne ke liye
    } catch (error) {
      alert(error.response?.data?.message || "Status update failed");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto p-6">
        <h2 className="text-3xl font-bold mb-8 text-gray-800 border-b pb-4">
          Job Applicants
        </h2>

        {loading ? (
          <p className="text-center">Loading applicants...</p>
        ) : applicants.length > 0 ? (
          <>
            {/* Desktop Table View */}
            <div className="hidden md:block bg-white shadow-md rounded-xl overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-800 text-white">
                  <tr>
                    <th className="p-4">Full Name</th>
                    <th className="p-4">Experience</th>
                    <th className="p-4">Resume</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {applicants.map((app) => (
                    <tr key={app._id} className="border-b hover:bg-gray-50 transition">
                      <td className="p-4">
                        <p className="font-bold">{app.full_name}</p>
                        <p className="text-sm text-gray-500">{app.applicant?.email}</p>
                      </td>
                      <td className="p-4 text-gray-700">{app.experience}</td>
                      <td className="p-3">
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
                          className="bg-blue-100 text-blue-600 px-3 py-1 rounded-md font-bold hover:bg-blue-600 hover:text-white transition"
                        >
                          📄 Open Resume
                        </button>
                      </td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                          app.status === 'accepted' ? 'bg-green-100 text-green-700' :
                          app.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {app.status}
                        </span>
                      </td>
                      <td className="p-4 flex gap-2">
                        <button
                          onClick={() => updateStatus(app._id, "accepted")}
                          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-sm"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => updateStatus(app._id, "rejected")}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                        >
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4">
              {applicants.map((app) => (
                <div key={app._id} className="bg-white shadow-md rounded-xl p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="font-bold text-lg">{app.full_name}</p>
                      <p className="text-sm text-gray-500">{app.applicant?.email}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                      app.status === 'accepted' ? 'bg-green-100 text-green-700' :
                      app.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {app.status}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-3"><strong>Experience:</strong> {app.experience}</p>
                  <div className="flex flex-col gap-2">
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
                      className="bg-blue-100 text-blue-600 px-4 py-2 rounded-md font-bold hover:bg-blue-600 hover:text-white transition"
                    >
                      📄 Open Resume
                    </button>
                    <div className="flex gap-2">
                      <button
                        onClick={() => updateStatus(app._id, "accepted")}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 text-sm flex-1"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => updateStatus(app._id, "rejected")}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 text-sm flex-1"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p className="text-center text-gray-500 py-10">No applications received for this job yet.</p>
        )}
      </div>
    </div>
  );
}

export default JobApplicants;