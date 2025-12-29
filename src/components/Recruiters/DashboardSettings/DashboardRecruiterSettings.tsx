
import type { JSX } from "react";
import { useState } from "react";
import NotFoundPage from "../../Basic/NotFoundPage";
import DashboardHelpCenterRecruiter from "./HelpCenterRecruiter";
import { DashboardUpdateCompanyProfile  } from "./DashboardUpdataCompanyProfile";
import { DashboardSidebarRecruiterComponent ,type PageKey } from "../Dashboard/DashboardSidebarRecruiterComponent";
import DashboardCompanyProfile from "../DashboardCompanyProfile/DashboardCompanyProfile";
import Dashboard from "../Dashboard/Dashboard";


export default function DashboardRecruiterSettings(): JSX.Element {
  const [page, setPage] = useState<PageKey>("dashboard"); // default

  function renderPage(p: PageKey) {
    switch (p) {
      case "dashboard":
        return <Dashboard/>;

      case "settings":
        return <DashboardUpdateCompanyProfile />;

      case "CompanyProfile":
        return <DashboardCompanyProfile />;

      case "JobListing":
        return <div className="text-lg p-4">Job Listing</div>;

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
      <main className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">{renderPage(page)}</div>
      </main>
    </div>
  );
}
