import React from "react";

const BrowseJobsBanner = () => {
  return (
    <section className="relative py-20 bg-[#f0f9ff] overflow-hidden">
      {/* Background Decorative Elements (Light Blue Blobs) */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-cyan-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <div className="flex flex-col items-start text-left">
          {/* Main Counter/Heading */}
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
            7,000+ Browse Jobs
          </h2>

          {/* Description */}
          <p className="text-gray-600 text-lg md:text-xl leading-relaxed max-w-3xl mb-10">
            Search all the open positions on the web. Get your own personalized salary estimate. 
            Read reviews on over 600,000 companies worldwide. The right job is out there.
          </p>

          {/* Search Button */}
          <button className="bg-[#00bcd4] hover:bg-[#00acc1] text-white font-bold py-4 px-10 rounded-md transition-all transform hover:scale-105 shadow-lg flex items-center gap-2 uppercase tracking-wider">
            Search Jobs
          </button>
        </div>
      </div>
    </section>
  );
};

export default BrowseJobsBanner;