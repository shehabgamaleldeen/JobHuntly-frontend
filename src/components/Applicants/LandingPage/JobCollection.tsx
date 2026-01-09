import { useEffect, useState } from "react";
import instance from "../../AxiosConfig/instance"; 
import JobCard, { type JobProps } from "./JobCard.tsx";

function JobCollection() {
  const [jobs, setJobs] = useState<JobProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await instance.get("/api/latestJobs");
        const jobsData = res.data.data || res.data;
        setJobs(jobsData);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return (
      <section className="w-full bg-white pb-16 px-4 sm:px-6 lg:px-8">
        {/* Adjusted skeleton grid to match the main grid below */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-72 bg-gray-100 rounded-lg animate-pulse"></div>
          ))}
        </div>
      </section>
    );
  }

  if (jobs.length === 0) return null;

  return (
    <section className="w-full bg-white pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Responsive Grid Breakdown:
           - Mobile: 1 Column
           - Small Tablets (sm): 2 Columns
           - Laptops (lg): 3 Columns (This helps avoid squashed cards at 1024px)
           - Large Screens (xl): 4 Columns
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {jobs.map((job) => (
            <JobCard
              key={job._id}
              {...job}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default JobCollection;