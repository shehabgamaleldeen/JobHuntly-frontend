import { Link } from "react-router-dom";
import React from "react";

interface CompanyHeaderProps {
  logo: string | React.ReactNode; // Updated to allow JSX
  companyName: string;
  buttonText?: string;
  buttonLink?: string;
}

export function CompanyHeader({
  logo,
  companyName,
  buttonText = "Post a job",
  buttonLink = "/company/jobs/step-1",
}: CompanyHeaderProps) {
  const handleClearStorage = () => localStorage.removeItem("job_create_data");

  return (
    <header className="w-full bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          
          {/* LEFT SIDE: Burger + Logo/Fallback + Name */}
          <div className="flex items-center gap-3">
            
            {/* 🍔 Burger (mobile only) */}
            <button
              className="md:hidden p-2 rounded-md border border-gray-200 bg-white"
              aria-label="Open menu"
            >
              <svg
                className="w-5 h-5 text-slate-700"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            {/* Logo Logic */}
            {logo && typeof logo === "string" && logo !== "" ? (
              <img
                src={logo}
                className="w-12 h-12 rounded-full object-cover shrink-0"
                alt="Company Logo"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shrink-0 shadow-sm">
                <span className="text-xl font-bold text-white uppercase">
                  {companyName ? companyName.charAt(0) : "C"}
                </span>
              </div>
            )}

            {/* Name */}
            <span className="text-base font-semibold text-slate-900 whitespace-nowrap ml-1">
              {companyName}
            </span>
          </div>

          {/* RIGHT SIDE: Button */}
          <Link
            to={buttonLink}
            onClick={handleClearStorage}
            className="
              inline-flex items-center justify-center
              px-4 py-2
              bg-[#4640DE] text-white
              rounded-md text-sm font-medium
              hover:opacity-90 transition
              whitespace-nowrap
            "
          >
            {buttonText}
          </Link>
        </div>
      </div>
    </header>
  );
}