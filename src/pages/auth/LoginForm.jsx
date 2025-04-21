import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaUnlock, FaCircleCheck } from "react-icons/fa6";
import { IoMdEyeOff, IoMdInformationCircle } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import SignUpForm from "./SignUpForm";
import ForgotPassword from "./ForgotPassword";
import axios from "axios";

export default function LoginForm({ ToggleForm, handleisForgot }) {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [loginIdError, setLoginIdError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoginFailed, setIsLoginFailed] = useState(false);
  const [isPassVisible, setIsPassVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignup] = useState(false);
  const [isForgot, setIsForgot] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const navigate = useNavigate();

  const validateLoginId = (e) => {
    const value = e.target.value;
    setLoginId(value);
    setLoginIdError(
      value
        ? value.length < 4
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
        message: "Password must be at least 8 characters.",
        isError: true,
        isSuccess: false,
      };
    if (!hasNumber)
      return {
        message: "Password must contain a number.",
        isError: true,
        isSuccess: false,
      };
    if (!hasSymbol)
      return {
        message: "Password must contain a symbol (!@#$%&*).",
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
        "http://192.168.0.226:8082/login",
        data,
        {
          headers: { "Content-Type": "application/json" },
        },
      );

      if (response.status === 200) {
        setShowSuccessModal(true);
        setTimeout(() => {
          setShowSuccessModal(false);
          navigate("/home");
        }, 1500);
      } else {
        setIsLoginFailed(true);
      }
    } catch (error) {
      setIsLoginFailed(true);
      console.error("Login failed", error);
      if (error.response) {
        console.error("Error response:", error.response.data);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isSignUp ? (
        <SignUpForm ToggleForm={ToggleForm} />
      ) : isForgot ? (
        <ForgotPassword handleisForgot={handleisForgot} />
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
              <button
                className="font-semibold text-blue-700 hover:underline"
                onClick={() => setIsForgot(true)}
              >
                Forgot Password?
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
              onClick={() => setIsSignup(true)}
              className="font-bold text-[#004B91] underline"
            >
              Sign Up
            </button>
          </p>
        </form>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="insert-0 fixed left-1/3 top-0 z-50 mt-4 items-center justify-center bg-opacity-50">
          <div className="flex w-[500px] justify-center rounded-2xl border border-green-400 bg-green-100 py-6 text-center text-sm font-medium text-green-700">
            <div className="flex items-center justify-center gap-2">
              <FaCircleCheck className="text-lg text-green-500" />
              <span>Login Successful!! Redirecting to Home page...</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
