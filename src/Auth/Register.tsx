/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const colors = {
    primaryBlue: "#304F9C",
    lightBlue: "#E6EFFF",
    coral: "#FF7F6B",
    teal: "#20B2AA",
    gold: "#FFD700",
    darkText: "#212529",
    grayText: "#6C757D",
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = (e: any) => {
    e.preventDefault();
    console.log("Signup submitted:", { name, email, password });
  };

  const navigate = useNavigate();

  return (
    <div className="max-w-md w-full h-screen space-y-8 bg-[#E6EFFF] p-[30px] rounded-[20px] ">
      <div className="text-center">
        <h2
          className="text-3xl font-bold "
          style={{ color: colors.primaryBlue }}
        >
          Create an account
        </h2>
        <p className="mt-2" style={{ color: colors.grayText }}>
          Start managing your investments in minutes
        </p>
      </div>

      <div className="mt-8 space-y-6">
        <div className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium"
              style={{ color: colors.darkText }}
            >
              Full Name
            </label>
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 p-3 w-full border rounded-lg"
              style={{ borderColor: colors.grayText }}
              placeholder="John Doe"
            />
          </div>

          <div>
            <label
              htmlFor="signup-email"
              className="block text-sm font-medium"
              style={{ color: colors.darkText }}
            >
              Email Address
            </label>
            <input
              id="signup-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-3 w-full border rounded-lg"
              style={{ borderColor: colors.grayText }}
              placeholder="name@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="signup-password"
              className="block text-sm font-medium"
              style={{ color: colors.darkText }}
            >
              Password
            </label>
            <input
              id="signup-password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-3 w-full border rounded-lg"
              style={{ borderColor: colors.grayText }}
              placeholder="Create a strong password"
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium"
              style={{ color: colors.darkText }}
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 p-3 w-full border rounded-lg"
              style={{ borderColor: colors.grayText }}
              placeholder="Confirm your password"
            />
          </div>
        </div>

        <div>
          <button
            type="button"
            onClick={handleSignup}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white font-medium"
            style={{ backgroundColor: colors.primaryBlue }}
          >
            Create Account
          </button>
        </div>
      </div>

      <div className="mt-4 text-center">
        <p style={{ color: colors.grayText }}>
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/auth/login")}
            className="font-medium hover:underline"
            style={{ color: colors.primaryBlue }}
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
