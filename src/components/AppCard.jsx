
import React from "react";
import { useNavigate } from "react-router-dom";
import { appsList } from "../utils/lists";
import Navbar from "../components/Navbar";

const Appcard = () => {
  const navigate = useNavigate()

  const handleClick = () => {
    // Navigate to the candidates table
    navigate("/candidates");
  };

  return (
    <>
      <div className="container">
        <Navbar />
        <div className="grid grid-cols-1 place-items-center gap-10 sm:grid-cols-2 md:grid-cols-3">
          {appsList.map((data) => (
            <div
              key={data.id}
              data-aos="zoom-in"
              className="dark:hover:bg-primary group relative flex h-[150px] w-full max-w-[400px] items-center rounded-2xl bg-gradient-to-r from-teal-400 to-blue-300 p-4 shadow-xl duration-300 hover:bg-black/80 hover:from-pink-500 hover:to-orange-500 hover:text-white"
            >
              {/* Image Section (Left) */}
              <div className="flex w-1/3 justify-center">
                <img
                  src={data.image}
                  alt={data.appName}
                  className="h-16 w-16 rounded-full object-cover shadow-md duration-300 group-hover:scale-105 sm:h-20 sm:w-20 md:h-24 md:w-24"
                />
              </div>

              {/* Content Section (Right) */}
              <div className="w-2/3 pl-4">
                <h1 className="item-center text-xs font-semibold md:text-lg">
                  {data.appName}
                </h1>
                <p className="line-clamp-2 text-sm text-gray-500 group-hover:text-white">
                  {data.description}
                </p>
                {/* Button to navigate to the candidates table */}
                <button
                  className="group-hover:text-primary mt-3 rounded-full px-4 py-1 text-black opacity-0 transition-opacity duration-300 ease-in-out group-hover:bg-white group-hover:opacity-100"
                  onClick={handleClick}
                >
                  Get Started
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Appcard;

