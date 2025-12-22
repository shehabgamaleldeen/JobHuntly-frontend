import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  emailValidation,
  passwordValidation,
} from "../../../features/auth/authValidation";

type CompanyLoginForm = {
  email: string;
  password: string;
};

export default function CompanyLogin() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CompanyLoginForm>();

  async function onSubmit(data:CompanyLoginForm) {
  try {
    const response = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Login failed");
    }

    console.log("Logged in user:", result.user);

  navigate("/company");
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error("Unexpected login error");
    }
  }
}


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <input
        type="email"
        placeholder="Enter company email"
        {...register("email", emailValidation)}
        className={`border p-3 ${
          errors.email ? "border-red-500" : "border-gray-300"
        }`}
      />
      {errors.email && (
        <p className="text-red-500 text-sm">
          {String(errors.email.message)}
        </p>
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
        <p className="text-red-500 text-sm">
          {String(errors.password.message)}
        </p>
      )}

      <button type="submit" className="bg-[#4640DE] text-white py-3">
        Login
      </button>
    </form>
  );
}
