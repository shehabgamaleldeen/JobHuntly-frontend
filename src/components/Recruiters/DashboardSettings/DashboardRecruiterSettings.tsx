import type { JSX } from "react";
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { DashboardSidebarRecruiterComponent } from "../Dashboard/DashboardSidebarRecruiterComponent";
import { CompanyHeader } from "./headParts/addPostNav";
import instance from "@/components/AxiosConfig/instance";

export default function DashboardRecruiter(): JSX.Element {
  const [companyLogo, setCompanyLogo] = useState("");
  const [companyName, setCompanyName] = useState("Company");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCompanyData();
  }, []);

  const fetchCompanyData = async () => {
    try {
      const response = await instance.get("/settings/getProfileRecruiter");

      if (response.data.success) {
        const { user, profile } = response.data.data;
        
        setCompanyName(profile.name || user.fullName || "Company");
        setCompanyLogo(profile.logoUrl || "");
      }
    } catch (error) {
      console.error("Error fetching company data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <DashboardSidebarRecruiterComponent />

      {/* Main content */}
      <main className="flex-1 p-2">
        {loading ? (
          <div className="h-20 bg-white rounded-lg shadow-sm animate-pulse mb-6" />
        ) : (
          <CompanyHeader
            logo={companyLogo}
            companyName={companyName}
            buttonText="Post a job"
            buttonLink="/company/jobs/step-1"
          />
        )}

        <div className="max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}