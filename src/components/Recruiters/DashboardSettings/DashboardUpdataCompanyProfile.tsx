import type { JSX } from "react";
import { useState } from "react";
import { PageHeader } from "./headParts/headerPart";

/* Replace these with your real asset imports */
import CompanyLogoPlaceholder from "../../../assets/images/twiteer.jpg";
import ProfileImage from "../../../assets/images/pitch.png";

export function DashboardUpdateCompanyProfile(): JSX.Element {
  const [activeTab, setActiveTab] = useState<"OverView" | "SocialLinks">("OverView");

  /* Example controlled inputs (optional) */
  const [companyName, setCompanyName] = useState("Nomad");
  const [website, setWebsite] = useState("https://www.nomad.com");
  const [location, setLocation] = useState("England, Japan, Australia");
  const [employees, setEmployees] = useState("1 - 50");
  const [industry, setIndustry] = useState("Technology");
  const [dateDay, setDateDay] = useState("31");
  const [dateMonth, setDateMonth] = useState("July");
  const [dateYear, setDateYear] = useState("2021");
  const [techStack, setTechStack] = useState(["HTML 5", "CSS 3", "Javascript"]);
  const [description, setDescription] = useState(
    "Nomad is part of the Information Technology Industry. We believe travellers want to experience real life and meet local people..."
  );

  const [instagram, setInstagram] = useState("https://www.instagram.com/nomad/");
  const [twitter, setTwitter] = useState("https://twitter.com/nomad/");
  const [facebook, setFacebook] = useState("https://web.facebook.com/nomad/");
  const [linkedin, setLinkedin] = useState("");
  const [youtube, setYoutube] = useState("");

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <PageHeader title="Settings" />

      {/* Card */}
      <main className="max-w-6xl mx-auto bg-white rounded-lg shadow-sm ring-1 ring-slate-100 mt-6">
        {/* Tabs */}
        <div className="border-b">
          <nav className="flex gap-6 px-6">
            <button
              onClick={() => setActiveTab("OverView")}
              className={`py-4 text-sm font-medium ${
                activeTab === "OverView"
                  ? "text-slate-900 border-b-4 border-[#4640DE]"
                  : "text-[#7C8493] hover:text-slate-700"
              }`}
            >
              OverView
            </button>

            <button
              onClick={() => setActiveTab("SocialLinks")}
              className={`py-4 text-sm font-medium ${
                activeTab === "SocialLinks"
                  ? "text-slate-900 border-b-4 border-[#4640DE]"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Social Links
            </button>
          </nav>
        </div>

        {/* Content */}
        <section className="px-8 py-8">
          {activeTab === "OverView" && (
            <>
              {/* Heading */}
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-slate-900">Basic Information</h2>
                <p className="mt-2 text-sm text-slate-500">
                  This is company information that you can update anytime.
                </p>
              </div>

              {/* Logo / Upload */}
              <div className="border-t border-b py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                  {/* Left column (labels) */}
                  <div className="text-sm text-slate-700">
                    <div className="font-medium mb-2">Company Logo</div>
                    <p className="text-xs text-slate-400">
                      This image will be shown publicly as company logo.
                    </p>
                  </div>

                  {/* Right columns (avatar + upload) */}
                  <div className="lg:col-span-2">
                    <div className="flex flex-col sm:flex-row items-center gap-6">
                      <div className="w-24 h-24 rounded-md overflow-hidden bg-gray-100 flex items-center justify-center">
                        <img src={CompanyLogoPlaceholder} alt="company logo" className="w-20 h-20 object-cover" />
                      </div>

                      <label
                        htmlFor="logo-upload"
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
                          <div className="text-sm font-medium text-slate-700">Click to replace or drag and drop</div>
                          <div className="text-xs text-slate-400">SVG, PNG, JPG or GIF (max. 400 x 400px)</div>
                        </div>
                        <input id="logo-upload" type="file" className="hidden" accept="image/*" />
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Company Details */}
              <div className="py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="text-sm text-slate-700">
                    <div className="font-medium mb-2">Company Details</div>
                    <p className="text-xs text-slate-400">
                      Introduce your company core info quickly to users by fill up company details
                    </p>
                  </div>

                  <div className="lg:col-span-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700">Company Name</label>
                        <input
                          className="mt-2 w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700">Website</label>
                        <input
                          className="mt-2 w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                          value={website}
                          onChange={(e) => setWebsite(e.target.value)}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700">Location</label>
                        <input
                          className="mt-2 w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700">Employee</label>
                        <select
                          className="mt-2 w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                          value={employees}
                          onChange={(e) => setEmployees(e.target.value)}
                        >
                          <option>1 - 50</option>
                          <option>51 - 200</option>
                          <option>201 - 500</option>
                          <option>500+</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700">Industry</label>
                        <select
                          className="mt-2 w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                          value={industry}
                          onChange={(e) => setIndustry(e.target.value)}
                        >
                          <option>Technology</option>
                          <option>Finance</option>
                          <option>Healthcare</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700">Date Founded</label>
                        <div className="mt-2 grid grid-cols-3 gap-2">
                          <select
                            className="border border-slate-200 rounded px-2 py-2 text-sm focus:outline-none"
                            value={dateDay}
                            onChange={(e) => setDateDay(e.target.value)}
                          >
                            <option>31</option>
                            <option>30</option>
                            <option>29</option>
                          </select>
                          <select
                            className="border border-slate-200 rounded px-2 py-2 text-sm focus:outline-none"
                            value={dateMonth}
                            onChange={(e) => setDateMonth(e.target.value)}
                          >
                            <option>July</option>
                            <option>June</option>
                          </select>
                          <select
                            className="border border-slate-200 rounded px-2 py-2 text-sm focus:outline-none"
                            value={dateYear}
                            onChange={(e) => setDateYear(e.target.value)}
                          >
                            <option>2021</option>
                            <option>2020</option>
                          </select>
                        </div>
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-slate-700">Tech Stack</label>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {techStack.map((t) => (
                            <span
                              key={t}
                              className="px-2 py-1 rounded bg-indigo-50 text-indigo-700 text-xs"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* About Company */}
              <div className="pt-6 pb-8 border-t">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="text-sm text-slate-700">
                    <div className="font-medium mb-2">About Company</div>
                    <p className="text-xs text-slate-400">Brief description for your company. URLs are hyperlinked.</p>
                  </div>

                  <div className="lg:col-span-2">
                    <label className="block text-sm font-medium text-slate-700">Description</label>
                    <textarea
                      className="mt-2 w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 min-h-[120px]"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      maxLength={500}
                    />
                    <div className="text-xs text-slate-400 mt-2 flex justify-between">
                      <div>Maximum 500 characters</div>
                      <div>{description.length} / 500</div>
                    </div>
                  </div>
                </div>

                {/* Save button */}
                <div className="mt-6 flex justify-end">
                  <button className="px-6 py-2 bg-[#4640DE] text-white rounded-md">Save Changes</button>
                </div>
              </div>
            </>
          )}

          {activeTab === "SocialLinks" && (
            <>
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-slate-900">Basic Information</h2>
                <p className="mt-2 text-sm text-slate-500">
                  Add elsewhere links to your company profile. You can add only username without full https links.
                </p>
              </div>

              <div className="py-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="text-sm text-slate-700">
                    {/* left label empty intentionally */}
                  </div>

                  <div className="lg:col-span-2 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700">Instagram</label>
                      <input
                        className="mt-2 w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none"
                        value={instagram}
                        onChange={(e) => setInstagram(e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700">Twitter</label>
                      <input
                        className="mt-2 w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none"
                        value={twitter}
                        onChange={(e) => setTwitter(e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700">Facebook</label>
                      <input
                        className="mt-2 w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none"
                        value={facebook}
                        onChange={(e) => setFacebook(e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700">LinkedIn</label>
                      <input
                        className="mt-2 w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none"
                        value={linkedin}
                        onChange={(e) => setLinkedin(e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700">Youtube</label>
                      <input
                        className="mt-2 w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none"
                        value={youtube}
                        onChange={(e) => setYoutube(e.target.value)}
                      />
                    </div>

                    {/* Save button aligned right */}
                    <div className="mt-6 flex justify-end">
                      <button className="px-6 py-2 bg-[#4640DE] text-white rounded-md">Save Changes</button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </section>
      </main>
    </div>
  );
}

export default DashboardUpdateCompanyProfile;
