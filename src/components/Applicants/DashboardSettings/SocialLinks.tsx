import type { JSX } from "react";
import { useState, useEffect } from "react";
import instance from "@/components/AxiosConfig/instance";
import Loader from "@/components/Basic/Loader";

export default function SocialLinksTab(): JSX.Element {
  const [instagram, setInstagram] = useState("");
  const [twitter, setTwitter] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");
  const [website, setWebsite] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // Fetch user social links
  useEffect(() => {
    fetchSocialLinks();
  }, []);

  const fetchSocialLinks = async () => {
    try {
      const response = await instance.get("/settings/getProfile");
      if (response.data.success) {
        const socialLinks = response.data.data.profile.socialLinks || {};
        setInstagram(socialLinks.instagram || "");
        setTwitter(socialLinks.twitter || "");
        setLinkedin(socialLinks.linkedin || "");
        setGithub(socialLinks.github || "");
        setWebsite(socialLinks.website || "");
      }
    } catch (error) {
      console.error("Error fetching social links:", error);
    } finally {
      setFetching(false);
    }
  };

  const handleSaveChanges = async () => {
    setLoading(true);
    try {
      const socialLinks: any = {};

      // Only add non-empty links
      if (instagram.trim()) socialLinks.instagram = instagram.trim();
      if (twitter.trim()) socialLinks.twitter = twitter.trim();
      if (linkedin.trim()) socialLinks.linkedin = linkedin.trim();
      if (github.trim()) socialLinks.github = github.trim();
      if (website.trim()) socialLinks.website = website.trim();

      const response = await instance.put("/settings/updateProfile", {
        socialLinks,
      });

      if (response.data.success) {
        alert("Social links updated successfully!");
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Failed to update social links";
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <Loader/>
    );
  }

  return (
    <>
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-900">
          Social Links Information
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          Add elsewhere links to your profile. You can add full URLs or just usernames.
        </p>
      </div>

      <div className="py-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="text-sm text-slate-700">
            {/* left label empty intentionally */}
          </div>

          <div className="lg:col-span-2 space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700">
                LinkedIn
              </label>
              <input
                className="mt-2 w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
                placeholder="https://www.linkedin.com/in/yourprofile"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">
                GitHub
              </label>
              <input
                className="mt-2 w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                value={github}
                onChange={(e) => setGithub(e.target.value)}
                placeholder="https://github.com/yourprofile"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">
                Twitter
              </label>
              <input
                className="mt-2 w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                value={twitter}
                onChange={(e) => setTwitter(e.target.value)}
                placeholder="https://twitter.com/yourprofile"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">
                Instagram
              </label>
              <input
                className="mt-2 w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                placeholder="https://www.instagram.com/yourprofile"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">
                Website
              </label>
              <input
                className="mt-2 w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="https://www.yourwebsite.com"
                disabled={loading}
              />
            </div>

            {/* Save button aligned right */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleSaveChanges}
                disabled={loading}
                className="px-6 py-2 bg-[#4640DE] text-white rounded-md hover:opacity-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}