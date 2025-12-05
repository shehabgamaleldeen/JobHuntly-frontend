import type { JSX } from "react";
import { useState } from "react";
import { PageHeader } from "../DashboardSettings/headParts/headerPart";
import JobDescriptionsRec from "../JobDescriptions/jobDescriptions";

export function JobListing(): JSX.Element {
  const [activeTab, setActiveTab] = useState<"Applicants" | "JobDetails">("Applicants");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [closeReason, setCloseReason] = useState("");
  const [confirmText, setConfirmText] = useState("");

  return (
    <div className="min-h-screen bg-gray-50 p-6">
          <PageHeader
        title="Social Media Assistant" 
        description = "full time"
        backTo = "/"

      />

      {/* Card */}
      <main className="max-w-6xl mx-auto bg-white rounded-lg shadow-sm ring-1 ring-slate-100">
        {/* Tabs */}
        <div className="border-b">
          <nav className="flex gap-6 px-6">
            <button
              onClick={() => setActiveTab("Applicants")}
              className={`py-4 text-sm font-medium ${
                activeTab === "Applicants"
                  ? "text-slate-900 border-b-4 border-[#4640DE]"
                  : "text-[#7C8493] hover:text-slate-700"
              }`}
            >
              Applicants
            </button>

            <button
              onClick={() => setActiveTab("JobDetails")}
              className={`py-4 text-sm font-medium ${
                activeTab === "JobDetails"
                  ? "text-slate-900 border-b-4 border-[#4640DE]"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Job Details
            </button>
          </nav>
        </div>

        {/* Content */}
        <section className="px-8 py-8">
          {/* Only show Applicants form when Applicants tab active */}
          {activeTab === "Applicants" && (
            <>
            </>
          )}

          {activeTab === "JobDetails" && (
            <>
              <div className="max-w-5xl mx-auto">
                <JobDescriptionsRec/>
                {/* Close Account - Bottom Right */}
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

              {/* Modal popup (unchanged from your version) */}
              {isModalOpen && (
                <div
                  className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
                  aria-modal="true"
                >
                  <div className="bg-white max-w-lg w-full rounded-lg shadow-lg">
                    <div className="p-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-slate-900">
                            Close your account
                          </h3>
                          <p className="text-sm text-slate-500 mt-1">
                            This action is <strong>irreversible</strong>. Before
                             Deleting this Job, please confirm.
                          </p>
                        </div>

                        <button
                          onClick={() => setIsModalOpen(false)}
                          className="text-slate-400 hover:text-slate-600"
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
                        />
                      </div>

                      <div className="mt-6 flex justify-end gap-3">
                        <button
                          onClick={() => setIsModalOpen(false)}
                          className="px-4 py-2 border rounded text-sm"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => {
                            if (confirmText.trim() !== "DELETE") {
                              alert("Type DELETE to confirm.");
                              return;
                            }
                            alert("Mock: account closed");
                            setIsModalOpen(false);
                          }}
                          className="px-4 py-2 bg-rose-500 text-white rounded text-sm"
                        >
                           Delete Job
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </section>
      </main>
    </div>
  );
}
