import React from "react";

import logo from "../assets/logo.png";

function Navbar() {
  return (
    <div>
      <div className="max-w-10xl mb-6 flex w-full items-center justify-center rounded-2xl bg-white p-4 shadow-md">
        <img
          src={logo}
          className="h-[28px] w-[75px] cursor-pointer md:h-[32px] md:w-[100px] lg:h-[40px] lg:w-[140px]"
        />
      </div>
    </div>
  );
}

export default Navbar;
