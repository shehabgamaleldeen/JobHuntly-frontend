import DashboardSidebarRecruiterComponent from "../Dashboard/DashboardSidebarRecruiterComponent";
import ApplicantsTable from "./ApplicantsTable";

export default function ApplicantsPage() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white">
        <DashboardSidebarRecruiterComponent />
      <div className="flex-1 w-full px-4 py-6 md:px-6 md:py-8 lg:px-8 lg:py-8 overflow-x-auto">
        <div className="mb-6">
          <h2 className="font-bold text-[#25324B] text-2xl">Applicants</h2>
        </div>

        <div className="w-full">
          <ApplicantsTable />
        </div>
      </div>
      </div>
  );
}


