import { useState } from "react";
import JobSeekerForm from "./JobSeekerForm";
import CompanyForm from "./CompanyForm";
import { Link } from "react-router-dom";

function Signup() {
  const [activeTab, setActiveTab] = useState<"jobseeker" | "company">(
    "jobseeker");

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white overflow-x-hidden">

      <div className="w-full lg:w-[634px] h-[400px] lg:h-[850px] bg-gray-100">
        <img
          src="/images/login.png"
          alt="Signup visual"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1 flex justify-center items-start pb-5">
        <div className="w-[408px] pt-[63px] flex flex-col gap-6">

          <div className="flex justify-center gap-6">
            <button
              onClick={() => setActiveTab("jobseeker")}
              className={`px-4 py-1 rounded-md font-semibold ${
                activeTab === "jobseeker" 
                  ? "text-[#4640DE] bg-[#E9EBFD]" 
                  : "text-gray-600"
              }`}
            >
              Job Seeker
            </button>

            <button
              onClick={() => setActiveTab("company")}
              className={`px-4 py-1 rounded-md font-semibold ${
                activeTab === "company" 
                  ? "text-[#4640DE] bg-[#E9EBFD]" 
                  : "text-gray-600"
              }`}
            >
              Company
            </button>
          </div>

          <h2 className="text-4xl font-bold w-full whitespace-nowrap text-center overflow-hidden">
            Get more opportunities
          </h2>

          {activeTab === "jobseeker" ? <JobSeekerForm /> : <CompanyForm />}

          <p className="text-gray-600 text-sm text-center">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-[#4640DE] cursor-pointer">
              Login
            </Link>
          </p>

          <p className="text-xs text-gray-500 leading-5 text-center">
            By clicking 'Continue', you acknowledge that you have read and
            accept the{" "}
            <span className="text-sm text-[#4640DE]">Terms of Service</span> and{" "}
            <span className="text-sm text-[#4640DE]">Privacy Policy.</span>
          </p>
        </div>
      </div>
    </div>
  );
}
export default Signup;
