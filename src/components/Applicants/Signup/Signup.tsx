import { useState } from "react";
import JobSeekerForm from "./JobSeekerForm";
import CompanyForm from "./CompanyForm";

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

      <div className="flex-1 flex justify-center items-start">
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

          <h2 className="text-4xl font-bold w-full whitespace-nowrap text-center">
            Get more opportunities
          </h2>

          <button
            className="w-full border border-gray-300 py-3 flex items-center justify-center gap-3 text-gray-700 hover:bg-gray-50"
          >
            <img src="/images/google.png" className="w-5 h-5" alt="Google" />
            Sign Up with Google
          </button>

          <div className="flex items-center w-full gap-2">
            <div className="flex-1 h-px bg-gray-300" />
            <span className="text-gray-500 text-sm">Or sign up with email</span>
            <div className="flex-1 h-px bg-gray-300" />
          </div>

          {activeTab === "jobseeker" ? <JobSeekerForm /> : <CompanyForm />}

          <p className="text-gray-600 text-sm text-center">
            Already have an account?{" "}
            <a className="font-semibold text-[#4640DE] cursor-pointer">Login</a>
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
