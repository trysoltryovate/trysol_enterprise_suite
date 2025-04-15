// (same imports as before)
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiEdit, FiTrash, FiInfo, FiSearch, FiDownload } from "react-icons/fi";
import { ImSpinner2 } from "react-icons/im";
import { Link, useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import HomeNav from "./HomeNav";

const API_BASE_URL = "http://192.168.0.224:8082";

const CandidateTable = () => {
  const [candidates, setCandidates] = useState([]);
  const [loadingDeleteId, setLoadingDeleteId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const navigate = useNavigate();

  const fetchCandidates = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/getAll`);
      setCandidates(response.data);
    } catch (error) {
      console.error("Error fetching candidates:", error);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  const handleDelete = async (id) => {
    setLoadingDeleteId(id);
    await new Promise((resolve) => setTimeout(resolve, 400));
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this candidate?",
    );
    if (confirmDelete) {
      try {
        await axios.delete(`${API_BASE_URL}/delete/${id}`);
        setCandidates(candidates.filter((candidate) => candidate.id !== id));
        fetchCandidates();
      } catch (error) {
        console.error("Error deleting candidate:", error);
      }
    }
    setLoadingDeleteId(null);
  };

  const handleRowSelect = (id) => {
    setSelectedCandidates((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const handleEditClick = (candidate) => {
    navigate(`/candidates/edit/${candidate.sNo}`);
  };

  const exportToExcel = () => {
    const selectedRows = candidates.filter((candidate) =>
      selectedCandidates.includes(candidate.sNo),
    );
    if (selectedRows.length === 0) {
      alert("Please select at least one row to export.");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(selectedRows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "SelectedCandidates");
    XLSX.writeFile(workbook, "Selected_Candidates.xlsx");
  };

  const filteredCandidates = candidates.filter((candidate) => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return true;

    return Object.entries(candidate).some(([key, value]) => {
      if (!value) return false;
      const stringValue = String(value).toLowerCase();

      if (key === "dateOfNDA") {
        const [year, month, day] = stringValue.split("-");
        const dateWithoutDashes = stringValue.replace(/-/g, "");
        return (
          stringValue.includes(term) ||
          dateWithoutDashes.includes(term) ||
          year?.includes(term) ||
          month?.includes(term) ||
          day?.includes(term)
        );
      }

      return stringValue.includes(term);
    });
  });

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
      <HomeNav />
      <div className="rounded-lg bg-white p-4 shadow-md sm:p-6">
        <p className="mb-4 flex items-center rounded-md bg-blue-100 p-3 text-sm text-gray-600 sm:text-base">
          <FiInfo className="mr-2" />
          The candidates directory lists all candidates in the organization.
        </p>

        <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
            <h2 className="text-xl font-semibold text-gray-800 sm:text-2xl">
              Candidates List
            </h2>
            <div className="relative w-full md:w-80">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <FiSearch />
              </span>
              <input
                type="text"
                placeholder="Search here..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-md border border-gray-500 py-2 pl-10 pr-3 text-sm focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
            <Link
              className="flex items-center rounded-md bg-green-500 px-2 py-2 text-white"
              to="/candidates/add"
            >
              <button
                className="group mr-2 cursor-pointer outline-none duration-300 hover:rotate-180"
                title="Add candidate"
              >
                <svg
                  class="fill-none stroke-teal-400 duration-300 group-hover:fill-white group-active:fill-teal-500 group-active:stroke-teal-200 group-active:duration-0"
                  viewBox="0 0 24 24"
                  height="30px"
                  width="30px"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-width="1.5"
                    d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                  ></path>
                  <path stroke-width="1.5" d="M8 12H16"></path>
                  <path stroke-width="1.5" d="M12 16V8"></path>
                </svg>
              </button>
              Add Candidate
            </Link>

            <button
              type="button"
              className="group relative ml-2 flex h-12 w-[150px] cursor-pointer items-center overflow-hidden rounded-md border bg-green-500 transition-all duration-300"
              onClick={exportToExcel}
              title="Download"
            >
              <span className="translate-x-[22px] transform font-semibold text-white transition-all duration-300 group-hover:text-transparent">
                Download
              </span>
              <span className="absolute flex h-full w-[39px] translate-x-[109px] transform items-center justify-center bg-[#17795E] transition-all duration-300 group-hover:w-[148px] group-hover:translate-x-0 group-active:bg-[#146c54]">
                <FiDownload className="h-5 w-5 text-white" />
              </span>
            </button>
          </div>
        </div>

        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[1000px] rounded-lg border border-gray-300 bg-white text-sm shadow-md">
            <thead className="bg-blue-400">
              <tr>
                <th className="border px-4 py-2">
                  <input
                    type="checkbox"
                    onChange={() => {
                      if (
                        selectedCandidates.length === filteredCandidates.length
                      ) {
                        setSelectedCandidates([]);
                      } else {
                        setSelectedCandidates(
                          filteredCandidates.map((c) => c.sNo),
                        );
                      }
                    }}
                    checked={
                      filteredCandidates.length > 0 &&
                      filteredCandidates.every((c) =>
                        selectedCandidates.includes(c.sNo),
                      )
                    }
                  />
                </th>
                {[
                  "S.No",
                  "Mode",
                  "Name",
                  "Skill",
                  "Projects/Shadow",
                  "Experience",
                  "NDA",
                  "CV Ready",
                  "LinkedIn",
                  "Date Of NDA",
                  "Notary",
                  "Affidavit",
                  "Salary On Deployed",
                  "Salary On Bench",
                  "Ready To Travel",
                  "Email",
                  "Mobile Num",
                  "Edit",
                  "Delete",
                ].map((heading, index) => (
                  <th key={index} className="border px-4 py-2 text-left">
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredCandidates.map((candidate, i) => (
                <tr
                  key={candidate.id}
                  className="border transition-colors duration-200 hover:bg-blue-100"
                >
                  <td className="px-4 py-2">
                    <input
                      type="checkbox"
                      checked={selectedCandidates.includes(candidate.sNo)}
                      onChange={() => handleRowSelect(candidate.sNo)}
                    />
                  </td>
                  <td className="px-4 py-2">{i + 1}</td>
                  <td className="px-4 py-2">{candidate.mode}</td>
                  <td className="px-4 py-2">{candidate.name}</td>
                  <td className="px-4 py-2">{candidate.skill}</td>
                  <td className="px-4 py-2">{candidate.projectsShadow}</td>
                  <td className="px-4 py-2">{candidate.experience}</td>
                  <td className="px-4 py-2">{candidate.nda}</td>
                  <td className="px-4 py-2">{candidate.cvReady}</td>
                  <td className="px-4 py-2">{candidate.linkedin}</td>
                  <td className="px-4 py-2">{candidate.dateOfNDA}</td>
                  <td className="px-4 py-2">{candidate.notary}</td>
                  <td className="px-4 py-2">{candidate.affidavit}</td>
                  <td className="px-4 py-2">{candidate.salaryOnDeployed}</td>
                  <td className="px-4 py-2">{candidate.salaryOnBench}</td>
                  <td className="px-4 py-2">{candidate.readyToTravel}</td>
                  <td className="px-4 py-2">{candidate.email}</td>
                  <td className="px-4 py-2">{candidate.mobileNum}</td>
                  <td className="px-4 py-2">
                    <button
                      className="text-yellow-500 hover:text-yellow-700"
                      onClick={() => handleEditClick(candidate)}
                    >
                      <FiEdit className="h-5 w-5" />
                    </button>
                  </td>
                  <td className="px-4 py-2">
                    <button
                      className="text-red-500 hover:text-red-700 disabled:opacity-50"
                      onClick={() => handleDelete(candidate.sNo)}
                      disabled={loadingDeleteId === candidate.sNo}
                    >
                      {loadingDeleteId === candidate.sNo ? (
                        <ImSpinner2 className="h-5 w-5 animate-spin" />
                      ) : (
                        <FiTrash className="h-5 w-5" />
                      )}
                    </button>
                  </td>
                </tr>
              ))}
              {filteredCandidates.length === 0 && (
                <tr>
                  <td colSpan="20" className="p-4 text-center text-gray-500">
                    No candidates found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CandidateTable;
