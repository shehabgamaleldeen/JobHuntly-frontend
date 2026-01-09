import React from "react";
import { Link } from "react-router-dom";

const JobHeader: React.FC = () => {
  return (
    <section className="w-full bg-white pb-8 pt-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-end sm:items-center gap-4">
          <div>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900">
              Latest <span className="text-[#4640DE]">jobs</span>
            </h2>
          </div>

          <div>
            <Link
              to="/find-jobs" // 2. Use 'to' instead of 'href'
              className="flex items-center gap-2 text-[#4640DE] font-semibold hover:text-[#4640DE] transition-colors group"
            >
              <span>Show all jobs</span>
              <svg
                className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JobHeader;