import { ArrowLeft } from "lucide-react";
import { Outlet, useNavigate ,useParams} from "react-router-dom";

export default function ApplicantsPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  console.log( id );

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="flex-1 w-full px-4 py-6 md:px-6 md:py-8 lg:px-8 lg:py-8 overflow-x-auto">
        <div className="w-full max-w-[1104px] mx-auto">

          {/* Actions */}
         <div className="flex items-center justify-between mb-6">
           {/* Back Button (Left) */}
           <button
             onClick={() => navigate(-1)}
             className="flex items-center gap-2 text-[#4640DE] hover:underline"
           >
             <ArrowLeft size={18} />
             <span className="text-sm font-medium">Back to Job Listings</span>
           </button>
         
         
           {/* Job Details Button (Right) */}
           {/* <button
             onClick={() =>
               navigate(`/DashboardRecruiter/job-listing/job-details/${id}`)
             }
             className="px-4 py-2 border bg-[#4640DE] text-white rounded-md
                        text-sm font-medium hover:bg-[#645fec] transition"
              // disabled={!id}
           >
             Job Details
           </button> */}
         </div>


          {/* Child Route (Table or Profile) */}
          <Outlet />
        </div>
      </div>
    </div>
  );
}