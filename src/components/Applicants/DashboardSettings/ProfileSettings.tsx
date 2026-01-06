import type { JSX } from "react";
import { useEffect, useState } from "react";
import instance from "@/components/AxiosConfig/instance";
import Loader from "@/components/Basic/Loader";

interface ProfileData {
  fullName: string;
  email: string;
  dateOfBirth: string;
  locationCity: string;
  locationCountry: string;
  aboutMe: string;
  logoUrl?: string;
}

export default function ProfileSettingsTab(): JSX.Element {
  const [profile, setProfile] = useState<ProfileData>({
    fullName: "",
    email: "",
    dateOfBirth: "",
    locationCity: "",
    locationCountry: "",
    aboutMe: "",
  });

  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);

  /* Load profile data */
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await instance.get("/settings/getProfile");
      
      if (res.data.success) {
        const { user, profile: profileData } = res.data.data;
        
        setProfile({
          fullName: user.fullName || "",
          email: user.email || "",
          dateOfBirth: profileData.dateOfBirth || "",
          locationCity: profileData.locationCity || "",
          locationCountry: profileData.locationCountry || "",
          aboutMe: profileData.aboutMe || "",
          logoUrl: profileData.logoUrl || profileData.logoUrl || "",
        });
      }
    } catch (err) {
      console.error("Failed to load profile", err);
    } finally {
      setLoading(false);
    }
  };

  /* Handle input change */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  /* Handle avatar upload */
  const handleAvatarUpload = async (file: File) => {
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await instance.post("/settings/logoUrl", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        setProfile({ ...profile, logoUrl: res.data.url });
        alert("Avatar uploaded successfully!");
      }
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to upload avatar");
    } finally {
      setUploading(false);
    }
  };

  /* Save profile */
  const handleSave = async () => {
    setSaving(true);
    try {
      const updateData = {
        locationCity: profile.locationCity,
        locationCountry: profile.locationCountry,
        aboutMe: profile.aboutMe,
        dateOfBirth: profile.dateOfBirth,
      };

      const res = await instance.put("/settings/updateProfile", updateData);

      if (res.data.success) {
        alert("Profile updated successfully");
        fetchProfile(); // Refresh data
      }
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Loader/>
    );
  }

  return (
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
          {/* Left column */}
          <div className="text-sm text-slate-700">
            <div className="font-medium mb-2">Profile Photo</div>
            <p className="text-xs text-slate-400">
              This image will be shown publicly as your profile picture,
              it will help recruiters recognize you!
            </p>
          </div>

          {/* Avatar */}
          <div className="lg:col-span-2">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              {profile.logoUrl ? (
                <img
                  src={profile.logoUrl}
                  alt="avatar"
                  className="w-24 h-24 rounded-full object-cover ring-2 ring-slate-100"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center ring-2 ring-slate-100">
                  <span className="text-3xl font-bold text-white">
                    {profile.fullName.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}

              <label
                htmlFor="avatar-upload"
                className="flex-1 border-2 border-dashed border-[#4640DE] rounded-md p-6 text-center cursor-pointer hover:bg-blue-50 transition"
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
                    {uploading ? "Uploading..." : "Click to replace or drag and drop"}
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
                  disabled={uploading}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleAvatarUpload(file);
                  }}
                />
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Personal details */}
      <div className="py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="text-sm text-slate-700">
            <div className="font-medium mb-2">Personal Details</div>
          </div>

          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                name="fullName"
                value={profile.fullName}
                disabled
                className="w-full border border-slate-200 rounded px-3 py-2 text-sm bg-gray-50 cursor-not-allowed"
                title="Name cannot be changed here"
              />
              <p className="text-xs text-slate-400 mt-1">
                Name cannot be changed
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                name="email"
                value={profile.email}
                disabled
                className="w-full border border-slate-200 rounded px-3 py-2 text-sm bg-gray-50 cursor-not-allowed"
                title="Email can be changed in Login & Security tab"
              />
              <p className="text-xs text-slate-400 mt-1">
                Change in Login & Security tab
              </p>
            </div>


            <div>
              <label className="block text-sm font-medium text-slate-700">
                City
              </label>
              <input
                name="locationCity"
                value={profile.locationCity}
                onChange={handleChange}
                disabled={saving}
                className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                placeholder="e.g., Cairo"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">
                Country
              </label>
              <input
                name="locationCountry"
                value={profile.locationCountry}
                onChange={handleChange}
                disabled={saving}
                className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                placeholder="e.g., Egypt"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">
                Date of Birth
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={profile.dateOfBirth}
                onChange={handleChange}
                disabled={saving}
                className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>
          </div>
        </div>
      </div>

      {/* About Me */}
      <div className="py-8 border-t">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="text-sm text-slate-700">
            <div className="font-medium mb-2">About Me</div>
            <p className="text-xs text-slate-400">
              Write a brief description about yourself
            </p>
          </div>

          <div className="lg:col-span-2">
            <textarea
              name="aboutMe"
              value={profile.aboutMe}
              onChange={handleChange}
              disabled={saving}
              placeholder="Tell us about yourself, your experience, and what you're looking for..."
              className="w-full border border-slate-200 rounded px-3 py-2 text-sm min-h-[120px] focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>
        </div>
      </div>

      {/* Save button */}
      <div className="pt-6 pb-8 border-t">
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            disabled={saving || uploading}
            className="px-6 py-2 bg-[#4640DE] text-white rounded shadow-sm disabled:opacity-60 disabled:cursor-not-allowed hover:bg-[#3730d8] transition"
          >
            {saving ? "Saving..." : "Save Profile"}
          </button>
        </div>
      </div>
    </>
  );
}