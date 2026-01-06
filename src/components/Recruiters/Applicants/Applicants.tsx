import { ArrowLeft } from "lucide-react";
import { Outlet, useNavigate } from "react-router-dom";

export default function ApplicantsPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="flex-1 w-full px-4 py-6 md:px-6 md:py-8 lg:px-8 lg:py-8 overflow-x-auto">
        <div className="w-full max-w-[1104px] mx-auto">

          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 mb-4 text-[#4640DE] hover:underline"
          >
            <ArrowLeft size={18} />
            <span className="text-sm font-medium">Back to Job Listings</span>
          </button>

          {/* Child Route (Table or Profile) */}
          <Outlet />
        </div>
      </div>
    </div>
  );
}