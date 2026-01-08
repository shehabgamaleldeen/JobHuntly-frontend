import type { JSX } from "react";
import { useEffect, useState } from "react";
import instance from "@/components/AxiosConfig/instance";
import Loader from "@/components/Basic/Loader";

interface Skill {
  _id: string;
  name: string;
}

interface Language {
  name: string;
  level: string;
}

interface Experience {
  jobTitle: string;
  companyName: string;
  employmentType?: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  currentlyWorking?: boolean;
  description?: string;
}

interface Education {
  institution: string;
  degree?: string;
  fieldOfStudy?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
}

const defaultState = {
  headline: "",
  currentJobTitle: "",
  experienceYears: "" as number | "",
  highestQualification: "",
  openForOpportunities: false,
  skills: [] as Skill[],
  languages: [] as Language[],
  experiences: [] as Experience[],
  educations: [] as Education[],
  portfolioUrl: "",
  backgroundUrl: "",
};

export default function ProfileCareerTab(): JSX.Element {
  const [data, setData] = useState(defaultState);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [uploadingBg, setUploadingBg] = useState(false);

  // Skills input
  const [allSkills, setAllSkills] = useState<Skill[]>([])
  const [selectedSkillId, setSelectedSkillId] = useState("")
  const [skillInput, setSkillInput] = useState("");

  // Modal states
  const [languageModal, setLanguageModal] = useState(false);
  const [experienceModal, setExperienceModal] = useState(false);
  const [educationModal, setEducationModal] = useState(false);

  // Language form
  const [langForm, setLangForm] = useState({ name: "", level: "" });

  // Experience form
  const [expForm, setExpForm] = useState({
    jobTitle: "",
    companyName: "",
    employmentType: "",
    location: "",
    startDate: "",
    endDate: "",
    currentlyWorking: false,
    description: "",
  });

  // Education form
  const [eduForm, setEduForm] = useState({
    institution: "",
    degree: "",
    fieldOfStudy: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  /* Load skills */
  useEffect(() => {
    fetchData();
  }, []);

  const fetchSkills = async () => {
    const res = await instance.get("/settings/getSkills");
    console.log(res , "hereee" );
  setAllSkills(res.data.data)
}

useEffect(() => {
  fetchSkills()
}, [])




  const fetchData = async () => {
    try {
      const res = await instance.get("/settings/getProfile");

      

      if (res.data.success) {
        const profile = res.data.data.profile;
        
        setData({
          headline: profile.headline || "",
          currentJobTitle: profile.currentJobTitle || "",
          experienceYears: profile.experienceYears || "",
          highestQualification: profile.highestQualification || "",
          openForOpportunities: profile.openForOpportunities || false,
          skills: profile.skills || [],
          languages: profile.languages || [],
          experiences: profile.experiences || [],
          educations: profile.educations || [],
          portfolioUrl: profile.portfolioUrl || "",
          backgroundUrl: profile.backGroundUrl || "",
        });
      }
    } catch (err) {
      console.error("Failed to load career profile", err);
    } finally {
      setLoading(false);
    }
  };

  /* Save */
  const handleSave = async () => {
    setSaving(true);
    try {
      const updateData = {
        headline: data.headline,
        currentJobTitle: data.currentJobTitle,
        experienceYears: data.experienceYears,
        highestQualification: data.highestQualification,
        openForOpportunities: data.openForOpportunities,
        skills: data.skills.map(s => s._id),
        languages: data.languages,
        experiences: data.experiences,
        educations: data.educations,
        portfolioUrl: data.portfolioUrl,
      };

      const res = await instance.put("/settings/updateProfile", updateData);

      if (res.data.success) {
        alert("Career profile updated successfully!");
        fetchData();
      }
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to save career profile");
    } finally {
      setSaving(false);
    }
  };

  /* Background upload */
  const handleBackgroundUpload = async (file: File) => {
    if (!file) return;

    setUploadingBg(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await instance.post("/settings/backgroundUrl", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        setData({ ...data, backgroundUrl: res.data.url });
        alert("Background uploaded successfully!");
      }
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to upload background");
    } finally {
      setUploadingBg(false);
    }
  };

  /* Skills */
const addSkill = () => {
  if (!selectedSkillId) return

  const skill = allSkills.find(s => s._id === selectedSkillId)
  if (!skill) return

  const alreadyAdded = data.skills.some(s => s._id === skill._id)
  if (alreadyAdded) return

  setData({
    ...data,
    skills: [...data.skills, skill],
  })

  setSelectedSkillId("")
}


  const removeSkill = (index: number) => {
    setData({ ...data, skills: data.skills.filter((_, i) => i !== index) });
  };

  /* Language */
  const addLanguage = () => {
    if (langForm.name.trim() && langForm.level.trim()) {
      setData({ ...data, languages: [...data.languages, langForm] });
      setLangForm({ name: "", level: "" });
      setLanguageModal(false);
    }
  };

  const removeLanguage = (index: number) => {
    setData({ ...data, languages: data.languages.filter((_, i) => i !== index) });
  };

  /* Experience */
  const addExperience = () => {
    if (expForm.jobTitle.trim() && expForm.companyName.trim()) {
      setData({ ...data, experiences: [...data.experiences, expForm] });
      setExpForm({
        jobTitle: "",
        companyName: "",
        employmentType: "",
        location: "",
        startDate: "",
        endDate: "",
        currentlyWorking: false,
        description: "",
      });
      setExperienceModal(false);
    }
  };

  const removeExperience = (index: number) => {
    setData({ ...data, experiences: data.experiences.filter((_, i) => i !== index) });
  };

  /* Education */
  const addEducation = () => {
    if (eduForm.institution.trim()) {
      setData({ ...data, educations: [...data.educations, eduForm] });
      setEduForm({
        institution: "",
        degree: "",
        fieldOfStudy: "",
        startDate: "",
        endDate: "",
        description: "",
      });
      setEducationModal(false);
    }
  };

  const removeEducation = (index: number) => {
    setData({ ...data, educations: data.educations.filter((_, i) => i !== index) });
  };

  if (loading) {
    return (
      <Loader/>
    );
  }

  return (
    <>
      {/* Heading */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-900">
          Career Information
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          Manage your professional background and career preferences.
        </p>
      </div>

      {/* Background Image */}
      <div className="border-t border-b py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="text-sm text-slate-700">
            <div className="font-medium mb-2">Background Image</div>
            <p className="text-xs text-slate-400">
              This image will be shown as your profile background banner.
            </p>
          </div>

          <div className="lg:col-span-2">
            {data.backgroundUrl && (
              <div className="w-full h-32 rounded-md overflow-hidden bg-gray-100 mb-4">
                <img
                  src={data.backgroundUrl}
                  alt="background"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <label
              htmlFor="background-upload"
              className="border-2 border-dashed border-[#4640DE] rounded-md p-6 text-center cursor-pointer hover:bg-blue-50 transition block"
            >
              <div className="flex flex-col items-center gap-2">
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
                  {uploadingBg ? "Uploading..." : "Click to upload or drag and drop"}
                </div>
                <div className="text-xs text-slate-400">
                  SVG, PNG, JPG or GIF (max. 1920 x 400px)
                </div>
              </div>
              <input
                id="background-upload"
                type="file"
                className="hidden"
                accept="image/*"
                disabled={uploadingBg}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleBackgroundUpload(file);
                }}
              />
            </label>
          </div>
        </div>
      </div>

      {/* Basic Details */}
      <div className="py-8 border-b">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="text-sm text-slate-700">
            <div className="font-medium mb-2">Basic Details</div>
            <p className="text-xs text-slate-400">
              Provide essential information about your career profile
            </p>
          </div>

          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Headline
                </label>
                <input
                  className="mt-2 w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                  value={data.headline}
                  onChange={(e) => setData({ ...data, headline: e.target.value })}
                  placeholder="e.g., Senior Software Engineer"
                  disabled={saving}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Current Job Title
                </label>
                <input
                  className="mt-2 w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                  value={data.currentJobTitle}
                  onChange={(e) => setData({ ...data, currentJobTitle: e.target.value })}
                  placeholder="e.g., Backend Developer"
                  disabled={saving}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Years of Experience
                </label>
                <input
                  type="number"
                  className="mt-2 w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                  value={data.experienceYears}
                  onChange={(e) =>
                    setData({
                      ...data,
                      experienceYears: e.target.value === "" ? "" : Number(e.target.value),
                    })
                  }
                  min="0"
                  disabled={saving}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Highest Qualification
                </label>
                <input
                  className="mt-2 w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                  value={data.highestQualification}
                  onChange={(e) => setData({ ...data, highestQualification: e.target.value })}
                  placeholder="e.g., Bachelor's Degree"
                  disabled={saving}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Job Preferences */}
      <div className="py-8 border-b">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="text-sm text-slate-700">
            <div className="font-medium mb-2">Job Preferences</div>
            <p className="text-xs text-slate-400">
              Let recruiters know your availability
            </p>
          </div>

          <div className="lg:col-span-2">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={data.openForOpportunities}
                onChange={(e) =>
                  setData({ ...data, openForOpportunities: e.target.checked })
                }
                disabled={saving}
                className="mt-1"
              />
              <div>
                <div className="font-medium text-slate-900">
                  Open for new opportunities
                </div>
                <div className="text-xs text-slate-400">
                  Recruiters will be able to see that you're actively looking
                </div>
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className="py-8 border-b">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="text-sm text-slate-700">
            <div className="font-medium mb-2">Skills</div>
            <p className="text-xs text-slate-400">
              Highlight your key professional skills
            </p>
          </div>

          <div className="lg:col-span-2">
            <div className="flex gap-2 mb-3">
              <select
                value={selectedSkillId}
                onChange={(e) => setSelectedSkillId(e.target.value)}
                disabled={saving}
                className="flex-1 border border-slate-200 rounded px-3 py-2 text-sm"
              >
                <option value="">Select a skill</option>
                {allSkills.map(skill => (
                  <option key={skill._id} value={skill._id}>
                    {skill.name}
                  </option>
                ))}
              </select>

              <button
                onClick={addSkill}
                disabled={saving}
                className="px-4 py-2 bg-[#4640DE] text-white rounded text-sm hover:bg-[#3730d8] disabled:opacity-50"
              >
                Add
              </button>
            </div>

            {data.skills.length === 0 ? (
              <p className="text-sm text-slate-400">No skills added yet</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-sm flex items-center gap-2"
                  >
                    {skill.name}
                    <button
                      onClick={() => removeSkill(i)}
                      disabled={saving}
                      className="text-indigo-500 hover:text-indigo-700 disabled:opacity-50"
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Languages */}
      <div className="py-8 border-b">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="text-sm text-slate-700">
            <div className="font-medium mb-2">Languages</div>
            <p className="text-xs text-slate-400">
              Languages you can communicate in
            </p>
          </div>

          <div className="lg:col-span-2">
            <button
              onClick={() => setLanguageModal(true)}
              disabled={saving}
              className="mb-3 px-4 py-2 bg-[#4640DE] text-white rounded text-sm hover:bg-[#3730d8] disabled:opacity-50"
            >
              + Add Language
            </button>

            {data.languages.length === 0 ? (
              <p className="text-sm text-slate-400">No languages added yet</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {data.languages.map((lang, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-sm flex items-center gap-2"
                  >
                    {lang.name} - {lang.level}
                    <button
                      onClick={() => removeLanguage(i)}
                      disabled={saving}
                      className="text-emerald-500 hover:text-emerald-700 disabled:opacity-50"
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Experience */}
      <div className="py-8 border-b">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="text-sm text-slate-700">
            <div className="font-medium mb-2">Work Experience</div>
            <p className="text-xs text-slate-400">
              Your professional work history
            </p>
          </div>

          <div className="lg:col-span-2">
            <button
              onClick={() => setExperienceModal(true)}
              disabled={saving}
              className="mb-3 px-4 py-2 bg-[#4640DE] text-white rounded text-sm hover:bg-[#3730d8] disabled:opacity-50"
            >
              + Add Experience
            </button>

            {data.experiences.length === 0 ? (
              <p className="text-sm text-slate-400">No experiences added yet</p>
            ) : (
              <div className="space-y-4">
                {data.experiences.map((exp, i) => (
                  <div key={i} className="border rounded-md p-4 text-sm bg-white relative">
                    <button
                      onClick={() => removeExperience(i)}
                      disabled={saving}
                      className="absolute top-3 right-3 text-slate-400 hover:text-slate-600 disabled:opacity-50"
                    >
                      ✕
                    </button>
                    <div className="font-medium text-slate-900">{exp.jobTitle}</div>
                    <div className="text-slate-500 text-xs mt-1">
                      {exp.companyName}
                      {exp.employmentType && ` • ${exp.employmentType}`}
                      {exp.location && ` • ${exp.location}`}
                    </div>
                    {exp.description && (
                      <p className="mt-2 text-slate-600 text-xs">{exp.description}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Education */}
      <div className="py-8 border-b">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="text-sm text-slate-700">
            <div className="font-medium mb-2">Education</div>
            <p className="text-xs text-slate-400">
              Your academic background and qualifications
            </p>
          </div>

          <div className="lg:col-span-2">
            <button
              onClick={() => setEducationModal(true)}
              disabled={saving}
              className="mb-3 px-4 py-2 bg-[#4640DE] text-white rounded text-sm hover:bg-[#3730d8] disabled:opacity-50"
            >
              + Add Education
            </button>

            {data.educations.length === 0 ? (
              <p className="text-sm text-slate-400">No education records added</p>
            ) : (
              <div className="space-y-4">
                {data.educations.map((edu, i) => (
                  <div key={i} className="border rounded-md p-4 text-sm bg-white relative">
                    <button
                      onClick={() => removeEducation(i)}
                      disabled={saving}
                      className="absolute top-3 right-3 text-slate-400 hover:text-slate-600 disabled:opacity-50"
                    >
                      ✕
                    </button>
                    <div className="font-medium text-slate-900">{edu.institution}</div>
                    <div className="text-slate-500 text-xs mt-1">
                      {edu.degree}
                      {edu.fieldOfStudy && ` • ${edu.fieldOfStudy}`}
                    </div>
                    {edu.description && (
                      <p className="mt-2 text-slate-600 text-xs">{edu.description}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Portfolio URL */}
      <div className="py-8 border-b">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="text-sm text-slate-700">
            <div className="font-medium mb-2">Portfolio</div>
            <p className="text-xs text-slate-400">
              Share your portfolio website
            </p>
          </div>

          <div className="lg:col-span-2">
            <input
              className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
              placeholder="https://yourportfolio.com"
              value={data.portfolioUrl}
              onChange={(e) => setData({ ...data, portfolioUrl: e.target.value })}
              disabled={saving}
            />
          </div>
        </div>
      </div>

      {/* Save button */}
      <div className="pt-6 pb-8">
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            disabled={saving || uploadingBg}
            className="px-6 py-2 bg-[#4640DE] text-white rounded-md hover:bg-[#3730d8] disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      {/* Modals */}
      {/* Language Modal */}
      {languageModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white max-w-lg w-full rounded-lg shadow-lg">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-900">Add Language</h3>
                <button onClick={() => setLanguageModal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Language Name</label>
                  <input
                    value={langForm.name}
                    onChange={(e) => setLangForm({ ...langForm, name: e.target.value })}
                    placeholder="e.g., English"
                    className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Proficiency Level</label>
                  <select
                    value={langForm.level}
                    onChange={(e) => setLangForm({ ...langForm, level: e.target.value })}
                    className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                  >
                    <option value="">Select level</option>
                    <option value="NATIVE">Native</option>
                    <option value="FLUENT">Fluent</option>
                    <option value="PROFESSIONAL">Professional</option>
                    <option value="INTERMEDIATE">Intermediate</option>
                    <option value="BASIC">Basic</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button onClick={() => setLanguageModal(false)} className="px-4 py-2 border rounded text-sm">Cancel</button>
                <button onClick={addLanguage} className="px-4 py-2 bg-[#4640DE] text-white rounded text-sm">Add Language</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Experience Modal */}
      {experienceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white max-w-2xl w-full rounded-lg shadow-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-900">Add Work Experience</h3>
                <button onClick={() => setExperienceModal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Job Title <span className="text-red-500">*</span></label>
                  <input value={expForm.jobTitle} onChange={(e) => setExpForm({ ...expForm, jobTitle: e.target.value })} className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Company Name <span className="text-red-500">*</span></label>
                  <input value={expForm.companyName} onChange={(e) => setExpForm({ ...expForm, companyName: e.target.value })} className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Employment Type</label>
                  <select value={expForm.employmentType} onChange={(e) => setExpForm({ ...expForm, employmentType: e.target.value })} className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200">
                    <option value="">Select type</option>
                    <option value="Full-Time">Full-Time</option>
                    <option value="Part-Time">Part-Time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Location</label>
                  <input value={expForm.location} onChange={(e) => setExpForm({ ...expForm, location: e.target.value })} className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Start Date</label>
                  <input type="date" value={expForm.startDate} onChange={(e) => setExpForm({ ...expForm, startDate: e.target.value })} className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">End Date</label>
                  <input type="date" value={expForm.endDate} onChange={(e) => setExpForm({ ...expForm, endDate: e.target.value })} disabled={expForm.currentlyWorking} className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-nonefocus:ring-2 focus:ring-blue-200" />
                </div>

                <div className="md:col-span-2">
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={expForm.currentlyWorking} onChange={(e) => setExpForm({ ...expForm, currentlyWorking: e.target.checked })} />
                <span className="text-sm text-slate-700">I currently work here</span>
              </label>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
              <textarea value={expForm.description} onChange={(e) => setExpForm({ ...expForm, description: e.target.value })} rows={4} className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200" />
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button onClick={() => setExperienceModal(false)} className="px-4 py-2 border rounded text-sm">Cancel</button>
            <button onClick={addExperience} className="px-4 py-2 bg-[#4640DE] text-white rounded text-sm">Add Experience</button>
          </div>
        </div>
      </div>
    </div>
  )}

  {/* Education Modal */}
  {educationModal && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-white max-w-2xl w-full rounded-lg shadow-lg max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-900">Add Education</h3>
            <button onClick={() => setEducationModal(false)} className="text-slate-400 hover:text-slate-600">✕</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-2">Institution <span className="text-red-500">*</span></label>
              <input value={eduForm.institution} onChange={(e) => setEduForm({ ...eduForm, institution: e.target.value })} placeholder="e.g., Harvard University" className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200" />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Degree</label>
              <input value={eduForm.degree} onChange={(e) => setEduForm({ ...eduForm, degree: e.target.value })} placeholder="e.g., Bachelor's Degree" className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200" />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Field of Study</label>
              <input value={eduForm.fieldOfStudy} onChange={(e) => setEduForm({ ...eduForm, fieldOfStudy: e.target.value })} placeholder="e.g., Computer Science" className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200" />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Start Date</label>
              <input type="date" value={eduForm.startDate} onChange={(e) => setEduForm({ ...eduForm, startDate: e.target.value })} className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200" />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">End Date</label>
              <input type="date" value={eduForm.endDate} onChange={(e) => setEduForm({ ...eduForm, endDate: e.target.value })} className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200" />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
              <textarea value={eduForm.description} onChange={(e) => setEduForm({ ...eduForm, description: e.target.value })} rows={4} placeholder="Describe your achievements, coursework, etc." className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200" />
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button onClick={() => setEducationModal(false)} className="px-4 py-2 border rounded text-sm">Cancel</button>
            <button onClick={addEducation} className="px-4 py-2 bg-[#4640DE] text-white rounded text-sm">Add Education</button>
          </div>
        </div>
      </div>
    </div>
  )}</>)}