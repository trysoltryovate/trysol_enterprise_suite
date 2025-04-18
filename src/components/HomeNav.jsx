/* eslint-disable simple-import-sort/imports */
import React from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { FaPowerOff } from "react-icons/fa6";

function HomeNav() {
  return (
    <div>
      <div className="max-w-10xl mb-6 flex w-full items-center justify-between rounded-2xl bg-white p-4 shadow-md">
        <img
          src={logo}
          className="h-[25px] w-[75px] cursor-pointer md:h-[32px] md:w-[100px] lg:h-[40px] lg:w-[140px]"
        />
        <Link
          to={"/"}
          className="group relative flex h-[45px] w-[45px] items-center justify-start overflow-hidden rounded-full border-none bg-blue-700 p-3 shadow-md transition-all duration-300 hover:w-[125px] hover:rounded-[40px] active:translate-x-[2px] active:translate-y-[2px]"
        >
          <FaPowerOff className="item-centre text-2xl text-white" />
          <div className="absolute right-0 w-0 text-[15px] font-semibold text-white opacity-0 transition-all duration-300 group-hover:w-[70%] group-hover:pr-2 group-hover:opacity-100">
            <p className="ml-[5px]">LogOut</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default HomeNav;
