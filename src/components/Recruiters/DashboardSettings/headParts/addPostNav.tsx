import { Link } from "react-router-dom";

interface CompanyHeaderProps {
  logo: string;
  companyName: string;
  buttonText?: string;
  buttonLink?: string;
}

export function CompanyHeader({
  logo,
  companyName,
  buttonText = "Post a job",
  buttonLink = "/company/job-create"
}: CompanyHeaderProps) {
  return (
    <header className="w-full bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">

        <div className="
          flex flex-col sm:flex-row 
          sm:items-center 
          justify-between 
          gap-4
        ">
          
          {/* LEFT: Logo + Company Name */}
          <div className="flex items-center gap-3">
            <img 
              src={logo} 
              className="w-12 h-12 rounded-md object-cover" 
              alt="Company Logo" 
            />

            <div className="leading-tight">
              <span className="block text-lg font-semibold text-slate-900">
                {companyName}
              </span>
            </div>
          </div>

          {/* RIGHT: Button stays on right on desktop */}
          <div className="sm:ml-auto">
            <Link
              to={buttonLink}
              className="
                inline-flex items-center justify-center 
                w-40 
                px-4 py-2 
                bg-[#4640DE] text-white 
                rounded-md text-md font-medium 
                hover:opacity-90 transition
              "
            >
              {buttonText}
            </Link>
          </div>

        </div>

      </div>
    </header>
  );
}
