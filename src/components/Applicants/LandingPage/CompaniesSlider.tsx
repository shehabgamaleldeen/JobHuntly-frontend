import React, { useRef, useState, useEffect } from "react";
import instance from "../../AxiosConfig/instance"; // Adjust path as needed
import { Link } from "react-router-dom";

interface Company {
  _id: string;
  name: string;
  logoUrl: string;
}

const CompaniesSlider: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Fetch Companies from API
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await instance.get("/companies"); // Your endpoint
        setCompanies(res.data.data || res.data);
      } catch (err) {
        console.error("Error fetching companies:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCompanies();
  }, []);

  // Scroll Logic
  const scroll = (direction: "left" | "right"): void => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === "left"
        ? scrollLeft - clientWidth / 2
        : scrollLeft + clientWidth / 2;

      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  if (loading) return <div className="py-20 text-center text-gray-400">Loading companies...</div>;
  if (companies.length === 0) return null;

  return (
    <section className="bg-gray-50/50 py-16 px-4 sm:px-6 lg:px-8 border-y border-gray-100">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-end sm:items-center mb-10 gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
              Join <span className="text-[#4640DE]">world-class teams</span>
            </h2>
            <p className="text-gray-500 font-medium text-lg">
              Leading global companies hiring now
            </p>
          </div>

          <div>
            <Link
              to="/browse-companies"
              className="flex items-center gap-2 text-[#4640DE] font-semibold hover:opacity-80 transition-all group"
            >
              <span>Show all companies</span>
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

        {/* Slider Wrapper */}
        <div className="relative">

          {/* Navigation Buttons */}
          <button
            onClick={() => scroll("left")}
            className="absolute -left-5 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-200 shadow-md rounded-full p-2 text-gray-600 hover:text-[#4640DE] hover:border-[#4640DE] transition-all hidden md:flex items-center justify-center"
            aria-label="Scroll Left"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={() => scroll("right")}
            className="absolute -right-5 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-200 shadow-md rounded-full p-2 text-gray-600 hover:text-[#4640DE] hover:border-[#4640DE] transition-all hidden md:flex items-center justify-center"
            aria-label="Scroll Right"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* The Scrollable Area */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 snap-x no-scrollbar"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch"
            }}
          >
            {companies.map((company) => (
              <Link
                key={company._id}
                to={`/companies/${company._id}`} // Adjust path to match your routing
                className="group flex-shrink-0 w-56 h-40 bg-white border border-gray-200 hover:border-[#4640DE] rounded-xl flex flex-col items-center justify-center p-6 transition-all duration-300 snap-center shadow-sm hover:shadow-md cursor-pointer no-underline"
              >
                <div className="h-12 w-full flex items-center justify-center mb-4">
                  <img
                    src={company.logoUrl}
                    alt={company.name}
                    className="max-h-full max-w-full object-contain grayscale group-hover:grayscale-0 opacity-60 group-hover:opacity-100 transition-all duration-300"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.onerror = null;
                      target.src = `https://placehold.co/150x150/FFFFFF/4640DE?text=${encodeURIComponent(company.name)}`;
                    }}
                  />
                </div>
                <span className="text-gray-700 font-bold group-hover:text-[#4640DE] transition-colors text-center truncate w-full">
                  {company.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompaniesSlider;