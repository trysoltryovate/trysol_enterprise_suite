import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { FaLock } from "react-icons/fa";
import { IoEye } from "react-icons/io5";
import { FaCircleCheck } from "react-icons/fa6";
import { IoMdEyeOff, IoMdInformationCircle } from "react-icons/io";
import { IoIosMail } from "react-icons/io";
import { FaUnlock } from "react-icons/fa6";
import LoginForm from "./LoginForm";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isPassVisible, setIsPassVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoginFailed, setIsLoginFailed] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);

  const validateEmail = (e) => {
    const value = e.target.value;
    setEmail(value);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (value.trim() === "") {
      setEmailError("Email is required");
    } else if (!emailRegex.test(value)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("Email is correct");
    }
  };

  const validatePassword = (value) => {
    if (value.trim() === "") {
      return {
        isError: true,
        isSuccess: false,
        message: "Password is required",
      };
    } else if (value.length < 6) {
      return {
        isError: true,
        isSuccess: false,
        message: "Password must be at least 6 characters",
      };
    } else {
      return {
        isError: false,
        isSuccess: true,
        message: "Password is valid",
      };
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(email);
    const passwordValidation = validatePassword(password);
    const doPasswordsMatch = password === confirmPassword;

    if (!email || !password || !confirmPassword) {
      setMessage("Please fill in all fields.");
      return;
    }

    if (!isEmailValid) {
      setMessage("Please enter a valid email.");
      return;
    }

    if (passwordValidation.isError) {
      setMessage(passwordValidation.message);
      return;
    }

    if (!doPasswordsMatch) {
      setMessage("Passwords do not match.");
      return;
    }

    setIsSuccess(true);
    setMessage("");
    setShowSuccessModal(true);

    // After 2 seconds, hide modal and show login form
    setTimeout(() => {
      setShowSuccessModal(false);
      setShowLoginForm(true);
    }, 1000);
  };

  if (showLoginForm) {
    return <LoginForm />;
  }

  return (
    <div className="w-full max-w-md rounded-lg p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-3xl bg-white bg-opacity-80 p-6 shadow-md shadow-gray-800 md:p-10"
      >
        <h2 className="mb-10 text-center text-xl font-semibold text-gray-800">
          Forgot Password
        </h2>

        {/* Email */}
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Email
        </label>
        <div className="relative mb-3">
          {email.trim() === "" && (
            <IoIosMail className="pointer-events-none absolute left-2 top-3.5 text-gray-600" />
          )}
          <input
            id="email"
            type="email"
            value={email}
            onChange={validateEmail}
            placeholder="example@email.com"
            className={`border-0 border-b-2 py-5 pl-8 ${
              emailError === ""
                ? "border-gray-400"
                : emailError.includes("correct")
                  ? "border-green-500 focus-visible:ring-green-100"
                  : "border-red-500 focus-visible:ring-red-100"
            } ring-offset-background placeholder:text-muted-foreground my-1 flex h-9 w-full rounded-md bg-transparent px-3 py-2 text-base font-medium opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 md:text-sm`}
          />
          {emailError && !emailError.includes("correct") && (
            <p className="mt-1 text-sm text-red-500">{emailError}</p>
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
                const value = e.target.value;
                setPassword(value);
                const validation = validatePassword(value);
                setPasswordError(validation.message);
                setIsSuccess(validation.isSuccess);
              }}
              className={`border-0 border-b-2 py-2 pl-8 ${
                password.length === 0
                  ? "border-gray-400"
                  : isSuccess && !isLoginFailed
                    ? "border-green-500 focus-visible:ring-green-100"
                    : "border-red-500 focus-visible:ring-red-100"
              } ring-offset-background placeholder:text-muted-foreground my-1 flex h-9 w-full rounded-md bg-transparent px-3 py-2 text-base font-medium opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 md:text-sm`}
              placeholder="Enter password"
            />
            <button
              type="button"
              className="absolute right-2 top-2 rounded-md border border-transparent px-2 py-1 text-gray-400 hover:border-gray-100 hover:bg-gray-100 hover:text-gray-700"
              onClick={() => setIsPassVisible(!isPassVisible)}
            >
              {isPassVisible ? <IoMdEyeOff /> : <IoEye />}
            </button>
            <p
              className={`inline-flex items-center gap-x-1 text-[12px] font-semibold ${
                isSuccess ? "text-green-600" : "text-red-500"
              } ${passwordError ? "opacity-100" : "opacity-0"}`}
            >
              {isSuccess ? <FaCircleCheck /> : <IoMdInformationCircle />}{" "}
              {passwordError}
            </p>
          </div>
        </div>

        {/* Confirm Password */}
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Confirm Password
        </label>
        <div className="relative mb-3">
          {confirmPassword.trim() === "" ? (
            <FaLock className="pointer-events-none absolute left-2 top-3.5 text-gray-500" />
          ) : confirmPassword === password ? (
            <FaUnlock className="pointer-events-none absolute left-2 top-3.5 text-green-600" />
          ) : (
            <FaLock className="pointer-events-none absolute left-2 top-3.5 text-red-500" />
          )}
          <input
            type={isPassVisible ? "text" : "password"}
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm password"
            className={`border-0 border-b-2 py-6 pl-8 ${
              confirmPassword.length === 0
                ? "border-gray-400"
                : confirmPassword === password
                  ? "border-green-500 focus-visible:ring-green-100"
                  : "border-red-500 focus-visible:ring-red-100"
            } ring-offset-background placeholder:text-muted-foreground my-1 flex h-10 w-full rounded-md bg-transparent px-3 text-base font-medium opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 md:text-sm`}
          />
          <p
            className={`text-sm font-semibold ${
              confirmPassword.length > 0 && confirmPassword !== password
                ? "text-red-500"
                : "text-green-600"
            }`}
          >
            {confirmPassword.length > 0 &&
              (confirmPassword === password
                ? "Passwords match"
                : "Passwords do not match")}
          </p>
          <button
            type="button"
            className="absolute right-2 top-2 rounded-md border border-transparent px-2 py-1 text-gray-400 hover:border-gray-100 hover:bg-gray-100 hover:text-gray-700"
            onClick={() => setIsPassVisible(!isPassVisible)}
          >
            {isPassVisible ? <IoMdEyeOff /> : <IoEye />}
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full rounded-2xl bg-blue-500 py-2 text-white hover:bg-blue-600"
        >
          Reset Password
        </button>
      </form>

      {message && (
        <p className="mt-3 text-center text-sm font-medium text-red-600">
          {message}
        </p>
      )}

      {/* Success Modal */}

      {showSuccessModal && (
        <div className="insert-0 fixed left-1/3 top-0 z-50 mt-4 items-center justify-center bg-opacity-50">
          <div className="flex w-[500px] justify-center rounded-2xl border border-green-400 bg-green-100 py-6 text-center text-sm font-medium text-green-700">
            <div className="flex items-center justify-center gap-2">
              <FaCircleCheck className="text-lg text-green-500" />
              <span>
                Password Reset Successful! Redirecting to login page...
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
