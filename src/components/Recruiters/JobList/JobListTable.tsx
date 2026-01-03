import React, { useState } from "react";
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

  const handleUpdate = (id: string) => {
    navigate(`/company/jobs/step-1/${id}`);
    setOpenMenuId(null);
  };

  const handleDelete = async (id: string) => {
    // Immediately close the menu so it doesn't hang open
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

  const handleToggleStatus = async (id: string) => {
    // Immediately close the menu so it doesn't hang open
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

  return (
    <div className="bg-white rounded-lg w-full max-w-[1104px]">
      <div>
        <table className="w-full min-w-[800px] table-auto">
          <thead className="bg-white border-b border-[#D6DDEB]">
            <tr className="text-[#7C8493] text-sm uppercase tracking-wider">
              <th className="py-3 px-4 text-left">#</th>
              <th className="py-3 px-4 text-left">Role</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Date Posted</th>
              <th className="py-3 px-4 text-left">Due Date</th>
              <th className="py-3 px-4 text-left">Job Type</th>
              <th className="py-3 px-4 text-left">Applicants</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((job, index) => (
              <tr
                key={job._id}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-[#F4F4FD]"
                } hover:bg-gray-100 cursor-pointer`}
                onClick={(e) => {
                  // Prevent navigating when clicking on Actions button or dropdown
                  if ((e.target as HTMLElement).closest("button")) return;
                  navigate(`/DashboardRecruiter/job-listing/${job._id}`);
                }}
              >
                <td className="py-3 px-4">{index + 1}</td>
                <td className="py-3 px-4">{job.title}</td>
                <td className="py-3 px-4">
                  <span
                    className={`inline-flex items-center justify-center w-20 py-1 rounded text-sm font-medium ${
                      job.status === "closed"
                        ? "bg-red-100 text-red-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {job.status ?? "live"}
                  </span>
                </td>
                <td className="py-3 px-4">
                  {new Date(job.createdAt).toLocaleDateString()}
                </td>
                <td className="py-3 px-4">
                  {job.dueDate
                    ? new Date(job.dueDate).toLocaleDateString()
                    : "-"}
                </td>
                <td className="py-3 px-4">{job.jobType}</td>
                <td className="py-3 px-12">{job.applicantsCount}</td>

                {/* --- START ACTIONS CELL --- */}
                <td className="py-3 px-4 text-right">
                  <div className="relative inline-block text-left">
                    <button
                      onClick={() =>
                        setOpenMenuId(openMenuId === job._id ? null : job._id)
                      }
                      className="p-1 hover:bg-gray-200 rounded-full focus:outline-none"
                    >
                      <MoreHorizontal size={20} />
                    </button>

                    {openMenuId === job._id && (
                      <>
                        <div
                          className="fixed inset-0 z-30"
                          onClick={() => setOpenMenuId(null)}
                        />
                        <div
                          className={`absolute right-0 z-40 w-36 bg-white border border-[#D6DDEB] rounded shadow-xl py-1 ${
                            index >= 3 ? "bottom-full mb-2" : "top-full mt-1"
                          }`}
                        >
                          <button
                            onClick={() => handleUpdate(job._id)}
                            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                          >
                            Update
                          </button>
                          <button
                            onClick={() => handleToggleStatus(job._id)}
                            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                          >
                            {job.status === "closed" ? "Open Job" : "Close Job"}
                          </button>
                          <button
                            onClick={() => handleDelete(job._id)}
                            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-600"
                          >
                            Delete
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JobTable;