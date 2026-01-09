import React from "react";
import { Link } from "react-router-dom";

const JobHeader: React.FC = () => {
  return (
    // Removed bottom padding (pb-0) so it visually connects to the Collection below
    <section className="w-full bg-white pt-16 pb-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
              Latest <span className="text-[#4640DE]">jobs</span>
            </h2>
          </div>

          <div>
            <Link
              to="/find-jobs"
              className="flex items-center gap-2 text-[#4640DE] font-semibold hover:opacity-80 transition-all group"
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