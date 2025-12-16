import type { JSX } from "react";
import { useState } from "react";
import ProfileImage from "../../../assets/images/alex-suprun-ZHvM3XIOHoE-unsplash 1.png";
import { Link } from "react-router-dom";
import { PageHeader } from "./headParts/headerPart";

export function DashboardUpdateProfile(): JSX.Element {
  const [activeTab, setActiveTab] = useState<"profile" | "login">("profile");

  const [newEmail, setNewEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [closeReason, setCloseReason] = useState("");
  const [confirmText, setConfirmText] = useState("");

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      
    <PageHeader
  title="Settings"
  buttonText="Back to homepage"
  buttonLink="/"
/>

      {/* Card */}
      <main className="max-w-6xl mx-auto bg-white rounded-lg shadow-sm ring-1 ring-slate-100">
        {/* Tabs */}
        <div className="border-b">
          <nav className="flex gap-6 px-6">
            <button
              onClick={() => setActiveTab("profile")}
              className={`py-4 text-sm font-medium ${
                activeTab === "profile"
                  ? "text-slate-900 border-b-4 border-[#4640DE]"
                  : "text-[#7C8493] hover:text-slate-700"
              }`}
            >
              My Profile
            </button>

            <button
              onClick={() => setActiveTab("login")}
              className={`py-4 text-sm font-medium ${
                activeTab === "login"
                  ? "text-slate-900 border-b-4 border-[#4640DE]"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Login Details
            </button>
          </nav>
        </div>

        {/* Content */}
        <section className="px-8 py-8">
          {/* Only show profile form when profile tab active */}
          {activeTab === "profile" && (
            <>
              {/* Basic heading */}
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-slate-900">
                  Basic Information
                </h2>
                <p className="mt-2 text-sm text-slate-500">
                  This is your personal information that you can update anytime.
                </p>
              </div>
              <div className="border-t border-b py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                  {/* Left column (labels) */}
                  <div className="text-sm text-slate-700">
                    <div className="font-medium mb-2">Profile Photo</div>
                    <p className="text-xs text-slate-400">
                      This image will be shown publicly as your profile picture,
                      it will help recruiters recognize you!
                    </p>
                  </div>

                  {/* Right columns (avatar + upload) */}
                  <div className="lg:col-span-2">
                    <div className="flex flex-col sm:flex-row items-center gap-6">
                      <img
                        src={ProfileImage}
                        alt="avatar"
                        className="w-24 h-24 rounded-full object-cover ring-2 ring-slate-100"
                      />

                      <label
                        htmlFor="avatar-upload"
                        className="flex-1 border-2 border-dashed border-[#4640DE] rounded-md p-6 text-center cursor-pointer"
                      >
                        <div className="flex flex-col items-center justify-center gap-2">
                          <svg
                            className="w-6 h-6 text-[#4640DE]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeWidth={1.5}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M7 16v-4m0 0l5-5 5 5M12 12v8"
                            />
                          </svg>
                          <div className="text-sm font-medium text-slate-700">
                            Click to replace or drag and drop
                          </div>
                          <div className="text-xs text-slate-400">
                            SVG, PNG, JPG or GIF (max. 400 x 400px)
                          </div>
                        </div>
                        <input
                          id="avatar-upload"
                          type="file"
                          className="hidden"
                          accept="image/*"
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Personal details form */}
              <div className="py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="text-sm text-slate-700">
                    <div className="font-medium mb-2">Personal Details</div>
                  </div>

                  <div className="lg:col-span-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                          defaultValue="Jake Gyll"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                          defaultValue="Jakegyll@gmail.com"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700">
                          Phone Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                          defaultValue="+44 1245 572 135"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700">
                          Gender <span className="text-red-500">*</span>
                        </label>
                        <select className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200">
                          <option>Male</option>
                          <option>Female</option>
                          <option>Other</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700">
                          Date of Birth <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="date"
                          className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                          defaultValue="1997-08-09"
                        />
                      </div>

                      <div />
                    </div>
                  </div>
                </div>
              </div>

              {/* Account Type */}
              <div className="pt-6 pb-8 border-t">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="text-sm text-slate-700">
                    <div className="font-medium mb-2">Account Type</div>
                    <p className="text-xs text-slate-400">
                      You can update your account type
                    </p>
                  </div>

                  <div className="lg:col-span-2">
                    <div className="flex flex-col sm:flex-col gap-6 items-start">
                      <label className="flex items-start gap-3">
                        <input
                          type="radio"
                          name="accountType"
                          defaultChecked
                          className="mt-1 text-[#4640DE]"
                        />
                        <div>
                          <div className="font-medium text-slate-900">
                            Job Seeker
                          </div>
                          <div className="text-xs text-slate-400">
                            Looking for a job
                          </div>
                        </div>
                      </label>

                      <label className="flex items-start gap-3">
                        <input
                          type="radio"
                          name="accountType"
                          className="mt-1"
                        />
                        <div>
                          <div className="font-medium text-slate-900">
                            Employer
                          </div>
                          <div className="text-xs text-slate-400">
                            Hiring, sourcing candidates, or posting a jobs
                          </div>
                        </div>
                      </label>

                      <div className="ml-auto">
                        <button className="px-4 py-2 bg-[#4640DE] text-white rounded shadow-sm">
                          Save Profile
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === "login" && (
            <>
              <div className="max-w-5xl mx-auto">
                {/* Basic heading */}
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-slate-900">
                    Basic Information
                  </h2>
                  <p className="mt-2 text-sm text-slate-500">
                    This is login information that you can update anytime.
                  </p>
                </div>

                {/* NEW divider line */}
                <div className="w-full border-b mb-8  "></div>

                {/* Update Email */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-8 border-b">
                  {/* Left label */}
                  <div className="text-sm text-slate-700">
                    <div className="font-medium mb-2">Update Email</div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Update your email address to
                      <br />
                      make sure it is safe
                    </p>
                  </div>

                  {/* Right section */}
                  <div className="lg:col-span-2">
                    {/* Email + verification ABOVE the update field */}
                    <div className="mb-6">
                      <div className="font-semibold">jakegyll@email.com</div>

                      <div className="text-xs text-slate-400 flex items-center gap-2 mt-1">
                        <svg
                          className="w-4 h-4 text-emerald-500"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M20 6L9 17l-5-5"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span>Your email address is verified.</span>
                      </div>
                    </div>

                    {/* Update email input and button */}
                    <div className="w-full max-w-md">
                      <input
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                        placeholder="Enter your new email"
                        className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                      />
                      <button
                        onClick={() => alert("Mock: update email")}
                        className="mt-3 w-full sm:w-auto px-4 py-2 bg-[#4640DE] text-white rounded text-sm shadow-sm hover:opacity-95"
                      >
                        Update Email
                      </button>
                    </div>
                  </div>
                </div>

                {/* New Password */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-8 pb-16 border-b">
                  {/* Left label */}
                  <div className="text-sm text-slate-700">
                    <div className="font-medium mb-2">New Password</div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Manage your password to make
                      <br />
                      sure it is safe
                    </p>
                  </div>

                  {/* Right section */}
                  <div className="lg:col-span-2">
                    {/* OLD + NEW password stacked vertically (perfect match to screenshot) */}
                    <div className="max-w-md">
                      {/* Old password */}
                      <label className="block text-sm font-medium text-slate-700">
                        Old Password
                      </label>
                      <input
                        type="password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        placeholder="Enter your old password"
                        className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                      />
                      <div className="text-xs text-slate-400 mt-1">
                        Minimum 8 characters
                      </div>

                      {/* New password */}
                      <label className="block text-sm font-medium text-slate-700 mt-5">
                        New Password
                      </label>
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter your new password"
                        className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                      />
                      <div className="text-xs text-slate-400 mt-1">
                        Minimum 8 characters
                      </div>

                      {/* Button aligned under both fields */}
                      <button
                        onClick={() => alert("Mock: change password")}
                        className="mt-5 px-4 py-2 bg-[#4640DE] text-white rounded text-sm shadow-sm"
                      >
                        Change Password
                      </button>
                    </div>
                  </div>
                </div>

                {/* Close Account - Bottom Right */}
                <div className="flex justify-end pt-6">
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="text-sm text-rose-500 hover:underline flex items-center gap-1"
                  >
                    Close Account
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
                            closing your account, please confirm.
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
                          Close Account
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
