import ApplicantsTable from "./ApplicantsTable";

export default function ApplicantsPage() {
  return (
    <div className="flex min-h-screen bg-white">
        <div className="w-full max-w-[1104px] mx-auto">
          <ApplicantsTable />
        </div>
      </div>
  );
}
