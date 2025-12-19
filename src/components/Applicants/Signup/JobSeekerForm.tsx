import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  usernameValidation,
  emailValidation,
  passwordValidation,
  confirmPasswordValidation,
} from "../../../features/auth/authValidation";

type JobSeekerSignupForm = {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

function JobSeekerForm() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<JobSeekerSignupForm>();

  const password = watch("password");

 const onSubmit = async (data: JobSeekerSignupForm) => {
  try {
    const response = await fetch("http://localhost:3000/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        userName: data.userName, 
        email: data.email, 
        password: data.password, 
        confirmPassword: data.confirmPassword,
        role: "user", // Pass role
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Registration failed");
    }

    console.log(result);
    navigate("/find-jobs");
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error("An unexpected error occurred");
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
            ${errors.userName ? "border-red-600" : "border-gray-300"}`}
          {...register("userName", usernameValidation)}
        />
        {errors.userName && (
          <p className="text-red-600 text-sm">{errors.userName.message}</p>
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
            ${errors.confirmPassword ? "border-red-600" : "border-gray-300"}`}
          {...register("confirmPassword", confirmPasswordValidation(password))}
        />
        {errors.confirmPassword && (
          <p className="text-red-600 text-sm">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

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
