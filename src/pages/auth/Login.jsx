/* eslint-disable simple-import-sort/imports */
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import CMMI from "../../assets/cmmi.png";
import ISO from "../../assets/iso.png";
import ISONUMBER from "../../assets/iso2700.png";
import Navbar from "../../components/Navbar";
import SignUpForm from "./SignUpForm";
import ForgotPassword from "./ForgotPassword";
import axios from "axios";

import LoginForm from "./LoginForm";

export default function Login() {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");

  const [isSignUp, setIsSignup] = useState(false);
  const [isForgot, setIsForgot] = useState(false);

  const navigate = useNavigate();

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

        {isSignUp ? (
          <SignUpForm />
        ) : isForgot ? (
          <ForgotPassword />
        ) : (
          <LoginForm />
        )}

        {/* Login / Signup Section */}
      </div>

      {/* <div className="mt-10 text-center">
        <Link to="/home" className="text-lg text-white hover:underline">
          Go to Home
        </Link>
      </div> */}
    </div>
  );
}
