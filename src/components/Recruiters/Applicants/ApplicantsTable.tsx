import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; 
import { useNavigate } from "react-router-dom";
import instance from '@/components/AxiosConfig/instance'

interface Props {
  rowsPerPage?: number;
}

interface BackendApplicant {
  _id: string;
  fullName: string;
  score: number;
  appliedAt: string;    
  appliedDate?: string; 
}

const ApplicantsTable: React.FC<Props> = ({ rowsPerPage = 7 }) => {
  const { jobId } = useParams<{ jobId: string }>();
   const navigate = useNavigate();
  const [data, setData] = useState<BackendApplicant[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
  if (!jobId) return;

  const fetchApplicants = async () => {
    try {
      const response = await instance.get(
        `/company/jobs/${jobId}/applications`
      );

      const result = response.data;

      if (!Array.isArray(result.data)) {
        console.error("Backend returned invalid data:", result);
        return;
      }

      const formatted = result.data.map((app: BackendApplicant) => ({
        ...app,
        appliedDate: new Date(app.appliedAt).toLocaleDateString("en-GB"),
      }));

      setData(formatted);

    } catch (err) {
      if (err instanceof Error) {
        console.error("Error fetching applicants:", err.message);
      } else {
        console.error("Error fetching applicants");
      }
    }
  };

  fetchApplicants();
}, [jobId]);


  const totalPages = Math.ceil(data.length / rowsPerPage);
  const paginatedData = data.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible + 2) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (page > 3) pages.push("...");
      const start = Math.max(2, page - 1);
      const end = Math.min(totalPages - 1, page + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (page < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex min-h-screen bg-white">
      <div className="flex-1 w-full px-4 py-6 md:px-6 md:py-8 lg:px-8 lg:py-8">
        <div className="w-full max-w-[1104px] mx-auto">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px]">
              <thead className="bg-white border-b border-[#D6DDEB]">
                <tr className="text-[#7C8493] text-sm">
                  <th className="py-3 px-2 md:px-4 text-left whitespace-nowrap">#</th>
                  <th className="py-3 px-2 md:px-4 text-left whitespace-nowrap">Full Name</th>
                  <th className="py-3 px-2 md:px-4 text-left whitespace-nowrap">Applied Date</th>
                  <th className="py-3 px-2 md:px-4 text-left whitespace-nowrap">Action</th>
                </tr>
              </thead>

              <tbody>
                {paginatedData.map((app, index) => (
                  <tr
                    key={app._id}
                    className={`text-sm ${index % 2 === 0 ? "bg-white" : "bg-[#F4F4FD]"}`}
                  >
                    <td className="py-3 px-2 md:px-4">{index + 1}</td>
                    <td className="py-3 px-2 md:px-4 whitespace-nowrap">{app.fullName}</td>
                    <td className="py-3 px-2 md:px-4 whitespace-nowrap">{app.appliedDate}</td>
                    <td className="py-3 px-2 md:px-4 whitespace-nowrap">
                      <button
                        onClick={() =>
                          navigate(`applicant-profile/${app._id}`)
                        }
                        className="px-3 py-1 bg-[#E9EBFD] text-[#4640DE] border border-[#4640DE] text-sm hover:bg-purple-700 hover:text-white"
                      >
                        See Application
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="flex flex-wrap justify-center items-center gap-1 md:gap-2 py-4 px-2">
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="px-2 md:px-3 py-1 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ‹
              </button>

              <div className="flex flex-wrap gap-1 md:gap-2 justify-center">
                {pageNumbers.map((n, i) =>
                  n === "..." ? (
                    <span key={i} className="px-2 text-gray-500">
                      ...
                    </span>
                  ) : (
                    <button
                      key={n}
                      onClick={() => setPage(n as number)}
                      className={`px-2 md:px-3 py-1 rounded min-w-7 ${
                        page === n ? "bg-purple-300 text-white" : "border hover:bg-gray-50"
                      }`}
                    >
                      {n}
                    </button>
                  )
                )}
              </div>

              <button
                disabled={page===totalPages}
                onClick={() => setPage(page + 1)}
                className="px-2 md:px-3 py-1 border rounded hover:bg-[#F8F8FD] disabled:opacity-50"
              >
                ›
              </button>

              <span className="ml-1 text-xs text-gray-500">... {totalPages}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplicantsTable;
