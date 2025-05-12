// AssetscandidateTable.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiEdit, FiTrash, FiInfo, FiSearch, FiDownload } from "react-icons/fi";
import { FaCircleCheck } from "react-icons/fa6";
import { ImSpinner2 } from "react-icons/im";
import { Link, useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import HomeNav from "./HomeNav";

const API_BASE_URL = "http://192.168.0.224:8082/asset/assetDeleteData";

const AssetsDeleteddataTable = () => {
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
      const response = await axios.get(API_BASE_URL);
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
      await axios.delete(`http://192.168.0.224:8082/asset/delete${id}`);
      setCandidates((prev) => prev.filter((c) => c.sNo !== id));
      fetchCandidates();
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
          The Assets Deleted directory lists all Deleted Assets in the
          organization.
        </p>

        {/* Search & Actions */}
        <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
            <h2 className="text-xl font-semibold text-gray-800 sm:text-2xl">
              Deleted Assets List
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
                  "Employee ID",
                  "Employee Name",
                  "Department",
                  "Assigned Date",
                  "Asset ID",
                  "Asset Type",
                  "Make",
                  "Processor",
                  "RAM",
                  "Hard Disk",
                  "Charger",
                  "Charger Watt",
                  "Bag",
                  "Model Number",
                  "Serial Number",
                  "Issued IT Person Name",
                  "Approved By",
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
                  <td className="px-4 py-2">{candidate.employeeId}</td>
                  <td className="px-4 py-2">{candidate.employeeName}</td>
                  <td className="px-4 py-2">{candidate.department}</td>
                  <td className="px-4 py-2">{candidate.assignedDate}</td>
                  <td className="px-4 py-2">{candidate.assetId}</td>
                  <td className="px-4 py-2">{candidate.assetType}</td>
                  <td className="px-4 py-2">{candidate.make}</td>
                  <td className="px-4 py-2">{candidate.processor}</td>
                  <td className="px-4 py-2">{candidate.ram}</td>
                  <td className="px-4 py-2">{candidate.hardDisk}</td>
                  <td className="px-4 py-2">{candidate.charger}</td>
                  <td className="px-4 py-2">{candidate.chargerWatt}</td>
                  <td className="px-4 py-2">{candidate.bag}</td>
                  <td className="px-4 py-2">{candidate.modelNumber}</td>
                  <td className="px-4 py-2">{candidate.serialNumber}</td>
                  <td className="px-4 py-2">{candidate.issuedItPersonName}</td>
                  <td className="px-4 py-2">{candidate.approvedBy}</td>
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
          <div className="relative w-1/3 rounded-md bg-white p-6">
            <h3 className="text-lg font-semibold text-gray-800">
              Are you sure you want to delete this asset?
            </h3>
            <div className="mt-4 flex gap-4">
              <button
                className="w-full rounded-md bg-red-500 py-2 text-white"
                onClick={handleConfirmDelete}
              >
                Confirm
              </button>
              <button
                className="w-full rounded-md border py-2 text-gray-800"
                onClick={handleCancelDelete}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black bg-opacity-40 pt-10">
          <div className="relative flex w-1/3 flex-col items-center rounded-md bg-white p-6">
            <FaCircleCheck className="mb-4 text-5xl text-green-500" />
            <h3 className="text-lg font-semibold text-gray-800">
              Asset deleted successfully!
            </h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssetsDeleteddataTable;
