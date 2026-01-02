import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  emailValidation,
  passwordValidation,
} from "../../../features/auth/authValidation";
import instance from "@/components/AxiosConfig/instance";
import axios from "axios";

type JobSeekerLoginForm = {
  email: string;
  password: string;
};
type Props = {
  rememberMe: boolean;
};

export default function JobSeekerLogin({ rememberMe }: Props) {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<JobSeekerLoginForm>();

  async function onSubmit(data: JobSeekerLoginForm) {
    try {
      setErrorMsg("");

      const response = await instance.post("/auth/login", {
        email: data.email,
        password: data.password,
      });

      const { accessToken, refreshToken, user } = response.data.data;

      if (!accessToken || !refreshToken) {
        setErrorMsg("Login failed: tokens not returned");
        return;
      }

      if (user.role !== "JOB_SEEKER") {
        setErrorMsg("You are not authorized to login as a company");
        return;
      }

      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      sessionStorage.removeItem("accessToken");
      sessionStorage.removeItem("refreshToken");

      const storage = rememberMe ? localStorage : sessionStorage;

      storage.setItem("accessToken", accessToken);
      storage.setItem("refreshToken", refreshToken);

      navigate("/find-jobs");
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        setErrorMsg(err.response.data.message);
      } else {
        setErrorMsg("Invalid email or password");
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <input
        type="email"
        placeholder="Enter email address"
        {...register("email", emailValidation)}
        autoComplete="username"
        className={`border p-3 ${
          errors.email ? "border-red-500" : "border-gray-300"
        }`}
      />
      {errors.email && (
        <p className="text-red-500 text-sm">{String(errors.email.message)}</p>
      )}

      <div className="relative">
        <input
          type={showPassword ? "text" : "password"} 
          placeholder="Enter password"
          {...register("password", passwordValidation)}
          autoComplete="new-password"
          className={`border p-3 w-full ${
            errors.password ? "border-red-500" : "border-gray-300"
          }`}
        />
        
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 hover:text-gray-700"
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>

      {errors.password && (
        <p className="text-red-500 text-sm">
          {String(errors.password.message)}
        </p>
      )}

      {errorMsg && (
        <p className="text-red-600 text-sm text-center">{errorMsg}</p>
      )}

      <button type="submit" className="bg-[#4640DE] text-white py-3">
        Login
      </button>
    </form>
  );
}
