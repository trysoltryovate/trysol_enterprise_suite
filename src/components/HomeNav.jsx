import React, { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import { FaCircleCheck } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { FaPowerOff } from "react-icons/fa6";

function HomeNav() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsModalOpen(true); // Show the modal when logout button is clicked
  };

  useEffect(() => {
    if (isModalOpen) {
      // Close the modal and navigate after 2 seconds
      setTimeout(() => {
        setIsModalOpen(false);
        navigate("/"); // Redirect to home or login page
      }, 2000);
    }
  }, [isModalOpen, navigate]);

  return (
    <div>
      <div className="max-w-10xl mb-6 flex w-full items-center justify-between rounded-2xl bg-white p-4 shadow-md">
        <img
          src={logo}
          className="h-[25px] w-[75px] cursor-pointer md:h-[32px] md:w-[100px] lg:h-[40px] lg:w-[140px]"
        />
        <button
          onClick={handleLogout}
          className="group relative flex h-[45px] w-[45px] items-center justify-start overflow-hidden rounded-full border-none bg-blue-700 p-3 shadow-md transition-all duration-300 hover:w-[125px] hover:rounded-[40px] active:translate-x-[2px] active:translate-y-[2px]"
        >
          <FaPowerOff className="item-centre text-2xl text-white" />
          <div className="absolute right-0 w-0 text-[15px] font-semibold text-white opacity-0 transition-all duration-300 group-hover:w-[70%] group-hover:pr-2 group-hover:opacity-100">
            <p className="ml-[5px]">LogOut</p>
          </div>
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="insert-0 fixed left-1/3 top-0 z-50 mt-4 items-center justify-center bg-opacity-50">
          <div className="flex w-[500px] justify-center rounded-2xl border border-green-400 bg-green-100 py-6 text-center text-sm font-medium text-green-700">
            <div className="flex items-center justify-center gap-2">
              <FaCircleCheck className="text-lg text-green-500" />
              <span>Logout Successfully!</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomeNav;
