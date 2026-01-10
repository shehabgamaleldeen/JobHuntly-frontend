import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import JobListTable from "./JobListTable";
import instance from '@/components/AxiosConfig/instance'
import Loader from "@/components/Basic/Loader";

export interface Job {
  _id: string;
  title: string;
  jobType: string;
  workplaceModel: "On-Site" | "Remote" | "Hybrid";
  status: "live" | "closed";
  dueDate?: string;
  createdAt: string;
  applicantsCount: number;
}

export default function JobListPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    status: "",
    jobType: "",
    search: "",
    workplaceModel: "",
  });

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || 7);
  const [totalPages, setTotalPages] = useState(1);

  const fetchJobs = async (isSilent = false) => {
    try {
      if (!isSilent) setLoading(true);
      setError(null);

      const queryString = searchParams.toString();
      const res = await instance.get(`/companies/me/jobs?${queryString}`);

      setJobs(res.data.data.data);
      setTotalPages(res.data.data.totalPages || 1);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Failed to load job listings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [searchParams]); 

  const goToPage = (newPage: number) => {
    searchParams.set("page", newPage.toString());
    searchParams.set("limit", limit.toString());
    navigate(`?${searchParams.toString()}`); 
  };

  const applyFilters = () => {
    Object.entries(filters).forEach(([key, value]) => {
      if (value) searchParams.set(key, value);
      else searchParams.delete(key);
    });
    searchParams.set("page", "1");
    searchParams.set("limit", limit.toString());
    navigate(`?${searchParams.toString()}`);
  };

  if (loading) {
    return (<Loader/>)
  }

  if (error) {
    return <p className="text-center mt-10 text-red-500">{error}</p>;
  }

  return (
    <div className="flex min-h-screen bg-white">
      <div className="flex-1 w-full px-3 py-4 sm:px-4 sm:py-6 md:px-6 md:py-8 lg:px-8 lg:py-8">
        <div className="mb-4 sm:mb-6">
          <h2 className="font-bold text-[#25324B] text-xl sm:text-2xl">Job Listings</h2>
        </div>

        {/* Filters Section - Responsive Grid */}
        <div className="mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-3">
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className="border border-gray-300 px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#4640DE] w-full"
            >
              <option value="">All Status</option>
              <option value="live">Live</option>
              <option value="closed">Closed</option>
            </select>

            <select
              value={filters.jobType}
              onChange={(e) => setFilters({ ...filters, jobType: e.target.value })}
              className="border border-gray-300 px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#4640DE] w-full"
            >
              <option value="">All Job Types</option>
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
              <option value="Internship">Internship</option>
              <option value="Contract">Contract</option>
            </select>

            <select
              value={filters.workplaceModel}
              onChange={(e) => setFilters({ ...filters, workplaceModel: e.target.value })}
              className="border border-gray-300 px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#4640DE] w-full"
            >
              <option value="">All Workplaces</option>
              <option value="On-Site">On-Site</option>
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
            </select>

            <input
              type="text"
              placeholder="Search title..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="border border-gray-300 px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#4640DE] w-full"
            />

            <button
              onClick={applyFilters}
              className="bg-[#4640DE] hover:bg-[#3730C0] text-white px-4 py-2 rounded-md text-sm font-medium transition-colors w-full"
            >
              Apply Filters
            </button>
          </div>
        </div>

        {/* Table Container */}
        <div className="w-full max-w-[1200px] mx-auto">
          <JobListTable data={jobs} onRefresh={() => fetchJobs(true)} />

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex flex-wrap justify-center items-center gap-2 mt-6">
              <button
                disabled={page === 1}
                onClick={() => goToPage(page - 1)}
                className="px-3 py-1.5 sm:px-4 sm:py-2 border border-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
              >
                Previous
              </button>

              <div className="flex gap-1 sm:gap-2 flex-wrap justify-center">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => goToPage(p)}
                    className={`px-2.5 py-1.5 sm:px-3 sm:py-2 border rounded-md text-sm transition-colors ${
                      p === page 
                        ? "bg-[#4640DE] text-white border-[#4640DE]" 
                        : "border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>

              <button
                disabled={page === totalPages}
                onClick={() => goToPage(page + 1)}
                className="px-3 py-1.5 sm:px-4 sm:py-2 border border-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}