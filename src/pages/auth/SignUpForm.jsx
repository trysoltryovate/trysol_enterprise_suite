import { useState } from "react";
import { IoMdEyeOff, IoMdInformationCircle } from "react-icons/io";
import { FaCircleCheck } from "react-icons/fa6";
import { IoEye } from "react-icons/io5";

export default function SignUpForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [isPassVisible, setIsPassVisible] = useState(false);
  const [isConfirmPassVisible, setIsConfirmPassVisible] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");

  const validateName = (value) => {
    const isValid = /^[A-Za-z\s]{2,50}$/.test(value);
    return isValid
      ? { message: "", isError: false }
      : {
          message: "Enter a valid name (only letters, 2-50 chars).",
          isError: true,
        };
  };

  const validateEmail = (value) => {
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value); // Regex to check email format
    return isValid
      ? { message: "", isError: false }
      : { message: "Enter a valid email address.", isError: true };
  };

  const validatePhone = (value) => {
    const isValid = /^\d{10,}$/.test(value); // Ensures at least 10 digits
    return isValid
      ? { message: "", isError: false }
      : { message: "Phone number must be at least 10 digits.", isError: true };
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "name") {
      const validation = validateName(value);
      setNameError(validation.isError ? validation.message : ""); // Store error message or empty string
    }

    if (name === "email") {
      const validation = validateEmail(value);
      setEmailError(validation.message);
    }
    if (name === "phone") {
      const validation = validatePhone(value);
      setPhoneError(validation.message);
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

  return (
    <form className="mt-6 max-h-[80vh] content-center overflow-auto rounded-lg bg-white bg-opacity-40 p-8 shadow-md lg:mt-0 lg:w-1/3">
      <h2 className="mb-4 text-center text-xl font-semibold text-gray-900">
        Sign Up
      </h2>
      {[
        {
          label: "Name",
          type: "text",
          name: "name",
          placeholder: "Enter your name",
        },
        {
          label: "Email",
          type: "email",
          name: "email",
          placeholder: "Enter your email",
        },
        {
          label: "Phone No",
          type: "tel",
          name: "phone",
          placeholder: "Enter your phone number",
        },
      ].map(({ label, type, name, placeholder }) => (
        <div key={name} className="mb-3 flex flex-col gap-y-1">
          <label className="ml-1 w-max text-sm font-semibold opacity-80">
            {label}
          </label>
          <input
            type={type}
            name={name}
            value={formData[name]}
            onChange={handleChange}
            placeholder={placeholder}
            className={`border ${
              name === "email"
                ? formData.email.length === 0
                  ? "border-gray-400"
                  : !validateEmail(formData.email).isError
                    ? "border-green-500 focus-visible:ring-green-100"
                    : "border-red-500 focus-visible:ring-red-100"
                : name === "phone"
                  ? formData.phone.length === 0
                    ? "border-gray-400"
                    : !validatePhone(formData.phone).isError
                      ? "border-green-500 focus-visible:ring-green-100"
                      : "border-red-500 focus-visible:ring-red-100"
                  : name === "name"
                    ? formData.name.length === 0
                      ? "border-gray-400"
                      : formData.name.length >= 3
                        ? "border-green-500 focus-visible:ring-green-100"
                        : "border-red-500 focus-visible:ring-red-100"
                    : "border-gray-400"
            } bg-background my-1 flex h-9 w-full rounded-md px-3 py-2 text-base font-medium opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 md:text-sm`}
          />
          {name === "name" && (
            <p
              className={`text-[12px] font-semibold ${
                nameError
                  ? "text-red-500 opacity-100"
                  : "text-green-700 opacity-0"
              }`}
            >
              {nameError}
            </p>
          )}
          {name === "email" && (
            <p
              className={`text-[12px] font-semibold ${
                emailError
                  ? "text-red-500 opacity-100"
                  : "text-green-700 opacity-0"
              }`}
            >
              {emailError}
            </p>
          )}
          {name === "phone" && (
            <p
              className={`text-[12px] font-semibold ${
                phoneError
                  ? "text-red-500 opacity-100"
                  : "text-green-700 opacity-0"
              }`}
            >
              {phoneError}
            </p>
          )}
        </div>
      ))}
      {["password", "confirmPassword"].map((field, index) => (
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
                      ? "border-green-500 focus-visible:ring-green-100"
                      : "border-red-500 focus-visible:ring-red-100"
                  : formData.confirmPassword.length === 0
                    ? "border-gray-400"
                    : formData.confirmPassword === formData.password
                      ? "border-green-500 focus-visible:ring-green-100"
                      : "border-red-500 focus-visible:ring-red-100"
              } bg-background ring-offset-background placeholder:text-muted-foreground my-1 flex h-9 w-full rounded-md px-3 py-2 text-base font-medium opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm`}
            />
            <button
              type="button"
              className="absolute right-2 top-2 rounded-md px-2 py-1 text-gray-400 hover:text-gray-700"
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
                ? !validatePassword(formData.password).isError
                  ? "text-green-700"
                  : "text-red-500"
                : formData.confirmPassword.length === 0
                  ? "text-red-500 opacity-0"
                  : formData.confirmPassword === formData.password
                    ? "text-green-700"
                    : "text-red-500"
            }`}
          >
            {field === "password"
              ? passwordError
              : formData.confirmPassword.length === 0
                ? ""
                : formData.confirmPassword === formData.password
                  ? "Passwords match!"
                  : "Passwords do not match"}
          </p>
        </div>
      ))}

      <button className="mt-2 w-full rounded-lg bg-blue-500 py-2 text-white hover:bg-blue-600">
        Sign Up
      </button>
      <p className="opacity-120 mt-1 text-[15px] font-semibold">
        Already have an account?
        <span className="text-[#004B91]">
          <button className="ml-1 font-bold underline">Login</button>
        </span>
      </p>
    </form>
  );
}
