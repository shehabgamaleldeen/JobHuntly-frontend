import React, { useRef, useState, useEffect } from "react";
import instance from "../../AxiosConfig/instance"; 
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

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await instance.get("/companies"); 
        setCompanies(res.data.data || res.data);
      } catch (err) {
        console.error("Error fetching companies:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCompanies();
  }, []);

  const scroll = (direction: "left" | "right"): void => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.7; 
      const scrollTo = direction === "left" 
        ? scrollLeft - scrollAmount 
        : scrollLeft + scrollAmount;
      
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  if (loading) return <div className="py-20 text-center text-gray-400">Loading companies...</div>;
  if (companies.length === 0) return null;

  return (
    <section className="bg-gray-50/50 py-16 px-4 sm:px-6 lg:px-8 border-y border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
              Join <span className="text-[#4640DE]">world-class teams</span>
            </h2>
            <p className="text-gray-500 font-medium text-lg">
              Leading global companies hiring now
            </p>
          </div>

          <Link
            to="/browse-companies"
            className="flex items-center gap-2 text-[#4640DE] font-semibold hover:opacity-80 transition-all group"
          >
            <span>Show all companies</span>
            <svg
              className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Slider Wrapper */}
        <div className="relative group/container">
          
          {/* Arrows (Fixed visibility logic) */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 min-[500px]:-left-2 xl:-left-6 top-1/2 -translate-y-1/2 z-20 bg-white border border-gray-200 shadow-md rounded-full p-2 text-gray-600 hover:text-[#4640DE] hover:border-[#4640DE] transition-all hidden min-[500px]:flex items-center justify-center"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={() => scroll("right")}
            className="absolute right-0 min-[500px]:-right-2 xl:-right-6 top-1/2 -translate-y-1/2 z-20 bg-white border border-gray-200 shadow-md rounded-full p-2 text-gray-600 hover:text-[#4640DE] hover:border-[#4640DE] transition-all hidden min-[500px]:flex items-center justify-center"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Scrollable Area */}
          <div
            ref={scrollRef}
            className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-hide pb-4 snap-x no-scrollbar"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch"
            }}
          >
            {companies.map((company) => (
              <Link
                key={company._id}
                to={`/companies/${company._id}`}
                className="group flex-shrink-0 w-40 h-32 sm:w-52 md:w-56 sm:h-40 bg-white border border-gray-200 hover:border-[#4640DE] rounded-xl flex flex-col items-center justify-center p-4 sm:p-6 transition-all duration-300 snap-center shadow-sm hover:shadow-md cursor-pointer no-underline"
              >
                <div className="h-10 sm:h-12 w-full flex items-center justify-center mb-3 sm:mb-4 pointer-events-none">
                  <img
                    src={company.logoUrl}
                    alt={company.name}
                    /* ONLY this image glows when the parent Link (group) is hovered */
                    className="max-h-full max-w-full object-contain filter grayscale group-hover:grayscale-0 opacity-60 group-hover:opacity-100 transition-all duration-500 ease-in-out"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.onerror = null;
                      target.src = `https://placehold.co/150x150/FFFFFF/4640DE?text=${encodeURIComponent(company.name.charAt(0))}`;
                    }}
                  />
                </div>
                <span className="text-gray-700 text-sm sm:text-base font-bold group-hover:text-[#4640DE] transition-colors text-center truncate w-full pointer-events-none">
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