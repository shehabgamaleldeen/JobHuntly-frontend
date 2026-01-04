import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import instance from '@/components/AxiosConfig/instance'

export default function ResetPassword() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const token = params.get("token");

  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await instance.post("/auth/reset-password", {
        token,
        newPassword: password,
      });

      setMessage("Password updated successfully");
      setTimeout(() => navigate("/login"), 2000);
    } catch {
      setMessage("Reset failed");
    }
  };

  if (!token) {
    return <p className="text-center mt-10">Invalid reset link</p>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <form onSubmit={handleSubmit} className="w-[400px] space-y-4">
        <h2 className="text-2xl font-bold text-center">Reset Password</h2>

        <input
          type="password"
          placeholder="New password"
          className="border p-3 w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="bg-[#4640DE] text-white w-full py-3">
          Reset Password
        </button>

        {message && (
          <p className="text-center text-sm text-gray-600">{message}</p>
        )}
      </form>
    </div>
  );
}
