import React, { useState } from "react";
import { sampleApplicants } from "./SampleData"; 
import type{ Applicant} from "./SampleData"; 

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
interface Props {
  rowsPerPage?: number;
}

const ApplicantsTable: React.FC<Props> = ({ rowsPerPage = 7 }) => {
  const [data] = useState<Applicant[]>(sampleApplicants);
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

  const renderStars = (score: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FontAwesomeIcon
          key={i}
          icon={i <= score ? solidStar : regularStar}
          className="text-yellow-400"
        />
      );
    }
    return (
      <span className="flex items-center gap-1">
        {stars} <span className="text-sm text-gray-600">{score}</span>
      </span>
    );
  };

  return (
    <div className="flex min-h-screen bg-white">
      <div className="flex-1 w-full px-4 py-6 md:px-6 md:py-8 lg:px-8 lg:py-8">

        <div className="w-full max-w-[1104px] mx-auto">
          <div className="overflow-x-auto">
            <table className="w-full  min-w-[640px]">
              <thead className="bg-white border-b border-[#D6DDEB]">
                <tr className="text-[#7C8493] text-sm">
                  <th className="py-3 px-2 md:px-4 text-left whitespace-nowrap">#</th>
                  <th className="py-3 px-2 md:px-4 text-left whitespace-nowrap">Full Name</th>
                  <th className="py-3 px-2 md:px-4 text-left whitespace-nowrap">Score</th>
                  <th className="py-3 px-2 md:px-4 text-left whitespace-nowrap">Applied Date</th>
                  <th className="py-3 px-2 md:px-4 text-left whitespace-nowrap">Action</th>
                </tr>
              </thead>

              <tbody>
                {paginatedData.map((app, index) => (
                  <tr key={app.id} className={`text-sm ${index % 2 === 0 ? "bg-white" : "bg-[#F4F4FD]"}`}>
                    <td className="py-3 px-2 md:px-4">{app.id}</td>
                    <td className="py-3 px-2 md:px-4 whitespace-nowrap">{app.fullName}</td>
                    <td className="py-3 px-2 md:px-4 whitespace-nowrap">{renderStars(app.score)}</td>
                    <td className="py-3 px-2 md:px-4 whitespace-nowrap">{app.appliedDate}</td>
                    <td className="py-3 px-2 md:px-4 whitespace-nowrap">
                <button className="px-3 py-1 bg-[#E9EBFD] text-[#4640DE] border border-[#4640DE] text-sm hover:bg-purple-700 hover:text-white">
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
                    <span key={i} className="px-2 text-gray-500">...</span>
                  ) : (
                    <button
                      key={n}
                      onClick={() => setPage(n as number)}
                      className={`px-2 md:px-3 py-1 rounded min-w-7 ${page === n ? "bg-purple-300 text-white" : "border hover:bg-gray-50"}`}
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
      </div>
    </div>
  );
};

export default ApplicantsTable;

