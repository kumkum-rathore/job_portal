import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoadingProvider, useLoading } from "./context/LoadingContext";
import { setupInterceptors } from "./services/api";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Jobs from "./pages/Jobs.jsx";
import MyApplications from "./pages/MyApplications";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import PostJob from "./pages/PostJob"; // Naya page
import JobApplicants from "./pages/JobApplicants"; // Naya page
import About from "./pages/About"; // Naya page
// Components
import ProtectedRoute from "./components/ProtectedRoute";

function AppContent() {
  const { setLoading } = useLoading();

  useEffect(() => {
    // Axios ko loading control dene ke liye
    setupInterceptors(setLoading);
  }, [setLoading]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/home" element={<Home />} />
                <Route path="/about" element={<About />} />

        <Route path="/register" element={<Register />} />

        {/* Sabhi users ke liye */}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/jobs" element={<ProtectedRoute><Jobs /></ProtectedRoute>} />

        {/* Candidate ke liye */}
        <Route path="/my-applications" element={<ProtectedRoute><MyApplications /></ProtectedRoute>} />

        {/* Recruiter ke liye */}
        <Route path="/recruiter" element={<ProtectedRoute><RecruiterDashboard /></ProtectedRoute>} />
        <Route 
  path="/recruiter/job/:jobId/applicants" 
  element={<ProtectedRoute><JobApplicants /></ProtectedRoute>} 
/><Route path="/post-job" element={<ProtectedRoute><PostJob /></ProtectedRoute>} />

      </Routes>
    </BrowserRouter>
  );
}

function App() {
  return (
    <LoadingProvider>
      <AppContent />
    </LoadingProvider>
  );
}

export default App;