import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiEdit, FiTrash, FiInfo, FiSearch, FiDownload } from "react-icons/fi";
import { FaCircleCheck } from "react-icons/fa6";
import { ImSpinner2 } from "react-icons/im";
import { Link, useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import HomeNav from "./HomeNav";

const API_BASE_URL = "http://192.168.0.226:8082";

const CandidateTable = () => {
  const [candidates, setCandidates] = useState([]);
  const [loadingDeleteId, setLoadingDeleteId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [candidateToDelete, setCandidateToDelete] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
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

  const confirmDelete = (id) => {
    setCandidateToDelete(id);
    setShowConfirmModal(true);
  };

  const handleConfirmDelete = async () => {
    const id = candidateToDelete;
    setLoadingDeleteId(id);
    try {
      await axios.delete(`${API_BASE_URL}/delete/${id}`);
      setCandidates((prev) => prev.filter((c) => c.id !== id));
      fetchCandidates();

      // Show success modal
      setShowSuccessModal(true);
      setTimeout(() => {
        setShowSuccessModal(false);
      }, 2000);
    } catch (error) {
      console.error("Error deleting candidate:", error);
    }
    setLoadingDeleteId(null);
    setShowConfirmModal(false);
    setCandidateToDelete(null);
  };

  const handleCancelDelete = () => {
    setShowConfirmModal(false);
    setCandidateToDelete(null);
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

        {/* Search & Actions */}
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
              <button className="group mr-2 cursor-pointer">
                <svg
                  className="fill-none stroke-teal-400 group-hover:fill-white"
                  viewBox="0 0 24 24"
                  height="30px"
                  width="30px"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeWidth="1.5"
                    d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                  />
                  <path strokeWidth="1.5" d="M8 12H16" />
                  <path strokeWidth="1.5" d="M12 16V8" />
                </svg>
              </button>
              Add Candidate
            </Link>

            <button
              type="button"
              className="group relative ml-2 flex h-12 w-[150px] items-center overflow-hidden rounded-md border bg-green-500"
              onClick={exportToExcel}
              title="Download"
            >
              <span className="translate-x-[22px] transform font-semibold text-white group-hover:text-transparent">
                Download
              </span>
              <span className="absolute flex h-full w-[39px] translate-x-[109px] items-center justify-center bg-[#17795E] group-hover:w-[148px] group-hover:translate-x-0">
                <FiDownload className="h-5 w-5 text-white" />
              </span>
            </button>
          </div>
        </div>

        {/* Table */}
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
                <tr key={candidate.id} className="border hover:bg-blue-100">
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
                      onClick={() => confirmDelete(candidate.sNo)}
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

      {/* Confirm Delete Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black bg-opacity-40 pt-10">
          <div className="w-[90%] max-w-md rounded-2xl border border-green-400 bg-green-100 px-6 py-6 text-center text-sm font-medium text-green-700 shadow-lg">
            <p className="mb-6 text-base text-gray-800">
              Are you sure you want to delete this candidate?
            </p>
            <div className="flex justify-center gap-4">
              <button
                className="rounded bg-gray-300 px-4 py-2 text-sm text-gray-800 hover:bg-gray-400"
                onClick={handleCancelDelete}
              >
                Cancel
              </button>
              <button
                className="rounded bg-red-500 px-4 py-2 text-sm text-white hover:bg-red-600"
                onClick={handleConfirmDelete}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Alert Modal */}

      {showSuccessModal && (
        <div className="insert-0 fixed left-1/3 top-0 z-50 mt-4 items-center justify-center bg-opacity-50">
          <div className="flex w-[500px] justify-center rounded-2xl border border-green-400 bg-green-100 py-6 text-center text-sm font-medium text-green-700">
            <div className="flex items-center justify-center gap-2">
              <FaCircleCheck className="text-lg text-green-500" />
              <span>Condidate deleted Successful!</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CandidateTable;
