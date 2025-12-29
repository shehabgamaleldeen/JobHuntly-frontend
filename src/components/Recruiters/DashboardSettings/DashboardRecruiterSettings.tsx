
import type { JSX } from "react";
import { useState } from "react";
import NotFoundPage from "../../Basic/NotFoundPage";
import DashboardHelpCenterRecruiter from "./HelpCenterRecruiter";
import { DashboardUpdateCompanyProfile  } from "./DashboardUpdataCompanyProfile";
import { DashboardSidebarRecruiterComponent ,type PageKey } from "../Dashboard/DashboardSidebarRecruiterComponent";
import Dashboard from "../Dashboard/Dashboard";
import CompanyPageRecruiterWrapper from "../DashboardCompanyProfile/CompanyPageRecruiterWrapper";
import { CompanyHeader } from "./headParts/addPostNav";
import CompanyLogo  from "../../../assets/images/twiteer.jpg";
import { JobListing } from "../JobListing/JobListing";


export default function DashboardRecruiterSettings(): JSX.Element {
  const [page, setPage] = useState<PageKey>("dashboard"); // default

  function renderPage(p: PageKey) {
    switch (p) {
      case "dashboard":
        return   <Dashboard/>;

      case "settings":
        return <DashboardUpdateCompanyProfile />;

      case "CompanyProfile":
        return <CompanyPageRecruiterWrapper />;

      case "JobListing":
        return  <JobListing/>

      case "help":
        return < DashboardHelpCenterRecruiter/>

      default:
        return <NotFoundPage/>;
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar with page control */}
      <DashboardSidebarRecruiterComponent active={page} onNavigate={setPage} />

      {/* Main content */}
      <main className="flex-1 p-2">
          <CompanyHeader
          logo={CompanyLogo}
          companyName="Nomad"
          buttonText="Post a job"
          buttonLink="/company/job-create"/>
        <div className="max-w-6xl mx-auto">{renderPage(page)}</div>
      </main>
    </div>
  );
}
