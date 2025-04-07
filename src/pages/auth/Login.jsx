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
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const navigate = useNavigate();

  const ToggleForm = () => {
    setIsSignup((prevState) => !prevState);
  };

  const validateLoginId = (e) => {
    setLoginId(e.target.value);
    setLoginIdError(
      e.target.value
        ? e.target.value.length < 4
          ? `At least 4 characters needed`
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
    e.preventDefault(); // Prevent default form submission
    setIsLoginFailed(false);
    setIsLoading(true); // Set loading state

    if (!loginId || !password) {
      setIsLoginFailed(true);
      setIsLoading(false); // Reset loading state
      return;
    }

    const data = { username: loginId, password: password };

    try {
      const response = await axios.post(
        "http://192.168.0.224:8082/login",
        data,
        {
          headers: { "Content-Type": "application/json" },
        },
      );

      console.log("Response:", response);

      if (response.status === 200) {
        console.log("Login successful:", response.data);
        navigate("/home"); // Redirect to Home page
      } else {
        console.error("Unexpected response status:", response.status);
        setIsLoginFailed(true);
      }
    } catch (error) {
      setIsLoginFailed(true);
      console.error("Login failed", error);
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-amber-600 bg-gradient-to-b from-gray-200 to-indigo-500">
      {/* Header */}
      <Navbar />

      {/* Main Content */}
      <div className="max-w-16xl flex w-full flex-col items-center justify-center gap-[60px] lg:flex-row">
        {/* Left Section - About */}
        <div className="lg:w -1/2 w-[680px] justify-center lg:text-left">
          <p className="text-sm font-medium leading-relaxed text-gray-800 md:text-lg">
            Leading software company Trysol Global Services has 13+ years of
            experience delivering CMM Level 3 and ISO-certified IT solutions in
            Hyderabad. Specializing in custom software, enterprise solutions,
            cybersecurity, cloud & DevOps, and AI-driven analytics, Trysol
            transforms business challenges into seamless operations.
          </p>
          <p className="mt-4 text-sm font-medium leading-relaxed text-gray-800 md:text-lg">
            Trusted by Fortune 500 companies and startups alike, Trysol is
            committed to innovation, quality, and customer success, building
            long-term industry relationships.
          </p>

          <div
            id="certificates"
            className="mt-8 flex min-h-[20%] items-center justify-evenly rounded-2xl bg-[#bbbde4] bg-white bg-opacity-40 py-[30px] shadow-lg md:min-h-[30%]"
          >
            <img
              src={ISO}
              className="h-[80px] w-[80px] rounded-xl shadow-md shadow-gray-800 transition duration-300 hover:scale-110 hover:shadow-2xl md:h-[100px] md:w-[100px] xl:h-[150px] xl:w-[150px]"
            />
            <img
              src={CMMI}
              className="h-[80px] w-[80px] rounded-xl shadow-md shadow-gray-800 transition duration-300 hover:scale-110 hover:shadow-2xl md:h-[100px] md:w-[100px] xl:h-[150px] xl:w-[150px]"
            />
            <img
              src={ISONUMBER}
              className="h-[80px] w-[80px] rounded-xl shadow-md shadow-gray-800 transition duration-300 hover:scale-110 hover:shadow-2xl md:h-[100px] md:w-[100px] xl:h-[150px] xl:w-[150px]"
            />
          </div>
        </div>

        {/* Right Section - Login Form */}
        {isSignUp ? (
          <SignUpForm />
        ) : (
          <form
            onSubmit={handleLogin}
            className="lg:w-1/3.5 mb-6 min-h-[74vh] content-center rounded-3xl rounded-lg bg-white bg-opacity-80 p-8 shadow-md shadow-gray-800 lg:mt-0"
          >
            <h2 className="mb-8 text-center text-xl font-bold text-gray-900">
              Login
            </h2>
            {/* Login ID */}
            <div className="mb-3 flex flex-col gap-y-1">
              <label
                htmlFor="loginId"
                className="ml-1 w-max text-sm font-semibold opacity-80"
              >
                Login ID
              </label>
              <div className="relative">
                {loginId.trim() === "" && (
                  <FaUser className="pointer-events-none absolute left-2 top-3.5 text-gray-500" />
                )}
                <input
                  id="loginId"
                  value={loginId}
                  onChange={(e) => validateLoginId(e)}
                  type="text"
                  placeholder="Enter user ID"
                  className={`border-0 border-b-2 pl-8 ${
                    loginId.length < 4
                      ? "border-gray-400"
                      : loginIdError.includes("correct") && !isLoginFailed
                        ? "border-green-500 focus-visible:ring-green-100"
                        : "border-red-500 focus-visible:ring-red-100"
                  } ring-offset-background placeholder:text-muted-foreground my-1 flex h-9 w-full rounded-md bg-transparent px-3 py-2 text-base font-medium opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm`}
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
            <div className="mb-3 flex flex-col gap-y-1">
              <label
                htmlFor="password"
                className="ml-1 w-max text-sm font-semibold opacity-80"
              >
                Password
              </label>
              <div className="relative">
                <div className="relative">
                  {password.trim() === "" ? (
                    <FaLock className="pointer-events-none absolute left-2 top-3.5 text-gray-500" />
                  ) : isSuccess ? (
                    <FaUnlock className="pointer-events-none absolute left-2 top-3.5 text-gray-600" />
                  ) : (
                    <FaLock className="pointer-events-none absolute left-2 top-3.5 text-red-500" />
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
                    className={`border-0 border-b-2 pl-8 ${
                      password.length === 0
                        ? "border-gray-400"
                        : isSuccess && !isLoginFailed
                          ? "focus-visible:ring-green- 100 border-green-500"
                          : "border-red-500 focus-visible:ring-red-100"
                    } ring-offset-background placeholder:text-muted-foreground my-1 flex h-9 w-full rounded-md bg-transparent px-3 py-2 text-base font-medium opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm`}
                    placeholder="Enter password"
                  />
                  <div className="text-right">
                    <Link
                      to="/forgot-password"
                      className="text-sm font-semibold text-blue-700 hover:underline"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                  <button
                    type="button"
                    className="absolute right-2 top-2 rounded-md border border-transparent px-2 py-1 text-gray-400 outline-1 hover:cursor-pointer hover:border-gray-100 hover:bg-gray-100 hover:text-gray-700"
                    onClick={() => setIsPassVisible(!isPassVisible)}
                  >
                    {isPassVisible ? <IoMdEyeOff /> : <IoEye />}
                  </button>
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
            </div>

            {isLoginFailed && (
              <p className="mt-2 text-sm text-red-500">
                Invalid credentials, please try again.
              </p>
            )}
            <button
              type="submit"
              className="w-full rounded-2xl bg-blue-500 py-1 text-white hover:bg-blue-600"
            >
              {isLoading ? "Loading..." : "Login"}
            </button>
            <p className="opacity-120 font-sm mt-1 text-[15px]">
              Don't have an Account, please
              <span className="text-[#004B91]">
                <button
                  className="ml-1 font-bold underline"
                  onClick={ToggleForm}
                >
                  Sign Up
                </button>
              </span>
            </p>
          </form>
        )}
      </div>

      <Link to="/home" className="mt-6 text-lg text-white hover:underline">
        Go to Home
      </Link>
    </div>
  );
}
