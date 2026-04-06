import React from "react";
import { Link } from "react-router-dom";

const Employers = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          
          {/* Left Side: Image Content */}
          <div className="w-full md:w-1/2">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80" 
                alt="Employers" 
                className="rounded-2xl shadow-xl w-full h-[400px] object-cover"
              />
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -right-6 bg-cyan-500 text-white p-6 rounded-xl shadow-lg hidden md:block">
                <p className="text-2xl font-bold">500+</p>
                <p className="text-sm">Verified Companies</p>
              </div>
            </div>
          </div>

          {/* Right Side: Text Content */}
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 leading-tight">
              Are You Looking For <span className="text-cyan-500">Quality Talent?</span>
            </h2>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Hire from a pool of thousands of skilled professionals. Whether you are a startup or a large enterprise, our platform helps you find the right fit for your team in minutes.
            </p>

            {/* Feature List */}
            <ul className="space-y-4 mb-10">
              <li className="flex items-center gap-3 text-gray-700">
                <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                Post unlimited job listings
              </li>
              <li className="flex items-center gap-3 text-gray-700">
                <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                Manage applications with ease
              </li>
              <li className="flex items-center gap-3 text-gray-700">
                <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                Directly connect with top candidates
              </li>
            </ul>

            {/* CTA Button */}
            <Link
              to="/Login"
              className="inline-flex items-center justify-center bg-gray-800 hover:bg-gray-900 text-white font-bold py-4 px-8 rounded-lg transition-all shadow-lg hover:shadow-cyan-500/20"
            >
              Post a Job for Free
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Employers;