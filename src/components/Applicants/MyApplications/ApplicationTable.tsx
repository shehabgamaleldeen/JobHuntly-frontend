import React, { useState, useEffect } from "react";
import axios from "axios";

interface Application {
  id: string;
  userId: string;
  company: string;
  role: string;
  dateApplied: string;
  logo?: string; 
}

interface Props {
  userId?: string;
  rowsPerPage?: number;
  searchText?: string;
}

const ApplicationTable: React.FC<Props> = ({ userId, rowsPerPage=5, searchText = "" }) => {
  const [data, setData] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:3001/applications");
        let applications: Application[] = response.data;

        if (userId) {
          applications = applications.filter(app => app.userId === userId);
        }

        if (searchText) {
          applications = applications.filter(app =>
            app.company.toLowerCase().includes(searchText.toLowerCase())
          );
        }

        setData(applications);
        setPage(1); 
        setError(null);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || err.message);
        } else {
          setError("An error occurred while fetching applications");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [userId, searchText]);

  if (loading)
    return (
      <div className="bg-white rounded-lg shadow border border-gray-200 p-8 text-center w-full">
        Loading applications...
      </div>
    );

  if (error)
    return (
      <div className="bg-white rounded-lg shadow border border-gray-200 p-8 text-center text-red-600 w-full">
        Error: {error}
      </div>
    );

  if (data.length === 0)
    return (
      <div className="bg-white rounded-lg shadow border border-gray-200 p-8 text-center w-full">
        No applications found.
      </div>
    );

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
  <div className="bg-white rounded-lg w-full max-w-[1104px]">
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px]">
        <thead className="bg-white border-b border-[#D6DDEB]">
          <tr className="text-[#7C8493] text-sm">
            <th className="py-3 px-2 md:px-4 text-left whitespace-nowrap">#</th>
            <th className="py-3 px-2 md:px-4 text-left whitespace-nowrap">Company Name</th>
            <th className="py-3 px-2 md:px-4 text-left whitespace-nowrap">Roles</th>
            <th className="py-3 px-2 md:px-4 text-left whitespace-nowrap">Date Applied</th>
          </tr>
        </thead>

        <tbody>
          {paginatedData.map((app, index) => (
            <tr
              key={app.id}
              className={`text-sm ${index % 2 === 0 ? "bg-white" : "bg-[#F4F4FD]"}`}
            >
              <td className="py-3 px-2 md:px-4">{app.id}</td>

              <td className="py-3 px-2 md:px-4 whitespace-nowrap flex items-center gap-2">
                <img
                  src={app.logo}
                  alt={app.company}
                  className="w-6 h-6 rounded object-cover"
                />
                <span>{app.company}</span>
              </td>

              <td className="py-3 px-2 md:px-4 whitespace-nowrap">{app.role}</td>
              <td className="py-3 px-2 md:px-4 whitespace-nowrap">{app.dateApplied}</td>
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

export default ApplicationTable;
