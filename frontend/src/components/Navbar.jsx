import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Jab page change ho to menu apne aap band ho jaye
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.clear();
    setIsMobileMenuOpen(false);
    navigate("/");
  };

  return (
    <nav className="bg-gray-900 text-white shadow-xl relative z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* 1. Logo */}
        <Link to="/" className="text-2xl font-extrabold text-blue-500 tracking-tighter">
          JOB<span className="text-white">X</span>
        </Link>

        {/* 2. Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 rounded-md hover:bg-gray-800 focus:outline-none"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* 3. Navigation Links */}
        <div className={`
          /* Mobile Styles */
          ${isMobileMenuOpen ? "flex" : "hidden"} 
          absolute top-full left-0 w-full bg-gray-900 border-t border-gray-800 flex-col p-6 space-y-4 shadow-2xl
          
          /* Desktop Styles */
          md:static md:flex md:flex-row md:w-auto md:bg-transparent md:p-0 md:space-y-0 md:space-x-6 md:border-none md:shadow-none
        `}>
          <Link to="/home" className="text-base font-medium hover:text-blue-400 transition block text-center md:text-left">Home</Link>
          <Link to="/about" className="text-base font-medium hover:text-blue-400 transition block text-center md:text-left">About</Link>
          
          {user ? (
            <>
              <Link to="/jobs" className="text-base font-medium hover:text-blue-400 transition block text-center md:text-left">All Jobs</Link>
              
              {user.role === "candidate" && (
                <Link to="/my-applications" className="text-base font-medium hover:text-blue-400 transition block text-center md:text-left">Applications</Link>
              )}

              {user.role === "recruiter" && (
                <>
                  <Link to="/recruiter" className="text-base font-medium hover:text-blue-400 transition block text-center md:text-left">Panel</Link>
                  <Link
                    to="/post-job"
                    className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-bold transition text-center block"
                  >
                    + Post Job
                  </Link>
                </>
              )}

              <button
                onClick={logout}
                className="bg-gray-700 hover:bg-red-600 px-4 py-2 rounded-lg text-sm transition text-center block w-full md:w-auto"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <Link to="/Login" className="text-base font-medium hover:text-blue-400">Login</Link>
              <Link to="/register" className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-bold w-full md:w-auto text-center">Sign Up</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;