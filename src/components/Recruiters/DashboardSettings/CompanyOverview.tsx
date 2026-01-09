import type { JSX } from "react";
import { useState, useEffect } from "react";
import instance from "@/components/AxiosConfig/instance";
import Loader from "@/components/Basic/Loader";
import { toast } from "sonner";

type TechItem = {
name: string
logo: string
}

export default function CompanyOverviewTab(): JSX.Element {

const TECH_STACK_OPTIONS = [
  "HTML",
  "CSS",
  "JAVASCRIPT",
  "TYPESCRIPT",
  "REACT",
  "NEXTJS",
  "VUE",
  "NODEJS",
  "EXPRESS",
  "NESTJS",
  "DJANGO",
  "RUBY",
  "MONGODB",
  "POSTGRES",
  "MYSQL",
  "REDIS",
  "DOCKER",
  "KUBERNETES",
  "AWS",
  "GCP",
  "MIXPANEL",
  "GOOGLE_ANALYTICS",
  "FRAMER",
  "FIGMA",
]

  
  
  
  const [companyName, setCompanyName] = useState("");
  const [website, setWebsite] = useState("");
  const [employees, setEmployees] = useState("");
  const [industry, setIndustry] = useState("");
  const [foundedDate, setFoundedDate] = useState("");
  const [hqCity, setHqCity] = useState("");
  const [hqCountry, setHqCountry] = useState("");
  const [description, setDescription] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [companyImages, setCompanyImages] = useState<string[]>([]);
  const [techStack, setTechStack] = useState<TechItem[]>([])
  
  
  const [techInput, setTechInput] = useState("")
  const [uploadingImage, setUploadingImage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [uploadingBg, setUploadingBg] = useState(false);

  useEffect(() => {
    fetchCompanyProfile();
  }, []);

  const fetchCompanyProfile = async () => {
    try {
      const response = await instance.get("/settings/getProfileRecruiter");
      if (response.data.success) {
        const { user, profile } = response.data.data;
        
        setCompanyName(profile.name || "");
        setWebsite(profile.website || "");
        setEmployees(profile.employeesRange || "");
        setIndustry(profile.industry || "");
        setFoundedDate(profile.foundedDate || "");
        setHqCity(profile.hqCity || "");
        setHqCountry(profile.hqCountry || "");
        setDescription(profile.about || "");
        setLogoUrl(profile.logoUrl || "");
        setCompanyImages(profile.images.map((img: any) => img.src));
        setTechStack(profile.techStack || [])


      }
    } catch (error) {
      console.error("Error fetching company profile:", error);
    } finally {
      setFetching(false);
    }
  };

  const handleLogoUpload = async (file: File) => {
    if (!file) return;

    setUploadingLogo(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await instance.post("/settings/logoUrl", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        setLogoUrl(res.data.url);
        toast.success("Logo uploaded successfully!");
      }
    } catch (err: any) {
      console.error(err);
       toast.error(err.response?.data?.message || "Failed to upload logo");
    } finally {
      setUploadingLogo(false);
    }
  };


  const removeCompanyImage = async (index: number) => {
    const imageUrl = companyImages[index]

    try {
      await instance.delete("/settings/CompanyImages", {
        data: { imageUrl },
      })

      setCompanyImages((prev) =>
        prev.filter((_, i) => i !== index)
      )

      toast.success("company images deleted successfully!");
      
    } catch (err:any) {
      console.error(err)
      toast.error(err.response?.data?.message || "Failed to upload logo");
    }
  }


  const handleCompanyImageUpload = async (files: FileList) => {
  setUploadingImage(true)

  try {
    const formData = new FormData()

    Array.from(files).forEach((file) => {
      formData.append("files", file)
    })

    const res = await instance.post("/settings/companyImages", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })

    if (res.data.success) {
      setCompanyImages((prev) => [
        ...prev,
        ...res.data.images,
      ])
      toast.success("company images uploaded successfully!");
    }
  } catch (err:any) {
    console.error(err)
    toast.error(err.response?.data?.message || "Failed to upload logo");
  } finally {
    setUploadingImage(false)
  }
}




  const handleSaveChanges = async () => {
    setLoading(true);
    try {
      const updateData = {
        website: website.trim(),
        employeesRange: employees,
        industry: industry,
        foundedDate: foundedDate,
        hqCity: hqCity.trim(),
        hqCountry: hqCountry.trim(),
        about: description.trim(),
        techStack: techStack.map((t) => ({
         name: t.name, 
       }))

      };

      const response = await instance.put("/settings/updateProfileRecruiter", updateData);

      // console.log( response.data );
      
      if (response.data.success) {
         toast.success("Company profile updated successfully!");
        fetchCompanyProfile();
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Failed to update company profile";
       toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return <Loader />;
  }

  return (
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
          <div className="text-sm text-slate-700">
            <div className="font-medium mb-2">Company Logo</div>
            <p className="text-xs text-slate-400">
              This image will be shown publicly as company logo.
            </p>
          </div>

          <div className="lg:col-span-2">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              {logoUrl ? (
                <div className="w-24 h-24 rounded-md overflow-hidden bg-gray-100 flex items-center justify-center">
                  <img src={logoUrl} alt="company logo" className="w-20 h-20 object-cover" />
                </div>
              ) : (
                <div className="w-24 h-24 rounded-md bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center">
                  <span className="text-3xl font-bold text-white">
                    {companyName.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}

              <label
                htmlFor="logo-upload"
                className="flex-1 border-2 border-dashed border-[#4640DE] rounded-md p-6 text-center cursor-pointer hover:bg-blue-50 transition"
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
                    {uploadingLogo ? "Uploading..." : "Click to replace or drag and drop"}
                  </div>
                  <div className="text-xs text-slate-400">SVG, PNG, JPG or GIF (max. 400 x 400px)</div>
                </div>
                <input
                  id="logo-upload"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  disabled={uploadingLogo}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleLogoUpload(file);
                  }}
                />
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Company Images */}
      <div className="border-b py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="text-sm text-slate-700">
            <div className="font-medium mb-2">Company Images</div>
            <p className="text-xs text-slate-400">
              Upload images to showcase your company culture and workspace.
            </p>
          </div>

          <div className="lg:col-span-2">
            <div className="flex flex-col gap-6">

              {/* Preview Grid (زي background preview) */}
              {companyImages.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {companyImages.map((img, index) => (
                    <div
                      key={index}
                      className="relative w-full h-32 rounded-md overflow-hidden bg-gray-100 group"
                    >
                      <img
                        src={img}
                        alt="company"
                        className="w-full h-full object-cover"
                      />

                      <button
                        onClick={() => removeCompanyImage(index)}
                        className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/80 text-rose-500 text-sm
                                   opacity-0 group-hover:opacity-100 transition"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Upload box (نفس background بالظبط) */}
              <label
                htmlFor="company-images-upload"
                className="border-2 border-dashed border-[#4640DE] rounded-md p-6 text-center cursor-pointer hover:bg-blue-50 transition"
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
                    {uploadingImage ? "Uploading..." : "Click to upload company images"}
                  </div>
                  <div className="text-xs text-slate-400">
                    PNG, JPG (recommended 1200 × 800)
                  </div>
                </div>
            
                <input
                  id="company-images-upload"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  multiple
                  disabled={uploadingImage}
                  onChange={(e) => {
                    const files = e.target.files
                    if (!files) return
                  
                    if (companyImages.length + files.length > 3) {
                      toast.error("Maximum 3 company images allowed")
                      return
                   }
                 
                 
                    handleCompanyImageUpload(files)
                  }}
                />

              </label>
                
            </div>
          </div>
        </div>
      </div>


{/* ================= TECH STACK ================= */}
<div className="py-8 border-b">
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
    <div className="text-sm text-slate-700">
      <div className="font-medium mb-2">Tech Stack</div>
      <p className="text-xs text-slate-400">
        Technologies your company works with
      </p>
    </div>

    <div className="lg:col-span-2">
     {/* Add tech */}
<div className="flex gap-2 mb-3">
  <select
    value={techInput}
    onChange={(e) => setTechInput(e.target.value)}
    className="flex-1 border border-slate-200 rounded px-3 py-2 text-sm bg-white"
  >
    <option value="">Select technology</option>

    {TECH_STACK_OPTIONS.map((tech) => (
      <option
        key={tech}
        value={tech}
        disabled={techStack.some((t) => t.name === tech)}
      >
        {tech}
      </option>
    ))}
  </select>

  <button
    onClick={() => {
      if (!techInput) return

      setTechStack((prev) => [
        ...prev,
        { name: techInput, logo: "" }, // logo backend هيضيفه
      ])
      setTechInput("")
    }}
    className="px-4 py-2 bg-[#4640DE] text-white rounded text-sm"
  >
    Add
  </button>
</div>


      {/* List */}
      {techStack.length === 0 ? (
        <p className="text-sm text-slate-400">No tech added yet</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {techStack.map((tech, i) => (
            <span
              key={i}
              className="px-3 py-1 rounded bg-indigo-50 text-indigo-700 text-xs flex items-center gap-2"
            >
              {tech.logo && (
                <img src={tech.logo} className="w-4 h-4" />
              )}
              {tech.name}
              <button
                onClick={() =>
                  setTechStack((prev) =>
                    prev.filter((_, index) => index !== i)
                  )
                }
                className="text-indigo-500 hover:text-indigo-700"
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
                  className="mt-2 w-full border border-slate-200 rounded px-3 py-2 text-sm bg-gray-50 cursor-not-allowed"
                  value={companyName}
                  disabled
                  title="Company name cannot be changed"
                />
                <p className="text-xs text-slate-400 mt-1">Name cannot be changed</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">Website</label>
                <input
                  className="mt-2 w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="https://www.yourcompany.com"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">Company Size</label>
                <select
                  className="mt-2 w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                  value={employees}
                  onChange={(e) => setEmployees(e.target.value)}
                  disabled={loading}
                >
                  <option value="">Select size</option>
                  <option value="1-50">1 - 50</option>
                  <option value="51-200">51 - 200</option>
                  <option value="151-250">151 - 250</option>
                  <option value="251-500">251 - 500</option>
                  <option value="501-1000">501 - 1000</option>
                  <option value="1000+">1000+ above</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">Industry</label>
                <select
                  className="mt-2 w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  disabled={loading}
                >
                  <option value="">Select industry</option>
                  <option value="Technology">Technology</option>
                  <option value="Finance">Finance</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Education">Education</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Social & Non-Profit">Social & Non-Profit</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">Date Founded</label>
                <input
                  type="date"
                  className="mt-2 w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                  value={foundedDate}
                  onChange={(e) => setFoundedDate(e.target.value)}
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">City</label>
                <input
                  className="mt-2 w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                  value={hqCity}
                  onChange={(e) => setHqCity(e.target.value)}
                  placeholder="e.g., London"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">Country</label>
                <input
                  className="mt-2 w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                  value={hqCountry}
                  onChange={(e) => setHqCountry(e.target.value)}
                  placeholder="e.g., United Kingdom"
                  disabled={loading}
                />
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
              placeholder="Tell us about your company, your mission, and what makes you unique..."
              disabled={loading}
            />
            <div className="text-xs text-slate-400 mt-2 flex justify-between">
              <div>Maximum 500 characters</div>
              <div>{description.length} / 500</div>
            </div>
          </div>
        </div>

        {/* Save button */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSaveChanges}
            disabled={loading || uploadingLogo || uploadingBg}
            className="px-6 py-2 bg-[#4640DE] text-white rounded-md hover:bg-[#3730d8] disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </>
  );
}