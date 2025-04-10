/* eslint-disable simple-import-sort/imports */
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaCircleCheck } from "react-icons/fa6";
import { IoMdEyeOff, IoMdInformationCircle } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import CMMI from "../../assets/cmmi.png";
import ISO from "../../assets/iso.png";
import ISONUMBER from "../../assets/iso2700.png";
import Navbar from "../../components/Navbar";
import SignUpForm from "./SignUpForm";
import axios from "axios";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { FaUnlock } from "react-icons/fa6";

export default function Login() {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [loginIdError, setLoginIdError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSignUp, setIsSignup] = useState(false);
  const [isLoginFailed, setIsLoginFailed] = useState(false);
  const [isPassVisible, setIsPassVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const ToggleForm = () => {
    setIsSignup((prev) => !prev);
  };

  const validateLoginId = (e) => {
    setLoginId(e.target.value);
    setLoginIdError(
      e.target.value
        ? e.target.value.length < 4
          ? "At least 4 characters needed"
          : "Login ID is correct."
        : "Login ID is required!",
    );
  };

  const validatePassword = (value) => {
    const minLength = value.length >= 8;
    const hasNumber = /[0-9]/.test(value);
    const hasSymbol = /[!@#$%&*]/.test(value);

    if (!value)
      return {
        message: "Password is required!",
        isError: true,
        isSuccess: false,
      };
    if (!minLength)
      return {
        message: "Password must be at least 8 characters long.",
        isError: true,
        isSuccess: false,
      };
    if (!hasNumber)
      return {
        message: "Password must contain at least one number 0 - 9.",
        isError: true,
        isSuccess: false,
      };
    if (!hasSymbol)
      return {
        message: "Password must contain at least one symbol eg. !@#$%&*",
        isError: true,
        isSuccess: false,
      };
    return {
      message: "Your password meets requirements.",
      isError: false,
      isSuccess: true,
    };
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoginFailed(false);
    setIsLoading(true);

    if (!loginId || !password) {
      setIsLoginFailed(true);
      setIsLoading(false);
      return;
    }

    const data = { username: loginId, password };

    try {
      const response = await axios.post(
        "http://192.168.0.225:8082/login",
        data,
        {
          headers: { "Content-Type": "application/json" },
        },
      );

      if (response.status === 200) {
        navigate("/home");
      } else {
        setIsLoginFailed(true);
      }
    } catch (error) {
      setIsLoginFailed(true);
      console.error("Login failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-200 to-indigo-500">
      <Navbar />

      <div className="flex flex-col items-center justify-center gap-10 px-4 py-9 lg:flex-row lg:gap-20 lg:px-20">
        {/* About Section */}
        <div className="w-full max-w-3xl text-center lg:text-left">
          <p className="text-sm font-semibold leading-relaxed text-gray-800 md:text-lg">
            Leading software company Trysol Global Services has 13+ years of
            experience delivering CMM Level 3 and ISO-certified IT solutions in
            Hyderabad. Specializing in custom software, enterprise solutions,
            cybersecurity, cloud & DevOps, and AI-driven analytics, Trysol
            transforms business challenges into seamless operations.
          </p>
          <p className="mt-8 text-sm font-semibold leading-relaxed text-gray-800 md:text-lg">
            Trusted by Fortune 500 companies and startups alike, Trysol is
            committed to innovation, quality, and customer success, building
            long-term industry relationships.
          </p>

          <div
            id="certificates"
            className="mt-10 flex min-h-[35%] items-center justify-evenly rounded-2xl bg-[#bbbde4] bg-white bg-opacity-40 py-[30px] shadow-lg md:min-h-[30%]"
          >
            <img
              src={ISO}
              className="h-[80px] w-[80px] rounded-xl shadow-md shadow-gray-800 transition duration-300 hover:scale-110 hover:shadow-2xl md:h-[100px] md:w-[100px] xl:h-[170px] xl:w-[170px]"
            />
            <img
              src={CMMI}
              className="h-[80px] w-[80px] rounded-xl shadow-md shadow-gray-800 transition duration-300 hover:scale-110 hover:shadow-2xl md:h-[100px] md:w-[100px] xl:h-[170px] xl:w-[170px]"
            />
            <img
              src={ISONUMBER}
              className="h-[80px] w-[80px] rounded-xl shadow-md shadow-gray-800 transition duration-300 hover:scale-110 hover:shadow-2xl md:h-[100px] md:w-[100px] xl:h-[170px] xl:w-[170px]"
            />
          </div>
        </div>

        {/* Login / Signup Section */}
        {isSignUp ? (
          <SignUpForm />
        ) : (
          <form
            onSubmit={handleLogin}
            className="w-full max-w-sm rounded-3xl bg-white bg-opacity-80 p-6 shadow-md shadow-gray-800 md:p-10"
          >
            <h2 className="mb-6 text-center text-xl font-bold text-gray-900">
              Login
            </h2>

            {/* Login ID */}
            <div className="mb-4">
              <label
                htmlFor="loginId"
                className="mb-1 block text-sm font-semibold opacity-80"
              >
                Login ID
              </label>
              <div className="relative">
                {!loginId && (
                  <FaUser className="absolute left-2 top-3.5 text-gray-500" />
                )}
                <input
                  id="loginId"
                  value={loginId}
                  onChange={validateLoginId}
                  type="text"
                  placeholder="Enter user ID"
                  className={`w-full rounded-md border-0 border-b-2 bg-transparent px-3 py-2 pl-8 text-base font-medium opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                    loginId.length < 4
                      ? "border-gray-400"
                      : loginIdError.includes("correct") && !isLoginFailed
                        ? "border-green-500 focus-visible:ring-green-100"
                        : "border-red-500 focus-visible:ring-red-100"
                  }`}
                />
              </div>

              {!isLoginFailed && (
                <p
                  className={`inline-flex items-center gap-x-1 text-[12px] font-semibold ${
                    loginId
                      ? loginId.length >= 4
                        ? "text-green-600"
                        : "text-red-500"
                      : "text-red-500"
                  } ${loginIdError ? "opacity-100" : "opacity-0"}`}
                >
                  {isSuccess ? <FaCircleCheck /> : <IoMdInformationCircle />}{" "}
                  {loginIdError}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="mb-4">
              <label
                htmlFor="password"
                className="mb-1 block text-sm font-semibold opacity-80"
              >
                Password
              </label>
              <div className="relative">
                {password ? (
                  isSuccess ? (
                    <FaUnlock className="absolute left-2 top-3.5 text-gray-600" />
                  ) : (
                    <FaLock className="absolute left-2 top-3.5 text-red-500" />
                  )
                ) : (
                  <FaLock className="absolute left-2 top-3.5 text-gray-500" />
                )}

                <input
                  type={isPassVisible ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    const validation = validatePassword(e.target.value);
                    setPasswordError(validation.message);
                    setIsError(validation.isError);
                    setIsSuccess(validation.isSuccess);
                  }}
                  placeholder="Enter password"
                  className={`w-full rounded-md border-0 border-b-2 bg-transparent px-3 py-2 pl-8 text-base font-medium opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                    isSuccess && !isLoginFailed
                      ? "border-green-500 focus-visible:ring-green-100"
                      : password.length > 0
                        ? "border-red-500 focus-visible:ring-red-100"
                        : "border-gray-400"
                  }`}
                />
                <button
                  type="button"
                  className="absolute right-2 top-2 text-gray-400 hover:text-gray-700"
                  onClick={() => setIsPassVisible(!isPassVisible)}
                >
                  {isPassVisible ? <IoMdEyeOff /> : <IoEye />}
                </button>
              </div>
              <div className="mt-1 text-right text-sm">
                <Link
                  to="/forgot-password"
                  className="font-semibold text-blue-700 hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>

              {!isLoginFailed && (
                <p
                  className={`inline-flex items-center gap-x-1 text-[12px] font-semibold ${
                    isSuccess ? "text-green-600" : "text-red-500"
                  } ${passwordError ? "opacity-100" : "opacity-0"} `}
                >
                  {isSuccess ? <FaCircleCheck /> : <IoMdInformationCircle />}{" "}
                  {passwordError}
                </p>
              )}
            </div>

            {/* Error */}
            {isLoginFailed && (
              <p className="mb-4 text-sm text-red-500">
                Invalid credentials, please try again.
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="w-full rounded-2xl bg-blue-500 py-2 text-white hover:bg-blue-600"
            >
              {isLoading ? "Loading..." : "Login"}
            </button>

            {/* Toggle Form */}
            <p className="mt-4 text-center text-sm">
              Don't have an account?{" "}
              <button
                onClick={ToggleForm}
                className="font-bold text-[#004B91] underline"
              >
                Sign Up
              </button>
            </p>
          </form>
        )}
      </div>

      <div className="mt-10 text-center">
        <Link to="/home" className="text-lg text-white hover:underline">
          Go to Home
        </Link>
      </div>
    </div>
  );
}
