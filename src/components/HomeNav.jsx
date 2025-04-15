/* eslint-disable simple-import-sort/imports */
import React from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

function HomeNav() {
  return (
    <div>
      <div className="max-w-10xl mb-6 flex w-full items-center justify-between rounded-2xl bg-white p-4 shadow-md">

        <img
          src={logo}
          className="h-[25px] w-[75px] cursor-pointer md:h-[32px] md:w-[100px] lg:h-[40px] lg:w-[140px]"
        />
          <Link to={"/"}
      className="group flex items-center justify-start w-[45px] h-[45px] bg-[#a38eff] rounded-full border-none overflow-hidden relative shadow-md transition-all duration-300 hover:w-[125px] hover:rounded-[40px] active:translate-x-[2px] active:translate-y-[2px]"
    >
      <div className="flex items-center justify-center w-full transition-all duration-300 group-hover:w-[30%] group-hover:pl-5">
        <svg viewBox="0 0 512 512" className="w-[17px] fill-white">
          <path d="M217.9 105.9L340.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L217.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1L32 320c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM352 416l64 0c17.7 0 32-14.3 32-32l0-256c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64 0c53 0 96 43 96 96l0 256c0 53-43 96-96 96l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32z" />
        </svg>
      </div>
      <div className="absolute right-0 text-white text-[15px] font-semibold opacity-0 w-0 transition-all duration-300 group-hover:opacity-100 group-hover:w-[70%] group-hover:pr-2">
        <p className="ml-[5px]">LogOut</p>
      </div>
    </Link>
      </div>
    </div>
  );
}

export default HomeNav;