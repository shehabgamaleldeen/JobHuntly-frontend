import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  emailValidation,
  passwordValidation,
} from "../../../features/auth/authValidation";

type JobSeekerLoginForm = {
  email: string;
  password: string;
};

export default function JobSeekerLogin() {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState<string>(""); // for backend errors

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<JobSeekerLoginForm>();

  async function onSubmit(data: JobSeekerLoginForm) {
    try {
      setErrorMsg(""); // reset previous error
      console.log("submitted data", data);

      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email, password: data.password }),
      });

      const result = await response.json();

      if (!response.ok) {
        // display error message returned from backend
        setErrorMsg(result.error || "Login failed");
        return;
      }

      console.log("Logged in user:", result.user);
      navigate("/find-jobs");
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Unexpected login error");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <input
        type="email"
        placeholder="Enter email address"
        {...register("email", emailValidation)}
        className={`border p-3 ${
          errors.email ? "border-red-500" : "border-gray-300"
        }`}
      />
      {errors.email && (
        <p className="text-red-500 text-sm">{String(errors.email.message)}</p>
      )}

      <input
        type="password"
        placeholder="Enter password"
        {...register("password", passwordValidation)}
        className={`border p-3 ${
          errors.password ? "border-red-500" : "border-gray-300"
        }`}
      />
      {errors.password && (
        <p className="text-red-500 text-sm">{String(errors.password.message)}</p>
      )}

      {/* Backend error message */}
      {errorMsg && <p className="text-red-600 text-sm text-center">{errorMsg}</p>}

      <button type="submit" className="bg-[#4640DE] text-white py-3">
        Login
      </button>
    </form>
  );
}

