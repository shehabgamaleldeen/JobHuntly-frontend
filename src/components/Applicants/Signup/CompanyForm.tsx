import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { companyNameValidation, emailValidation, passwordValidation, confirmPasswordValidation } from "../../../features/auth/authValidation";
import instance from '@/components/AxiosConfig/instance'
import axios from "axios";
import { useState } from "react";

type CompanySignupForm = {
  fullName: string;
  email: string;
  password: string;
  rePassword: string;
};

function CompanyForm() {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState<string>("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CompanySignupForm>();

  const password = watch("password");

  const onSubmit = async (data: CompanySignupForm) => {
    try {
      setErrorMsg("");

      const response = await instance.post("/auth/register", {
        ...data,
        role: "COMPANY",
      });

      const { accessToken, refreshToken } = response.data.data;

      if (!accessToken || !refreshToken) {
        setErrorMsg("Registration failed. Please try again.");
        return;
      }

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      navigate("/DashboardRecruiterSettings");
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        setErrorMsg(err.response.data.message);
      } else {
        setErrorMsg("please try again");
      }
    }
  };


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Company Name */}
      <div>
        <label className="text-base font-epilogue text-[#515B6F] font-semibold block mb-1">Company Name</label>
        <input
          type="text"
          placeholder="Enter your company name"
          className={`w-full border px-4 py-3 outline-none focus:ring-2 focus:ring-purple-300
            ${errors.fullName ? "border-red-600" : "border-gray-300"}`}
          {...register("fullName", companyNameValidation)}
          autoComplete="off"
        />
        {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
      </div>

      {/* Email */}
      <div>
        <label className="text-base font-epilogue text-[#515B6F] font-semibold block mb-1">Email Address</label>
        <input
          type="email"
          placeholder="Enter email address"
          className={`w-full border px-4 py-3 outline-none focus:ring-2 focus:ring-purple-300
            ${errors.email ? "border-red-600" : "border-gray-300"}`}
          {...register("email", emailValidation)}
          autoComplete="username"
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
      </div>

      {/* Password */}
      <div>
        <label className="text-base font-epilogue text-[#515B6F] font-semibold block mb-1">Password</label>
        <input
          type="password"
          placeholder="Enter password"
          className={`w-full border px-4 py-3 outline-none focus:ring-2 focus:ring-purple-300
            ${errors.password ? "border-red-600" : "border-gray-300"}`}
          {...register("password", passwordValidation)}
          autoComplete="new-password"
        />
        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
      </div>

      {/* Confirm Password */}
      <div>
        <label className="text-base font-epilogue text-[#515B6F] font-semibold block mb-1">Confirm Password</label>
        <input
          type="password"
          placeholder="Confirm password"
          className={`w-full border px-4 py-3 outline-none focus:ring-2 focus:ring-purple-300
            ${errors.rePassword ? "border-red-600" : "border-gray-300"}`}
          {...register("rePassword", confirmPasswordValidation(password))}
        />
        {errors.rePassword && <p className="text-red-500 text-sm mt-1">{errors.rePassword.message}</p>}
      </div>

        {errorMsg && <p className="text-red-600 text-sm text-center">{errorMsg}</p>}

      <button
        type="submit"
        className="w-full bg-[#4640DE] text-white py-3
                   transition duration-300 ease-in-out hover:scale-[1.01]"
      >
        Continue
      </button>
    </form>
  );
}

export default CompanyForm;
