import JobListTable from "./JobListTable";

export default function JobListPage() {
  return (
    <div className="flex min-h-screen bg-white">
      <div className="w-[272px] min-h-full bg-gray-50">Side bar</div>
      <div className="flex-1 w-full px-4 py-6 md:px-6 md:py-8 lg:px-8 lg:py-8">
        <div className="mb-6">
          <h2 className="font-bold text-[#25324B] text-2xl">Job Listings</h2>
        </div>

        <div className="w-full max-w-[1104px] mx-auto">
          <JobListTable />
        </div>
      </div>
    </div>
  );
}


