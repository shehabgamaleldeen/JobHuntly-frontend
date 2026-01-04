import { useState } from "react";
import { Link } from "react-router-dom";
import JobSeekerLogin from "./JobSeekerLogin";
import CompanyLogin from "./CompanyLogin";
import { useNavigate } from "react-router-dom";

function Login() {
  const [selected, setSelected] = useState<"job" | "company">("job");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate=useNavigate();

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white overflow-x-hidden">
      <div className="w-full lg:w-[634px] h-[400px] lg:h-[850px] bg-gray-100">
        <img src="/images/login.png" className="w-full h-full object-cover" />
      </div>

      <div className="flex-1 flex justify-center items-start pb-5">
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

          <h2 className="text-4xl font-bold w-full whitespace-nowrap text-center overflow-hidden">
            {selected === "job" ? "Welcome Back, Dude" : "Welcome Back"}
          </h2>

          {selected === "job" ? (
            <JobSeekerLogin rememberMe={rememberMe} />
          ) : (
            <CompanyLogin rememberMe={rememberMe} />
          )}

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm text-gray-600">
              <input
                type="checkbox"
                className="w-4 h-4"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Remember Me
            </label>

            <button
              type="button"
              onClick={() => navigate("/forgot-password")}
              className="text-sm text-[#4640DE] font-medium hover:underline"
            >
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
