/* eslint-disable simple-import-sort/imports */

import React from "react";
import { useNavigate } from "react-router-dom";
import { appsList } from "../utils/lists";
import Navbar from "../components/Navbar";

const Appcard = () => {
  const navigate = useNavigate();

  // const handleClick = () => {
  //   // Navigate to the candidates table
  //   navigate("/candidates");
  // };

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

                <button className="group relative h-14 w-14 overflow-hidden border-0 bg-transparent outline-none" onClick={() => navigate(data.page || data.page)}>
                  {/* Outer ring */}
                  <span className="absolute inset-[7px] rounded-full border-4 border-[#f0eeef] transition-all duration-[500ms] ease-[cubic-bezier(0.455,0.03,0.515,0.955)] group-hover:scale-[0.7] group-hover:opacity-0 group-focus:scale-[0.7] group-focus:opacity-0"></span>

                  {/* Hover ring */}
                  <span className="absolute inset-[7px] scale-[1.3] rounded-full border-4 border-[#96daf0] opacity-0 transition-all delay-[80ms] duration-[500ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-100 group-hover:opacity-100 group-focus:scale-100 group-focus:opacity-100"></span>

                  {/* Icon container */}
                  <div className="absolute right-0 pt-[3px] top-0 flex transition-transform duration-500 ease-in-out group-hover:translate-x-14 group-focus:translate-x-14">
                    {/* First Arrow */}
                    <span className="mx-[18px] mt-[17px] block h-5 w-5 fill-[#f0eeef]">
                      <svg
                        viewBox="0 0 46 40"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z" />
                      </svg>
                    </span>

                    {/* Second Arrow */}
                    <span className="mx-[18px] mt-[17px] block h-5 w-5 fill-[#f0eeef]">
                      <svg viewBox="0 0 46 40">
                        <path d="M46 20.038c0-.7-.3-1.5-.8-2.1l-16-17c-1.1-1-3.2-1.4-4.4-.3-1.2 1.1-1.2 3.3 0 4.4l11.3 11.9H3c-1.7 0-3 1.3-3 3s1.3 3 3 3h33.1l-11.3 11.9c-1 1-1.2 3.3 0 4.4 1.2 1.1 3.3.8 4.4-.3l16-17c.5-.5.8-1.1.8-1.9z" />
                      </svg>
                    </span>
                  </div>
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
