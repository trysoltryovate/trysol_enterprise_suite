import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { FaLock } from "react-icons/fa";
import { IoEye } from "react-icons/io5";
import { FaCircleCheck } from "react-icons/fa6";
import { IoMdEyeOff, IoMdInformationCircle } from "react-icons/io";
import { IoIosMail } from "react-icons/io";
import { FaUnlock } from "react-icons/fa6";

export default function ForgotPassword() {
  const navigate = useNavigate(); //  for redirect

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isPassVisible, setIsPassVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoginFailed, setIsLoginFailed] = useState(false);

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

    if (!email || !password || !confirmPassword) {
      setMessage("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    // If all is valid: Show alert and redirect
    alert("Password updated successfully!");
    navigate("/"); //  Redirect to login page
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-gray-200 to-indigo-500 p-4">
      <div className="w-full max-w-md rounded-lg p-6 shadow-lg">
        <h2 className="mb-4 text-center text-xl font-semibold text-gray-800">
          Forgot Password
        </h2>

        <form
          onSubmit={handleSubmit}
          className="lg:w-1/3.5 mb-6 min-h-[74vh] content-center rounded-3xl rounded-lg bg-white p-8 shadow-md shadow-gray-800 lg:mt-0"
        >
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
              className={`border-0 border-b-2 pl-8 ${
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
                className={`border-0 border-b-2 pl-8 ${
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
          <div className="relative mb-4">
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
              className={`border-0 border-b-2 pl-8 ${
                confirmPassword.length === 0
                  ? "border-gray-400"
                  : confirmPassword === password
                    ? "border-green-500 focus-visible:ring-green-100"
                    : "border-red-500 focus-visible:ring-red-100"
              } ring-offset-background placeholder:text-muted-foreground my-1 flex h-9 w-full rounded-md bg-transparent px-3 py-2 text-base font-medium opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 md:text-sm`}
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

          {/* Submit */}
          <button
            type="submit"
            className="w-full rounded bg-blue-600 py-2 text-white hover:bg-blue-700"
          >
            Update Password
          </button>
        </form>

        {message && (
          <p className="mt-3 text-center text-sm font-medium text-red-600">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
