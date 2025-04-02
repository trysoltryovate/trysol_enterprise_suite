import React from "react";
import ISO from "../assets/iso.png";

const ProductsData = [
  {
    id: 1,
    img: ISO,
    title: "ISO Certification",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];

const Appcard = () => {
  return (
    <div className="container mt-20">
      <div className="grid grid-cols-1 place-items-center gap-10 sm:grid-cols-2 md:grid-cols-3">
        {ProductsData.map((data) => (
          <div
            key={data.id}
            data-aos="zoom-in"
            className="dark:hover:bg-primary group relative flex w-full max-w-[400px] items-center rounded-2xl bg-gradient-to-r from-teal-400 to-blue-300 p-4 shadow-xl duration-300 hover:bg-black/80 hover:from-pink-500 hover:to-orange-500 hover:text-white ..."
          >
            {/* Image Section (Left) */}
            <div className="flex w-1/3 justify-center">
              <img
                src={data.img}
                alt={data.title}
                className="h-24 w-24 rounded-full object-cover shadow-md duration-300 group-hover:scale-105"
              />
            </div>

            {/* Content Section (Right) */}
            <div className="w-2/3 pl-4">
              <h1 className="text-lg font-bold">{data.title}</h1>
              <p className="line-clamp-2 text-sm text-gray-500 group-hover:text-white">
                {data.description}
              </p>
              {/* Button (Initially Hidden, Shows on Hover) */}
              <button className="group-hover:text-primary mt-3 rounded-full px-4 py-1 text-black opacity-0 transition-opacity duration-300 ease-in-out group-hover:bg-white group-hover:opacity-100">
                Click me
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Appcard;
