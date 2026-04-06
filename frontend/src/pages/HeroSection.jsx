import React from "react";
import { Link, useNavigate } from "react-router-dom";

const HeroSection = ({ user }) => {
  const navigate = useNavigate();
  if (user) {
    // Logged in user
    return (
      <section className="relative h-[500px] flex items-center justify-center text-center text-white">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80')` 
          }}
        >
          {/* Dark Overlay taaki text clear dikhe */}
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        {/* Content Area */}
        <div className="relative z-10 max-w-4xl px-4">
          <h2 className="text-3xl font-bold">Dashboard</h2>
          <p className="text-gray-100 mt-2">
            Welcome back, <span className="font-semibold text-blue-600">{user?.name}</span>! 🚀
          </p>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            Find the job that fits your life
          </h1>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
            Discover thousands of job opportunities from top companies. Your next career move starts here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <button
              onClick={() => navigate("/jobs")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition"
            >
              View All Jobs
            </button>
            {user?.role === "candidate" && (
              <button
                onClick={() => navigate("/my-applications")}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition"
              >
                My Applications
              </button>
            )}
          </div>
        </div>
      </section>
    );
  } else {
    // Not logged in
    return (
      <section className="relative h-[500px] flex items-center justify-center text-center text-white">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80')` 
          }}
        >
          {/* Dark Overlay taaki text clear dikhe */}
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        {/* Content Area */}
        <div className="relative z-10 max-w-4xl px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            Find the job that fits your life
          </h1>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto mb-8">
            Discover thousands of job opportunities from top companies. Your next career move starts here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/Login" 
              className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg text-lg font-semibold transition shadow-md"
            >
              Login
            </Link>
            <Link 
              to="/register" 
              className="bg-green-600 hover:bg-green-700 px-8 py-3 rounded-lg text-lg font-semibold transition shadow-md"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </section>
    );
  }
};

export default HeroSection;