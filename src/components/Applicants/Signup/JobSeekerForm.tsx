import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  usernameValidation,
  emailValidation,
  passwordValidation,
  confirmPasswordValidation,
} from "../../../features/auth/authValidation";
import instance from '@/components/AxiosConfig/instance'
import { useState } from "react";
import axios from "axios";


type JobSeekerSignupForm = {
  fullName: string;
  email: string;
  password: string;
  rePassword: string;
};

function JobSeekerForm() {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState<string>("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<JobSeekerSignupForm>({});

  const password = watch("password");

  const onSubmit = async (data: JobSeekerSignupForm) => {
    try {
      setErrorMsg("");

      const res = await instance.post("/auth/register", {
        fullName: data.fullName,
        email: data.email,
        password: data.password,
        rePassword: data.rePassword,
        role: "JOB_SEEKER",
      });

      const { accessToken, refreshToken , user } = res.data.data;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem('role', user.role)
      localStorage.setItem("isPremium", String(res.data.data.user.isPremium));

      navigate("/Dashboard/settings");
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
      {/* Full Name */}
      <div>
        <label className="text-base font-epilogue text-[#515B6F] font-semibold block mb-1">
          User name
        </label>
        <input
          type="text"
          placeholder="Enter your full name"
          className={`w-full border px-4 py-3 outline-none focus:ring-2 focus:ring-purple-300
            ${errors.fullName ? "border-red-600" : "border-gray-300"}`}
          {...register("fullName", usernameValidation)}
          autoComplete="off"
        />
        {errors.fullName && (
          <p className="text-red-600 text-sm">{errors.fullName.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="text-base font-epilogue text-[#515B6F] font-semibold block mb-1">
          Email Address
        </label>
        <input
          type="email"
          placeholder="Enter email address"
          className={`w-full border px-4 py-3 outline-none focus:ring-2 focus:ring-purple-300
            ${errors.email ? "border-red-600" : "border-gray-300"}`}
          {...register("email", emailValidation)}
          autoComplete="username"
        />
        {errors.email && (
          <p className="text-red-600 text-sm">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <div>
        <label className="text-base font-epilogue text-[#515B6F] font-semibold block mb-1">
          Password
        </label>
        <input
          type="password"
          placeholder="Enter password"
          className={`w-full border px-4 py-3 outline-none focus:ring-2 focus:ring-purple-300
            ${errors.password ? "border-red-600" : "border-gray-300"}`}
          {...register("password", passwordValidation)}
          autoComplete="new-password"
        />
        {errors.password && (
          <p className="text-red-600 text-sm">{errors.password.message}</p>
        )}
      </div>

      {/* Confirm Password */}
      <div>
        <label className="text-base font-epilogue text-[#515B6F] font-semibold block mb-1">
          Confirm Password
        </label>
        <input
          type="password"
          placeholder="Confirm password"
          className={`w-full border px-4 py-3 outline-none focus:ring-2 focus:ring-purple-300
            ${errors.rePassword ? "border-red-600" : "border-gray-300"}`}
          {...register("rePassword", confirmPasswordValidation(password))}
        />
        {errors.rePassword && (
          <p className="text-red-600 text-sm">{errors.rePassword.message}</p>
        )}
      </div>
      {errorMsg && (
        <p className="text-red-600 text-sm text-center">{errorMsg}</p>
      )}
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

export default JobSeekerForm;
