import React from "react";
import { Link } from "react-router-dom";
import {
  MdStorefront,
  MdComputer,
  MdWeekend,
  MdDesktopWindows,
  MdKeyboard,
} from "react-icons/md";
import { MdPower } from "react-icons/md";
import { GiMouse } from "react-icons/gi";
import HomeNav from "./HomeNav";

export default function StorePage() {
  const assets = [
    {
      id: 1,
      name: "Laptop",
      category: "Electronics",
      status: "Available",
      path: "/laptop",
      gradient: "from-blue-400 to-blue-600",
      icon: MdComputer,
      iconColor: "text-blue-600",
      details: {
        total: 25,
        allocatedLaptops: 15,
        available: 10,
      },
    },
    {
      id: 2,
      name: "Desktops",
      category: "Electronics",
      status: "Available",
      path: "/projector",
      gradient: "from-orange-400 to-orange-600",
      icon: MdDesktopWindows,
      iconColor: "text-orange-600",
      details: {
        total: 25,
        allocatedDesktops: 15,
        available: 10,
      },
    },
    {
      id: 3,
      name: "Keyboard",
      category: "Electronics",
      status: "Available",
      path: "/keyboard",
      gradient: "from-purple-400 to-purple-600",
      icon: MdKeyboard,
      iconColor: "text-purple-600",
      details: {
        total: 40,
        allocatedKeyboards: 25,
        available: 15,
      },
    },
    {
      id: 4,
      name: "Mouse",
      category: "Electronics",
      status: "Available",
      gradient: "from-green-400 to-green-600",
      icon: GiMouse,
      iconColor: "text-green-600",
      details: {
        total: 40,
        allocatedMouse: 25,
        available: 15,
      },
    },

    {
      id: 5,
      name: "Charger",
      category: "Electronics",
      status: "Available",
      path: "/charger",
      gradient: "from-yellow-400 to-yellow-600",
      icon: MdPower,
      iconColor: "text-yellow-600",
      details: {
        total: 30,
        allocatedChargers: 18,
        available: 12,
      },
    },
  ];

  return (
    <>
      <HomeNav />
      <div className="flex min-h-[520px] items-center justify-center bg-gray-100 p-6">
        <div className="min-h-[450px] w-full max-w-6xl rounded-xl bg-white p-6 shadow-lg">
          {/* Header */}
          <div className="mb-6 flex items-center gap-3">
            <MdStorefront className="text-4xl text-orange-600" />
            <h1 className="text-3xl font-bold text-gray-800">Assets Store</h1>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {assets.map((asset) => {
              const Icon = asset.icon;
              return (
                <Link to={asset.path} key={asset.id}>
                  <div
                    className={`group relative flex min-h-[220px] flex-col items-center justify-center rounded-xl bg-gradient-to-r ${asset.gradient} p-5 text-white shadow-lg transition-transform duration-300 hover:scale-105`}
                  >
                    {/* Icon */}
                    <div
                      className={`mb-3 rounded-full bg-white p-3 text-3xl ${asset.iconColor}`}
                    >
                      <Icon />
                    </div>

                    {/* Title & Category */}
                    <h2 className="text-lg font-semibold">{asset.name}</h2>
                    <p className="text-sm">Category: {asset.category}</p>
                    <p className="mt-2 rounded-full bg-white px-3 py-1 text-xs font-medium text-green-700">
                      {asset.status}
                    </p>

                    {/* Hover Details for Laptop */}
                    {asset.name === "Laptop" && (
                      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-xl bg-white bg-opacity-90 p-4 text-sm text-gray-800 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <h3 className="mb-2 text-lg font-semibold text-blue-600">
                          Laptop Details
                        </h3>
                        <p>Total Laptops: {asset.details.total}</p>
                        <p>
                          AllocatedLaptops: {asset.details.allocatedLaptops}
                        </p>
                        <p>Available: {asset.details.available}</p>
                      </div>
                    )}

                    {/* Hover Details for Desktop */}
                    {asset.name === "Desktops" && (
                      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-xl bg-white bg-opacity-90 p-4 text-sm text-gray-800 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <h3 className="mb-2 text-lg font-semibold text-blue-600">
                          Desktop Details
                        </h3>
                        <p>Total Laptops: {asset.details.total}</p>
                        <p>
                          AllocatedDesktops: {asset.details.allocatedDesktops}
                        </p>
                        <p>Available: {asset.details.available}</p>
                      </div>
                    )}

                    {/* Hover Details for Keyboard */}
                    {asset.name === "Keyboard" && (
                      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-xl bg-white bg-opacity-90 p-4 text-sm text-gray-800 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <h3 className="mb-2 text-lg font-semibold text-purple-600">
                          Keyboard Details
                        </h3>
                        <p>Total Keyboards: {asset.details.total}</p>
                        <p>Allocated: {asset.details.allocatedKeyboards}</p>
                        <p>Available: {asset.details.available}</p>
                      </div>
                    )}

                    {/* Hover Details for Mouse */}
                    {asset.name === "Mouse" && (
                      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-xl bg-white bg-opacity-90 p-4 text-sm text-gray-800 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <h3 className="mb-2 text-lg font-semibold text-green-600">
                          Mouse Details
                        </h3>
                        <p>Total Mouse: {asset.details.total}</p>
                        <p>Allocated: {asset.details.allocatedMouse}</p>
                        <p>Available: {asset.details.available}</p>
                      </div>
                    )}

                    {/* Hover Details for Charger */}
                    {asset.name === "Charger" && (
                      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-xl bg-white bg-opacity-90 p-4 text-sm text-gray-800 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <h3 className="mb-2 text-lg font-semibold text-yellow-600">
                          Charger Details
                        </h3>
                        <p>Total Chargers: {asset.details.total}</p>
                        <p>Allocated: {asset.details.allocatedChargers}</p>
                        <p>Available: {asset.details.available}</p>
                      </div>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
