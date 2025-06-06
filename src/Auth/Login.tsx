/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { userdata, userToken } from "../Function/Slice";
import { useDispatch } from "react-redux";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { ImSpinner9 } from "react-icons/im";

const Login = () => {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setshowPassword] = useState(false);
  const data = { userName, password };
  const url = "https://express-profit.vercel.app/login";
  const Nav = useNavigate();
  const dispatch = useDispatch();

  const HandleShowPassword = () => {
    setshowPassword(!showPassword);
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    if (!userName || !password) {
      toast.error("Please input all fields");
      return;
    }
    const toastLoadingId = toast.loading("Please wait...");
    setLoading(true);
    try {
      const response = await axios.post(url, data);
      toast.success(response.data.message, { duration: 2000 });
      localStorage.setItem("token", response.data.token);

      if (response.data.userType === "admin") {
        toast.success("Welcome Admin", { duration: 2000 });
        setTimeout(() => {
          Nav("/admin/testing");
        }, 1000);
      } else {
        toast.success(response.data.message, { duration: 2000 });
        setTimeout(() => {
          Nav("/user/overview");
        }, 2000);
      }
      dispatch(userdata(response.data.data));
      dispatch(userToken(response.data.token));
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const errorMsg =
          error.response?.data?.message || "An unexpected error occurred";
        toast.error(errorMsg, { duration: 3000 });
      } else {
        toast.error("Error occurred");
      }
    } finally {
      setLoading(false);
      toast.dismiss(toastLoadingId);
    }
  };

  const colors = {
    primaryBlue: "#304F9C",
    lightBlue: "#E6EFFF",
    coral: "#FF7F6B",
    teal: "#20B2AA",
    gold: "#FFD700",
    darkText: "#212529",
    grayText: "#6C757D",
  };

  const navigate = useNavigate();

  return (
    <div className="max-w-md w-full h-max space-y-8 bg-[#E6EFFF] p-[30px] rounded-[20px]">
      <div className="text-center">
        <h2
          className="text-3xl font-bold"
          style={{ color: colors.primaryBlue }}
        >
          Welcome back
        </h2>
        <p className="mt-2" style={{ color: colors.grayText }}>
          Sign in to access your investment dashboard
        </p>
      </div>

      <div className="mt-8 space-y-6">
        <div className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium"
              style={{ color: colors.darkText }}
            >
              UserName
            </label>
            <input
              id="text"
              type="text"
              required
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="mt-1 p-3 w-full border rounded-lg"
              style={{ borderColor: colors.grayText }}
              placeholder="username"
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
                type={showPassword ? "text" : "password"}
                className="p-3 w-full border rounded-lg pr-10"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
                style={{ borderColor: colors.grayText }}
                placeholder="Create a strong password"
              />
              <div
                className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-500"
                onClick={HandleShowPassword}
              >
                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              type="checkbox"
              className="h-4 w-4"
              style={{ accentColor: colors.primaryBlue }}
            />
            <label
              htmlFor="remember-me"
              className="ml-2 block text-sm"
              style={{ color: colors.grayText }}
            >
              Remember me
            </label>
          </div>

          <div className="text-sm">
            <button
              type="button"
              className="font-medium hover:underline"
              style={{ color: colors.primaryBlue }}
            >
              Forgot password?
            </button>
          </div>
        </div>

        <div>
          <button
            type="button"
            disabled={loading}
            onClick={handleLogin}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white font-medium"
            style={{ backgroundColor: colors.primaryBlue }}
          >
            {loading ? <ImSpinner9 className="animate-spin" /> : "Login"}
          </button>
        </div>
      </div>

      <div className="mt-4 text-center">
        <p style={{ color: colors.grayText }}>
          Don't have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/auth/register")}
            className="font-medium hover:underline"
            style={{ color: colors.primaryBlue }}
          >
            Sign up
          </button>
        </p>
      </div>

      <div className="">
        {/* <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t" style={{ borderColor: '#E5E7EB' }}></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2" style={{ backgroundColor: colors.lightBlue, color: colors.grayText }}>
              Or continue with
            </span>
          </div>
        </div> */}

        {/* <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            type="button"
            className="w-full flex items-center justify-center px-4 py-2 border rounded-lg shadow-sm text-sm font-medium"
            style={{ borderColor: colors.grayText, color: colors.darkText }}
          >
            <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Google
          </button>
          <button
            type="button"
            className="w-full flex items-center justify-center px-4 py-2 border rounded-lg shadow-sm text-sm font-medium"
            style={{ borderColor: colors.grayText, color: colors.darkText }}
          >
            <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0014.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z"/>
            </svg>
            Facebook
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default Login;
