import { useState } from "react";
import axios from "axios";
import { IoMdEyeOff, IoMdInformationCircle } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import { FaUser, FaPhone } from "react-icons/fa6";
import { FaCircleCheck } from "react-icons/fa6";
import LoginForm from "./LoginForm";

export default function SignUpForm() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const [isPassVisible, setIsPassVisible] = useState(false);
  const [isConfirmPassVisible, setIsConfirmPassVisible] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [isSignupSuccess, setIsSignupSuccess] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const validateUsername = (value) => {
    const isValid = /^[A-Za-z\s]{2,50}$/.test(value);
    return isValid
      ? { message: "", isError: false }
      : {
          message: "Enter a valid username (only letters, 2-50 chars).",
          isError: true,
        };
  };

  const validateEmail = (value) => {
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    return isValid
      ? { message: "", isError: false }
      : { message: "Enter a valid email address.", isError: true };
  };

  const validateMobile = (value) => {
    const isValid = /^\d{10,}$/.test(value);
    return isValid
      ? { message: "", isError: false }
      : { message: "Mobile number must be at least 10 digits.", isError: true };
  };

  const validatePassword = (value) => {
    const minLength = value.length >= 8;
    const hasNumber = /[0-9]/.test(value);
    const hasSymbol = /[!@#$%&*]/.test(value);

    if (!value) return { message: "Password is required!", isError: true };
    if (!minLength)
      return {
        message: "Password must be at least 8 characters long.",
        isError: true,
      };
    if (!hasNumber)
      return {
        message: "Password must contain at least one number 0 - 9.",
        isError: true,
      };
    if (!hasSymbol)
      return {
        message: "Password must contain at least one symbol eg. !@#$%&*",
        isError: true,
      };

    return { message: "Your password meets requirements.", isError: false };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "username") {
      const validation = validateUsername(value);
      setUsernameError(validation.message);
    }

    if (name === "email") {
      const validation = validateEmail(value);
      setEmailError(validation.message);
    }

    if (name === "mobile") {
      const validation = validateMobile(value);
      setMobileError(validation.message);
    }

    if (name === "password") {
      const validation = validatePassword(value);
      setPasswordError(validation.message);
    }

    if (name === "confirmPassword") {
      setConfirmPasswordError(
        value !== formData.password ? "Passwords do not match" : "",
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const usernameValidation = validateUsername(formData.username);
    const emailValidation = validateEmail(formData.email);
    const mobileValidation = validateMobile(formData.mobile);
    const passwordValidation = validatePassword(formData.password);
    const passwordsMatch = formData.password === formData.confirmPassword;

    setUsernameError(usernameValidation.message);
    setEmailError(emailValidation.message);
    setMobileError(mobileValidation.message);
    setPasswordError(passwordValidation.message);
    setConfirmPasswordError(passwordsMatch ? "" : "Passwords do not match");

    if (
      usernameValidation.isError ||
      emailValidation.isError ||
      mobileValidation.isError ||
      passwordValidation.isError ||
      !passwordsMatch
    ) {
      return;
    }

    try {
      const response = await axios.post(
        "http://192.168.0.224:8082/signup",
        formData,
      );

      if (response.status === 200) {
        setFormData({
          username: "",
          email: "",
          mobile: "",
          password: "",
          confirmPassword: "",
        });
        setIsSignupSuccess(true);
        setTimeout(() => {
          setIsSignupSuccess(false);
          setShowLogin(true);
        }, 3000);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error connecting to server.");
    }
  };

  if (showLogin) return <LoginForm />;

  const iconComponents = {
    username: <FaUser />,
    email: <IoMdInformationCircle />,
    mobile: <FaPhone />,
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="scrollbar-hide mt-6 max-h-[70vh] w-full max-w-sm content-center overflow-auto rounded-3xl bg-white bg-opacity-40 p-8 shadow-md lg:mt-0 lg:w-1/3"
      >
        <h2 className="mb-4 text-center text-xl font-semibold text-gray-900">
          Sign Up
        </h2>

        {["username", "email", "mobile"].map((field) => (
          <div key={field} className="mb-3 flex flex-col gap-y-1">
            <label className="ml-1 w-max text-sm font-semibold opacity-80">
              {field === "username"
                ? "Username"
                : field === "email"
                  ? "Email"
                  : "Mobile No"}
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-lg text-gray-400">
                {iconComponents[field]}
              </span>
              <input
                type={
                  field === "email"
                    ? "email"
                    : field === "mobile"
                      ? "tel"
                      : "text"
                }
                name={field}
                value={formData[field]}
                onChange={handleChange}
                placeholder={`Enter your ${field}`}
                className={`border-0 border-b-2 pl-9 ${
                  formData[field].length === 0
                    ? "border-gray-400"
                    : field === "email"
                      ? !validateEmail(formData[field]).isError
                        ? "border-green-500"
                        : "border-red-500"
                      : field === "mobile"
                        ? !validateMobile(formData[field]).isError
                          ? "border-green-500"
                          : "border-red-500"
                        : !validateUsername(formData[field]).isError
                          ? "border-green-500"
                          : "border-red-500"
                } bg-background my-1 flex h-9 w-full rounded-md px-3 py-2 text-base font-medium opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 md:text-sm`}
              />
            </div>
            <p
              className={`text-[12px] font-semibold ${
                (field === "username" && usernameError) ||
                (field === "email" && emailError) ||
                (field === "mobile" && mobileError)
                  ? "text-red-500 opacity-100"
                  : "text-green-700 opacity-0"
              }`}
            >
              {field === "username"
                ? usernameError
                : field === "email"
                  ? emailError
                  : mobileError}
            </p>
          </div>
        ))}

        {["password", "confirmPassword"].map((field) => (
          <div key={field} className="mb-3 flex flex-col gap-y-1">
            <label className="ml-1 w-max text-sm font-semibold opacity-80">
              {field === "password" ? "Password" : "Confirm Password"}
            </label>
            <div className="relative">
              <input
                type={
                  (field === "password" ? isPassVisible : isConfirmPassVisible)
                    ? "text"
                    : "password"
                }
                name={field}
                value={formData[field]}
                onChange={handleChange}
                placeholder={
                  field === "password" ? "Enter password" : "Confirm password"
                }
                className={`border ${
                  field === "password"
                    ? formData.password.length === 0
                      ? "border-gray-400"
                      : !validatePassword(formData.password).isError
                        ? "border-green-500"
                        : "border-red-500"
                    : formData.confirmPassword.length === 0
                      ? "border-gray-400"
                      : formData.confirmPassword === formData.password
                        ? "border-green-500"
                        : "border-red-500"
                } bg-background ring-offset-background placeholder:text-muted-foreground my-1 flex h-9 w-full rounded-md px-3 py-2 text-base font-medium opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 md:text-sm`}
              />
              <button
                type="button"
                className="absolute right-2 top-2 rounded-md px-2 py-1 text-gray-800 hover:text-gray-700"
                onClick={() =>
                  field === "password"
                    ? setIsPassVisible(!isPassVisible)
                    : setIsConfirmPassVisible(!isConfirmPassVisible)
                }
              >
                {field === "password" ? (
                  isPassVisible ? (
                    <IoMdEyeOff />
                  ) : (
                    <IoEye />
                  )
                ) : isConfirmPassVisible ? (
                  <IoMdEyeOff />
                ) : (
                  <IoEye />
                )}
              </button>
            </div>
            <p
              className={`text-[12px] font-semibold ${
                field === "password"
                  ? passwordError &&
                    !validatePassword(formData.password).isError
                    ? "text-green-700"
                    : "text-red-500"
                  : formData.confirmPassword === formData.password
                    ? "text-green-700"
                    : "text-red-500"
              }`}
            >
              {field === "password"
                ? passwordError
                : formData.confirmPassword.length === 0
                  ? ""
                  : confirmPasswordError}
            </p>
          </div>
        ))}

        <button
          type="submit"
          className="mt-2 w-full rounded-lg bg-blue-500 py-2 text-white hover:bg-blue-600"
        >
          Sign Up
        </button>

        <p className="opacity-120 mt-1 text-[15px] font-semibold">
          Already have an account?
          <span className="text-[#004B91]">
            <button
              type="button"
              onClick={() => setShowLogin(true)}
              className="ml-1 font-bold underline"
            >
              Login
            </button>
          </span>
        </p>
      </form>

      {isSignupSuccess && (
        <div className="insert-0 fixed left-1/3 top-0 z-50 mt-4 items-center justify-center bg-opacity-50">
          <div className="flex w-[500px] justify-center rounded-2xl border border-green-400 bg-green-100 py-6 text-center text-sm font-medium text-green-700">
            <div className="flex items-center justify-center gap-2">
              <FaCircleCheck className="text-lg text-green-500" />
              <span>User registered successfully!</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
