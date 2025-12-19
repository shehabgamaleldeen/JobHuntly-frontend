import React, { useState } from "react";
import type { Job } from "./JobListPage";

interface Props {
  data: Job[];
  rowsPerPage?: number;
}

const JobTable: React.FC<Props> = ({ data, rowsPerPage = 7 }) => {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(data.length / rowsPerPage);
  const paginatedData = data.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

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
    <div className="bg-white rounded-lg w-full max-w-[1104px]">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px]">
          <thead className="bg-white border-b border-[#D6DDEB]">
            <tr className="text-[#7C8493] text-sm">
              <th className="py-3 px-4 text-left">#</th>
              <th className="py-3 px-4 text-left">Role</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Date Posted</th>
              <th className="py-3 px-4 text-left">Due Date</th>
              <th className="py-3 px-4 text-left">Job Type</th>
              <th className="py-3 px-4 text-left">Applicants</th>
            </tr>
          </thead>

          <tbody>
            {paginatedData.map((job, index) => (
              <tr
                key={job._id}
                className={index % 2 === 0 ? "bg-white" : "bg-[#F4F4FD]"}
              >
                <td className="py-3 px-4">{index + 1}</td>
                <td className="py-3 px-4">{job.title}</td>
                <td className="py-3 px-4">{job.status}</td>
                <td className="py-3 px-4">
                  {new Date(job.createdAt).toLocaleDateString()}
                </td>
                <td className="py-3 px-4">
                  {job.dueDate
                    ? new Date(job.dueDate).toLocaleDateString()
                    : "-"}
                </td>
                <td className="py-3 px-4">{job.jobType}</td>
                <td className="py-3 px-4">{job.applicantsCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 py-4">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            ‹
          </button>

          {pageNumbers.map((n, i) =>
            n === "..." ? (
              <span key={i}>...</span>
            ) : (
              <button
                key={n}
                onClick={() => setPage(n as number)}
                className={page === n ? "font-bold" : ""}
              >
                {n}
              </button>
            )
          )}

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
};

export default JobTable;
