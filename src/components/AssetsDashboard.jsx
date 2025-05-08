import { MdStorefront, MdAssignmentTurnedIn, MdDelete } from "react-icons/md";
import { MdTableChart } from "react-icons/md";

import { Link } from "react-router-dom";
import HomeNav from "./HomeNav";

export default function AssetsDashboard() {
  return (
    <>
      <div className="">
        <HomeNav />

        {/* Welcome Section */}
        <section className="welcome-bg flex min-h-[50vh] w-full flex-col items-center justify-between bg-gradient-to-r from-blue-100 to-indigo-200 p-6 md:p-8 lg:flex-row lg:p-10">
          {/* Left Side - Text */}
          <div className="mb-6 flex-1 lg:mb-0">
            <p className="text-2xl font-semibold text-gray-800 md:text-3xl lg:text-4xl">
              Welcome to the Asset Tracking Dashboard
            </p>
            <p className="mt-3 text-lg text-gray-700 opacity-80">
              Efficiently manage and monitor your assets in one place. Let’s get
              started! 🚀
            </p>
          </div>
        </section>

        {/* Favourites Section */}
        <section className="min-h-[36vh] bg-[#EEEDEF] p-3 md:p-6 lg:p-8">
          <h5 className="mb-4 text-xl font-semibold text-gray-800 md:text-2xl">
            Quick Actions
          </h5>

          <div className="flex flex-wrap gap-5">
            {/* Manage Assets Card */}
            <Link to={"/dashboard/AssetsStore"}>
              <div className="favCard flex w-52 flex-col items-center rounded-xl bg-gradient-to-r from-blue-400 to-blue-600 p-4 text-white shadow-lg transition-transform duration-300 hover:scale-105">
                <span className="mb-2 rounded-full bg-white p-2 text-3xl text-blue-600">
                  <MdStorefront />
                </span>
                <h4 className="text-base font-medium">Assets Store</h4>
              </div>
            </Link>

            {/* Allocated Assets Card */}
            <Link to={"/assets-table"}>
              <div className="favCard flex w-52 flex-col items-center rounded-xl bg-gradient-to-r from-orange-400 to-orange-600 p-4 text-white shadow-lg transition-transform duration-300 hover:scale-105">
                <span className="mb-2 rounded-full bg-white p-2 text-3xl text-orange-600">
                  <MdAssignmentTurnedIn />
                </span>
                <h4 className="text-base font-medium">Allocated Assets</h4>
              </div>
            </Link>

            {/* Deleted Records */}
            <Link to={"/assetscandidate/deleted"}>
              <div className="favCard flex w-52 flex-col items-center rounded-xl bg-gradient-to-r from-red-400 to-red-600 p-4 text-white shadow-lg transition-transform duration-300 hover:scale-105">
                <span className="mb-2 rounded-full bg-white p-2 text-3xl text-red-600">
                  <MdDelete />
                </span>
                <h4 className="text-base font-medium">Deleted Records</h4>
              </div>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
