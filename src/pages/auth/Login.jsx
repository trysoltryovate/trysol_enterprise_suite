import { Link } from "react-router-dom";
import { useState } from "react";
import { FaCircleCheck } from "react-icons/fa6";
import { IoMdEyeOff, IoMdInformationCircle } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import CMMI from "../../assets/cmmi.png";
import ISO from "../../assets/iso.png";
import ISONUMBER from "../../assets/iso2700.png";
import Navbar from "../../components/Navbar";
import SignUpForm from "./SignUpForm";

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
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-gray-200 to-indigo-500 p-4">
      {/* Header */}
      <Navbar />

      {/* Main Content */}
      <div className="max-w-10xl flex w-full flex-col items-center justify-center gap-[60px] lg:flex-row">
        {/* Left Section - About */}
        <div className="w-full justify-center lg:w-1/2 lg:text-left">
          <p className="text-lg font-medium leading-relaxed text-gray-800">
            Leading software company Trysol Global Services has 13+ years of
            experience delivering CMM Level 3 and ISO-certified IT solutions in
            Hyderabad. Specializing in custom software, enterprise solutions,
            cybersecurity, cloud & DevOps, and AI-driven analytics, Trysol
            transforms business challenges into seamless operations.
          </p>
          <p className="mt-4 text-lg font-medium leading-relaxed text-gray-800">
            Trusted by Fortune 500 companies and startups alike, Trysol is
            committed to innovation, quality, and customer success, building
            long-term industry relationships.
          </p>

          <div
            id="certificates"
            className="mt-16 flex min-h-[20%] items-center justify-evenly rounded-2xl bg-[#bbbde4] py-[35px] md:min-h-[30%]"
          >
            <img
              src={ISO}
              className="h-[80px] w-[80px] rounded-xl md:h-[100px] md:w-[100px] xl:h-[150px] xl:w-[150px]"
            />
            <img
              src={CMMI}
              className="h-[80px] w-[80px] rounded-xl md:h-[100px] md:w-[100px] xl:h-[150px] xl:w-[150px]"
            />
            <img
              src={ISONUMBER}
              className="h-[80px] w-[80px] rounded-xl md:h-[100px] md:w-[100px] xl:h-[150px] xl:w-[150px]"
            />
          </div>
        </div>

        {/* Right Section - Login Form */}
        {isSignUp ? (
          <SignUpForm />
        ) : (
          <form className="mt-6 min-h-[74vh] content-center rounded-lg bg-white bg-opacity-40 p-8 shadow-md lg:mt-0 lg:w-1/3">
            <h2 className="mb-4 text-center text-xl font-semibold text-gray-900">
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
              <input
                id="loginId"
                value={loginId}
                onChange={(e) => validateLoginId(e)}
                type="text"
                placeholder="Enter user ID"
                // className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                className={`border ${
                  loginId.length < 4
                    ? "border-gray-400"
                    : loginIdError.includes("correct") && !isLoginFailed
                      ? "border-green-500 focus-visible:ring-green-100"
                      : "border-red-500 focus-visible:ring-red-100"
                } bg-background ring-offset-background placeholder:text-muted-foreground my-1 flex h-9 w-full rounded-md px-3 py-2 text-base font-medium opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm`}
              />
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
                //className="block font-medium text-gray-700"
                className="ml-1 w-max text-sm font-semibold opacity-80"
              >
                Password
              </label>
              <div className="relative">
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
                  className={`border ${
                    password.length === 0
                      ? "border-gray-400"
                      : isSuccess && !isLoginFailed
                        ? "border-green-500 focus-visible:ring-green-100"
                        : "border-red-500 focus-visible:ring-red-100"
                  } bg-background ring-offset-background placeholder:text-muted-foreground my-1 flex h-9 w-full rounded-md px-3 py-2 text-base font-medium opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm`}
                  placeholder="Enter password"
                  // className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
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
            <button className="mt-2 w-full rounded-lg bg-blue-500 py-2 text-white hover:bg-blue-600">
              Login
            </button>
            <p className="mt-1 text-sm font-medium opacity-80">
              Don't have an Account, please
              <span className="text-blue-500 underline">
                <button className="ml-1" onClick={ToggleForm}>
                  Sign Up
                </button>
              </span>
            </p>
          </form>
        )}
        {/* <LoginForm/> */}
      </div>

      <Link to="/home" className="mt-6 text-lg text-white hover:underline">
        Go to Home
      </Link>
    </div>
  );
}
