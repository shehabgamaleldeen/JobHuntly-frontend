
import type { JSX } from "react";
import React, { useState } from "react";
import { DashboardSidebarComponent ,type PageKey } from "../Dashboard/DashboardSidebarComponent";
import { DashboardUpdateProfile } from './DashboardUpdataProfile';
import { DashboardPublicProfile } from "../DashboardPublicProfile/DashboardPublicProfile";
import NotFoundPage from "../../Basic/NotFoundPage";
import DashboardHelpCenter from "./HelpCenter";
import MyApplications from "../MyApplications/MyApplications";


export default function DashboardSettings(): JSX.Element {
  const [page, setPage] = useState<PageKey>("dashboard"); // default

  function renderPage(p: PageKey) {
    switch (p) {
      case "dashboard":
        return <div className="text-lg p-4">Dashboard</div>;

      case "settings":
        return <DashboardUpdateProfile />;

      case "publicProfile":
        return <DashboardPublicProfile />;

      case "applications":
        return <MyApplications/>

      case "help":
        return < DashboardHelpCenter/>

      default:
        return <NotFoundPage/>;
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar with page control */}
      <DashboardSidebarComponent active={page} onNavigate={setPage} />

      {/* Main content */}
      <main className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">{renderPage(page)}</div>
      </main>
    </div>
  );
}
