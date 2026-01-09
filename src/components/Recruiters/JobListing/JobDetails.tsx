import type { JSX } from "react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import JobDescriptionsRec from "../JobDescriptionsDashboard/jobDescriptionsRec";
import instance from "@/components/AxiosConfig/instance";
import { toast } from "sonner";

export default function JobDetailsTab(): JSX.Element {
  const { id } = useParams(); // Get job ID from URL params
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [closeReason, setCloseReason] = useState("");
  const [confirmText, setConfirmText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDeleteJob = async () => {
    if (confirmText !== "DELETE") {
      toast.error("Type DELETE to confirm.");
      return;
    }

    setLoading(true);
    try {
      const response = await instance.delete(`/job/${id}`);

      if (response.data.success) {
        toast.success("Job deleted successfully!");
        setIsModalOpen(false);
        // Navigate to jobs list or dashboard after successful deletion
        navigate("/jobs"); // Adjust route as needed
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Failed to delete job";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="max-w-5xl mx-auto">
        <JobDescriptionsRec />

        <div className="flex justify-end pt-6">
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-sm text-rose-500 hover:underline flex items-center gap-1"
          >
            Delete Job
            <svg
              className="w-4 h-4 text-rose-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v3m0 4h.01M12 4a8 8 0 100 16 8 8 0 000-16z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white max-w-lg w-full rounded-lg shadow-lg">
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    Delete Job
                  </h3>
                  <p className="text-sm text-slate-500 mt-1">
                    This action is <strong>irreversible</strong>. Before deleting
                    this job, please confirm.
                  </p>
                </div>

                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-slate-400 hover:text-slate-600"
                  disabled={loading}
                >
                  ✕
                </button>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-slate-700">
                  Reason (optional)
                </label>
                <textarea
                  value={closeReason}
                  onChange={(e) => setCloseReason(e.target.value)}
                  rows={4}
                  className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                  disabled={loading}
                />
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-slate-700">
                  Type
                  <span className="text-xs text-slate-400 ml-2">
                    Type <strong>DELETE</strong> to confirm
                  </span>
                </label>
                <input
                  value={confirmText}
                  onChange={(e) => setConfirmText(e.target.value)}
                  className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                  disabled={loading}
                />
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border rounded text-sm"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteJob}
                  className="px-4 py-2 bg-rose-500 text-white rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={loading}
                >
                  {loading ? "Deleting..." : "Delete Job"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}