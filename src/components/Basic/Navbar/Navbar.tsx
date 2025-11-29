import React from 'react';
import mainImage from "../../../assets/images/Logo.svg"

function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-2">
          <img
            src={mainImage}
            alt="JobHuntly logo"
            className="object-cover"
          />
            </div>

            <div className="hidden md:flex items-center gap-8">
              <a 
                href="#" 
                className="text-gray-700 hover:text-gray-900 font-medium text-sm"
              >
                Find Jobs
              </a>
              <a 
                href="#" 
                className="text-gray-700 hover:text-gray-900 font-medium text-sm"
              >
                Browse Companies
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="px-6 py-2 text-indigo-600 font-medium text-sm hover:text-indigo-700 transition-colors">
              Login
            </button>
            <button className="px-6 py-2 bg-indigo-600 text-white font-medium text-sm rounded-md hover:bg-indigo-700 transition-colors">
              Sign Up
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;
