import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const HeaderTitle: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const navigate = useNavigate();

  const handleSearch = (): void => {
    navigate(`/find-jobs?title=${encodeURIComponent(title)}&location=${encodeURIComponent(location)}`);
  };

  return (
    <section className="bg-white pb-16 pt-8 px-4 sm:px-6 lg:px-8">
      {/* Centralized Container */}
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-4">
            Discover
            <br />
            more than
            <br />
            <span className="text-[#4640DE]">5000+ Jobs</span>
          </h1>

          <div className="w-60 sm:w-80 h-2 bg-[#4640DE] rounded-full mb-8"></div>

          <p className="text-gray-600 text-base sm:text-lg mb-10 max-w-xl">
            Find your next match in a global marketplace. We bring together
            top-tier employers and ambitious talent from every corner of the world.
          </p>

          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 flex items-center gap-3 bg-white border border-gray-300 rounded-md px-4 py-3 focus-within:border-[#4640DE] transition-colors">
              <svg className="w-5 h-5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Job title"
                className="flex-1 outline-none text-gray-700 placeholder-gray-400 bg-transparent min-w-0"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="flex-1 flex items-center gap-3 bg-white border border-gray-300 rounded-md px-4 py-3 focus-within:border-[#4640DE] transition-colors">
              <svg className="w-5 h-5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <input
                type="text"
                placeholder="City or country"
                className="flex-1 outline-none text-gray-700 placeholder-gray-400 bg-transparent min-w-0"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <button
              onClick={handleSearch}
              className="bg-[#4640DE] text-white font-semibold px-8 py-3 rounded-md hover:bg-opacity-90 transition-all whitespace-nowrap"
            >
              Search jobs
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeaderTitle;