import React from "react";
import { useNavigate } from "react-router-dom";

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Icon */}
        <div className="mx-auto w-24 h-24 rounded-full bg-indigo-50 flex items-center justify-center mb-6">
          <span className="text-4xl font-bold text-[#4640DE]">404</span>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-semibold text-slate-900 mb-2">
          Page not found
        </h1>

        {/* Description */}
        <p className="text-sm text-slate-500 mb-6">
          Sorry, the page you’re looking for doesn’t exist or has been moved.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">

          <button
            onClick={() => navigate(-1)}
            className="px-5 py-2 bg-[#4640DE] text-white rounded-md text-sm font-medium hover:opacity-95 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
