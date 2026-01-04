import React, { useState, useEffect } from "react";
import instance from '@/components/AxiosConfig/instance';
import Pagination from './Pagination'; 
import Loader from "@/components/Basic/Loader";

export interface Application {
  id: string;
  role: string;
  company: string;
  dateApplied: string;
  logo?: string;
}

interface Props {
  rowsPerPage?: number;
  searchText?: string;
}

const ApplicationTable: React.FC<Props> = ({ rowsPerPage = 5, searchText = "" }) => {
  const [data, setData] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await instance.get("/job-applications/me");
        let applications: Application[] = response.data.data;

        if (searchText) {
          applications = applications.filter(app =>
            app.company.toLowerCase().includes(searchText.toLowerCase())
          );
        }

        setData(applications);
        setPage(1);
        setTotalPages(Math.ceil(applications.length / rowsPerPage));

      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
        else setError("An error occurred while fetching applications");
        console.error("Error fetching applications:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [searchText, rowsPerPage]);

  const paginatedData = data.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  if (loading) return ( <Loader/> );
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (data.length === 0) return <p className="text-center mt-10">No applications found.</p>;

  return (
    <div className="bg-white rounded-lg w-full max-w-[1104px]">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px]">
          <thead className="bg-white border-b border-[#D6DDEB]">
            <tr className="text-[#7C8493] text-sm">
              <th className="py-3 px-4 text-left">#</th>
              <th className="py-3 px-4 text-left">Company</th>
              <th className="py-3 px-4 text-left">Role</th>
              <th className="py-3 px-4 text-left">Date Applied</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((app, index) => (
              <tr
                key={app.id}
                className={index % 2 === 0 ? "bg-white" : "bg-[#F4F4FD]"}
              >
                <td className="py-3 px-4">{(page - 1) * rowsPerPage + index + 1}</td>
                <td className="py-3 px-4 flex items-center gap-2">
                  {app.logo && <img src={app.logo} alt={app.company} className="w-6 h-6 rounded object-cover" />}
                  <span>{app.company}</span>
                </td>
                <td className="py-3 px-4">{app.role}</td>
                <td className="py-3 px-4">{new Date(app.dateApplied).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
};

export default ApplicationTable;

