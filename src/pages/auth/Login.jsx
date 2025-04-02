import { Link } from "react-router-dom";

import CMMI from "../../assets/cmmi.png";
import ISO from "../../assets/iso.png";
import ISONUMBER from "../../assets/iso2700.png";
import Navbar from "../../components/Navbar";

export default function Login() {
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
        <div className="mt-6 min-h-[74vh] content-center rounded-lg bg-white bg-opacity-40 p-8 shadow-md lg:mt-0 lg:w-1/3">
          <h2 className="mb-4 text-center text-xl font-semibold text-gray-900">
            Login
          </h2>
          <div className="mb-4">
            <label className="block font-medium text-gray-700">Login ID</label>
            <input
              type="text"
              placeholder="Enter user ID"
              className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium text-gray-700">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="mt-2 w-full rounded-lg bg-blue-500 py-2 text-white hover:bg-blue-600">
            Login
          </button>
        </div>
        {/* <LoginForm/> */}
      </div>

      <Link to="/home" className="mt-6 text-lg text-white hover:underline">
        Go to Home
      </Link>
    </div>
  );
}
