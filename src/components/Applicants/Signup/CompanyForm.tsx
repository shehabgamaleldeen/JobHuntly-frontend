import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { companyNameValidation, emailValidation, passwordValidation, confirmPasswordValidation } from "../../../features/auth/authValidation";

type CompanySignupForm = {
  companyName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

function CompanyForm() {
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors } } = useForm<CompanySignupForm>();
  const password = watch("password");

 const onSubmit = async (data: CompanySignupForm) => {
  try {
    const response = await fetch("http://localhost:3000/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, role: "company" }), // Pass role here
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Registration failed");
    }

    console.log(result);
    navigate("/company");
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
      {/* Company Name */}
      <div>
        <label className="text-base font-epilogue text-[#515B6F] font-semibold block mb-1">Company Name</label>
        <input
          type="text"
          placeholder="Enter your company name"
          className={`w-full border px-4 py-3 outline-none focus:ring-2 focus:ring-purple-300
            ${errors.companyName ? "border-red-600" : "border-gray-300"}`}
          {...register("companyName", companyNameValidation)}
        />
        {errors.companyName && <p className="text-red-500 text-sm mt-1">{errors.companyName.message}</p>}
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
            ${errors.confirmPassword ? "border-red-600" : "border-gray-300"}`}
          {...register("confirmPassword", confirmPasswordValidation(password))}
        />
        {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
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

export default CompanyForm;
