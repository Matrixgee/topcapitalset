/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal } from "antd";
import axios from "axios";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { ImSpinner9 } from "react-icons/im";
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

  const [fullName, setfullName] = useState<string>("");
  const [userName, setuserName] = useState<string>("");
  const [email, setemail] = useState<string>("");
  const [password, setpassword] = useState<string>("");
  const [confirmPassword, setconfirmPassword] = useState<string>("");
  const [ShowPassword, setShowPassword] = useState<boolean>(false);
  const [ShowConfirmpassword, setShowConfirmpassword] =
    useState<boolean>(false);
  const [loading, setloading] = useState<boolean>(false);
  const [ShowModal, setShowModal] = useState<boolean>(false);

  const data = { fullName, userName, password, email, confirmPassword };
  const url = "https://express-profit.onrender.com/signup";

  const Nav = useNavigate();

  const HandleShowPassword = () => {
    setShowPassword(!ShowPassword);
  };
  const HandleConfirmPassword = () => {
    setShowConfirmpassword(!ShowConfirmpassword);
  };

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();

    const passwordRegex =
      /^(?=.*[a-zA-Z0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$/;
    const isValidPassword = passwordRegex.test(password);

    if (!fullName || !userName || !password || !email || !confirmPassword) {
      toast.error("Please fill all the fields");
    } else if (confirmPassword !== password) {
      toast.error("Passwords do not match");
    } else if (!isValidPassword) {
      toast.error("Password must contain at least one special character");
    } else {
      const toastLoadingId = toast.loading("Please wait...");
      try {
        setloading(true);
        const response = await axios.post(url, data);
        toast.success(response.data.message);
        setShowModal(true);
        setfullName("");
        setuserName("");
        setemail("");
        setpassword("");
        setconfirmPassword("");
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          const errorMsg =
            error.response?.data?.error || "An unexpected error occurred";
          toast.error(errorMsg, { duration: 3000 });
        } else {
          toast.error("Error occurred");
        }
      } finally {
        setloading(false);
        toast.dismiss(toastLoadingId);
      }
    }
  };

  return (
    <div className="max-w-md w-full h-max space-y-8 bg-[#E6EFFF] p-[30px] rounded-[20px] ">
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
              value={fullName}
              onChange={(e) => setfullName(e.target.value)}
              className="mt-1 p-3 w-full border rounded-lg"
              style={{ borderColor: colors.grayText }}
              placeholder="John Doe"
            />
          </div>

          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium"
              style={{ color: colors.darkText }}
            >
              User Name
            </label>
            <input
              id="name"
              type="text"
              required
              value={userName}
              onChange={(e) => setuserName(e.target.value)}
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
              onChange={(e) => setemail(e.target.value)}
              className="mt-1 p-3 w-full border rounded-lg"
              style={{ borderColor: colors.grayText }}
              placeholder="name@example.com"
            />
          </div>

          <div className="mt-4">
            <label
              htmlFor="signup-password"
              className="block text-sm font-medium"
              style={{ color: colors.darkText }}
            >
              Password
            </label>
            <div className="relative mt-1">
              <input
                id="signup-password"
                type={ShowPassword ? "text" : "password"}
                className="p-3 w-full border rounded-lg pr-10"
                onChange={(e) => setpassword(e.target.value)}
                value={password}
                required
                style={{ borderColor: colors.grayText }}
                placeholder="Create a strong password"
              />
              <div
                className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-500"
                onClick={HandleShowPassword}
              >
                {ShowPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </div>
            </div>
          </div>

          <div className="mt-4">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium"
              style={{ color: colors.darkText }}
            >
              Confirm Password
            </label>
            <div className="relative mt-1">
              <input
                id="confirmPassword"
                type={ShowConfirmpassword ? "text" : "password"}
                required
                value={confirmPassword}
                onChange={(e) => setconfirmPassword(e.target.value)}
                className="p-3 w-full border rounded-lg pr-10"
                style={{ borderColor: colors.grayText }}
                placeholder="Confirm your password"
              />
              <div
                className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-500"
                onClick={HandleConfirmPassword}
              >
                {ShowConfirmpassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </div>
            </div>
          </div>
        </div>

        <div>
          <button
            type="button"
            disabled={loading}
            onClick={handleRegister}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white font-medium"
            style={{ backgroundColor: colors.primaryBlue }}
          >
            {loading ? <ImSpinner9 className="animate-spin" /> : "Register"}
          </button>
        </div>
      </div>

      <div className="mt-4 text-center">
        <p style={{ color: colors.grayText }}>
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => Nav("/auth/login")}
            className="font-medium hover:underline"
            style={{ color: colors.primaryBlue }}
          >
            Login
          </button>
        </p>
      </div>
      <Modal
        title="Registration Successful"
        open={ShowModal}
        onOk={() => setShowModal(false)}
        onCancel={() => setShowModal(false)}
      >
        <p>
          Your account has been registered successfully. Please check your email
          for verification.
        </p>
      </Modal>
    </div>
  );
};

export default Register;
