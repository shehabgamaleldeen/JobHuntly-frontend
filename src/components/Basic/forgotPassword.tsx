import { useState } from "react";
import instance from '@/components/AxiosConfig/instance'

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      await instance.post("/auth/forgot-password", { email });
      setMessage("If this email exists, a reset link was sent.");
    } catch {
      setMessage( "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <form onSubmit={handleSubmit} className="w-[400px] space-y-4">
        <h2 className="text-2xl font-bold text-center">Forgot Password</h2>

        <input
          type="email"
          placeholder="Enter your email"
          className="border p-3 w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button
          disabled={loading}
          className="bg-[#4640DE] text-white w-full py-3"
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>

        {message && (
          <p className="text-center text-sm text-gray-600">{message}</p>
        )}
      </form>
    </div>
  );
}
