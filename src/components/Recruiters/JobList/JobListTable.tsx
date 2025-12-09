import React, { useState } from "react";
import { sampleJobs } from "./sampleJobs"; 
import type { Job} from "./sampleJobs"; 
interface Props {
  rowsPerPage?: number;
}

const JobTable: React.FC<Props> = ({ rowsPerPage = 7 }) => {
  const [data] = useState<Job[]>(sampleJobs);
  const [page, setPage] = useState(1);

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

  const getStatus = (dueDate: string) => {
    return new Date(dueDate) < new Date() ? "Closed" : "Live";
  };

  return (
    <div className="bg-white rounded-lg w-full max-w-[1104px]">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px]">
          <thead className="bg-white border-b border-[#D6DDEB]">
            <tr className="text-[#7C8493] text-sm">
              <th className="py-3 px-2 md:px-4 text-left whitespace-nowrap">#</th>
              <th className="py-3 px-2 md:px-4 text-left whitespace-nowrap">Role</th>
              <th className="py-3 px-2 md:px-4 text-left whitespace-nowrap">Status</th>
              <th className="py-3 px-2 md:px-4 text-left whitespace-nowrap">Date Posted</th>
              <th className="py-3 px-2 md:px-4 text-left whitespace-nowrap">Due Date</th>
              <th className="py-3 px-2 md:px-4 text-left whitespace-nowrap">Job Type</th>
              <th className="py-3 px-2 md:px-4 text-left whitespace-nowrap">Applicants</th>
            </tr>
          </thead>

          <tbody>
            {paginatedData.map((job, index) => (
              <tr
                key={job.id}
                className={`text-sm ${index % 2 === 0 ? "bg-white" : "bg-[#F4F4FD]"}`}
              >
                <td className="py-3 px-2 md:px-4">{job.id}</td>
                <td className="py-3 px-2 md:px-4 whitespace-nowrap">{job.role}</td>
                <td className="py-3 px-2 md:px-4 whitespace-nowrap">{getStatus(job.dueDate)}</td>
                <td className="py-3 px-2 md:px-4 whitespace-nowrap">{job.datePosted}</td>
                <td className="py-3 px-2 md:px-4 whitespace-nowrap">{job.dueDate}</td>
                <td className="py-3 px-2 md:px-4 whitespace-nowrap">{job.jobType}</td>
                <td className="py-3 px-2 md:px-4 whitespace-nowrap">{job.applicants}</td>
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
                <span key={i} className="px-2 text-gray-500">...</span>
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
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-2 md:px-3 py-1 border rounded hover:bg-[#F8F8FD] disabled:opacity-50"
          >
            ›
          </button>

          <span className="ml-1 text-xs text-gray-500">... {totalPages}</span>
        </div>
      )}
    </div>
  );
};

export default JobTable;
