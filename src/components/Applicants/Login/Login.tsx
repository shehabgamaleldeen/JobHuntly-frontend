import { useState } from "react";
import { Link } from "react-router-dom";
import JobSeekerLogin from "./JobSeekerLogin";
import CompanyLogin from "./CompanyLogin";

function Login() {
  const [selected, setSelected] = useState<"job" | "company">("job");

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white overflow-x-hidden;
">

      <div className="w-full lg:w-[634px] h-[400px] lg:h-[850px] bg-gray-100">
        <img src="/images/login.png"
             className="w-full h-full object-cover" />
      </div>

      <div className="flex-1 flex justify-center items-start">
        <div className="w-[408px] pt-[63px] flex flex-col gap-6">

          <div className="flex justify-center gap-6">
            <button
              className={`px-4 py-1 rounded-md font-semibold ${
                selected === "job"
                  ? "text-[#4640DE] bg-[#E9EBFD]"
                  : "text-gray-600"
              }`}
              onClick={() => setSelected("job")}
            >
              Job Seeker
            </button>

            <button
              className={`px-4 py-1 rounded-md font-semibold ${
                selected === "company"
                  ? "text-[#4640DE] bg-[#E9EBFD]"
                  : "text-gray-600"
              }`}
              onClick={() => setSelected("company")}
            >
              Company
            </button>
          </div>

         <h2 className="text-4xl font-bold w-full whitespace-nowrap text-center
">
            {selected === "job" ? "Welcome Back, Dude" : "Welcome Back"}
          </h2>

          <button
            className="w-full border border-gray-300 py-3 flex items-center
                       justify-center gap-3 text-gray-700 hover:bg-gray-50"
          >
            <img src="/images/google.png" className="w-5 h-5" />
            Login with Google
          </button>

          <div className="flex items-center w-full gap-2">
            <div className="flex-1 h-px bg-gray-300" />
            <span className="text-gray-500 text-sm">Or login with email</span>
            <div className="flex-1 h-px bg-gray-300" />
          </div>

          {selected === "job" ? <JobSeekerLogin /> : <CompanyLogin />}

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm text-gray-600">
              <input type="checkbox" className="w-4 h-4" />
              Remember Me
            </label>

            <button className="text-sm text-[#4640DE] font-medium hover:underline">
              Forgot Password?
            </button>
          </div>

          <p className="text-gray-600 text-sm text-center">
            Don't have an account?{" "}
            <Link to="/signup" className="font-semibold text-[#4640DE]">
              Sign Up
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}
export default Login;