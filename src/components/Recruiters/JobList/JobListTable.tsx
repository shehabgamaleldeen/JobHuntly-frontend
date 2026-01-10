import React, { useState, useEffect, useRef } from "react";
import type { Job } from "./JobListPage";
import { MoreHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { deleteJob, openCloseJob } from "@/services/jobService";
import { toast } from "sonner";

interface Props {
  data: Job[];
  onRefresh: () => void;
}

const JobTable: React.FC<Props> = ({ data, onRefresh }) => {
  const navigate = useNavigate();
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const menuRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openMenuId && menuRefs.current[openMenuId]) {
        const menuElement = menuRefs.current[openMenuId];
        const target = event.target as HTMLElement;
        
        // Check if click is outside the menu and the button
        if (menuElement && !menuElement.contains(target) && !target.closest('.action-button')) {
          setOpenMenuId(null);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openMenuId]);

  const handleUpdate = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/company/jobs/step-1/${id}`);
    setOpenMenuId(null);
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenMenuId(null);

    toast.promise(deleteJob(id), {
      loading: "Deleting job...",
      success: () => {
        onRefresh();
        return "Job Deleted Successfully";
      },
      error: (err) => {
        const errorMessage =
          err.response?.data?.error || "Failed to delete job";
        return `${errorMessage}`;
      },
    });
  };

  const handleToggleStatus = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenMenuId(null);

    toast.promise(openCloseJob(id), {
      loading: "Changing Job Status...",
      success: () => {
        onRefresh();
        return "Job Status Changed";
      },
      error: (err) => {
        const errorMessage =
          err.response?.data?.error || "Failed to change job status";
        return `${errorMessage}`;
      },
    });
  };

  const handleRowClick = (jobId: string) => {
    navigate(`/DashboardRecruiter/job-listing/${jobId}`);
  };

  const handleActionClick = (e: React.MouseEvent, jobId: string) => {
    e.stopPropagation();
    setOpenMenuId(openMenuId === jobId ? null : jobId);
  };

  return (
    <div className="bg-white rounded-lg w-full overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full table-auto min-w-[800px]">
          <thead className="bg-white border-b border-[#D6DDEB]">
            <tr className="text-[#7C8493] text-xs sm:text-sm uppercase tracking-wider">
              <th className="py-3 px-2 sm:px-4 text-left w-[40px] sm:w-[60px]">#</th>
              <th className="py-3 px-2 sm:px-4 text-left min-w-[150px]">Role</th>
              <th className="py-3 px-2 sm:px-4 text-left w-[80px] sm:w-[90px]">Status</th>
              <th className="py-3 px-2 sm:px-4 text-left hidden md:table-cell w-[100px]">
                Date Posted
              </th>
              <th className="py-3 px-2 sm:px-4 text-left hidden lg:table-cell w-[100px]">
                Due Date
              </th>
              <th className="py-3 px-2 sm:px-4 text-left w-[100px] sm:w-[120px]">Job Type</th>
              <th className="py-3 px-2 sm:px-4 text-left w-[100px] sm:w-[120px]">Workplace</th>
              <th className="py-3 px-2 sm:px-4 text-center w-[80px] sm:w-[90px]">Applicants</th>
              <th className="py-3 px-2 sm:px-4 text-right w-[60px] sm:w-[70px]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((job, index) => (
              <tr
                key={job._id}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-[#F4F4FD]"
                } hover:bg-gray-100 cursor-pointer transition-colors`}
                onClick={() => handleRowClick(job._id)}
              >
                <td className="py-3 px-2 sm:px-4 text-sm">{index + 1}</td>
                <td className="py-3 px-2 sm:px-4 font-medium text-sm">
                  <div className="max-w-[250px]">{job.title}</div>
                </td>

                <td className="py-3 px-2 sm:px-4">
                  <span
                    className={`inline-flex w-16 sm:w-20 justify-center py-1 rounded text-xs sm:text-sm font-medium ${
                      job.status === "live"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {job.status}
                  </span>
                </td>

                <td className="py-3 px-2 sm:px-4 hidden md:table-cell text-sm">
                  {new Date(job.createdAt).toLocaleDateString()}
                </td>

                <td className="py-3 px-2 sm:px-4 hidden lg:table-cell text-sm">
                  {job.dueDate
                    ? new Date(job.dueDate).toLocaleDateString()
                    : "-"}
                </td>

                <td className="py-3 px-2 sm:px-4 whitespace-nowrap text-sm">{job.jobType}</td>
                <td className="py-3 px-2 sm:px-4 whitespace-nowrap text-sm">
                  {job.workplaceModel ?? "-"}
                </td>

                <td className="py-3 px-2 sm:px-4 text-center text-sm">
                  {job.applicantsCount}
                </td>

                <td className="py-3 px-2 sm:px-4 text-right relative">
                  <button
                    data-job-id={job._id}
                    onClick={(e) => handleActionClick(e, job._id)}
                    className="action-button p-1 hover:bg-gray-200 rounded-full focus:outline-none inline-flex items-center justify-center"
                  >
                    <MoreHorizontal size={20} />
                  </button>

                  {openMenuId === job._id && (
                    <div
                      ref={(el) => { menuRefs.current[job._id] = el; }}
                      className="fixed bg-white border border-[#D6DDEB] rounded shadow-xl py-1 w-36 z-[9999]"
                      style={{
                        top: (() => {
                          const button = document.querySelector(`[data-job-id="${job._id}"]`);
                          if (button) {
                            const rect = button.getBoundingClientRect();
                            const menuHeight = 120;
                            const spaceBelow = window.innerHeight - rect.bottom;
                            if (spaceBelow < menuHeight && rect.top > menuHeight) {
                              return `${rect.top - menuHeight}px`;
                            }
                            return `${rect.bottom + 4}px`;
                          }
                          return 'auto';
                        })(),
                        left: (() => {
                          const button = document.querySelector(`[data-job-id="${job._id}"]`);
                          if (button) {
                            const rect = button.getBoundingClientRect();
                            return `${rect.right - 144}px`;
                          }
                          return 'auto';
                        })()
                      }}
                    >
                      <button
                        onClick={(e) => handleUpdate(job._id, e)}
                        className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                      >
                        Update
                      </button>
                      <button
                        onClick={(e) => handleToggleStatus(job._id, e)}
                        className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                      >
                        {job.status === "closed" ? "Open Job" : "Close Job"}
                      </button>
                      <button
                        onClick={(e) => handleDelete(job._id, e)}
                        className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {data.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No jobs found
        </div>
      )}
    </div>
  );
};

export default JobTable;