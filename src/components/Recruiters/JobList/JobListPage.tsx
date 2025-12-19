import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import JobListTable from "./JobListTable";

export interface Job {
  _id: string;
  title: string;
  jobType: string;
  status: "live" | "closed";
  dueDate?: string;
  createdAt: string;
  applicantsCount: number;
}

export default function JobListPage() {
  const { companyId } = useParams<{ companyId: string }>();

  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await axios.get(
          `http://localhost:3000/companies/${companyId}/jobs`
        );

        setJobs(res.data.data);
      } catch (err) {
        setError("Failed to load job listings");
      } finally {
        setLoading(false);
      }
    };

    if (companyId) fetchJobs();
  }, [companyId]);

  if (loading) {
    return <p className="text-center mt-10">Loading jobs...</p>;
  }

  if (error) {
    return <p className="text-center mt-10 text-red-500">{error}</p>;
  }

  return (
    <div className="flex min-h-screen bg-white">
      <div className="w-[272px] min-h-full bg-gray-50">Side bar</div>

      <div className="flex-1 w-full px-4 py-6 md:px-6 md:py-8 lg:px-8 lg:py-8">
        <div className="mb-6">
          <h2 className="font-bold text-[#25324B] text-2xl">Job Listings</h2>
        </div>

        <div className="w-full max-w-[1104px] mx-auto">
          <JobListTable data={jobs} />
        </div>
      </div>
    </div>
  );
}



