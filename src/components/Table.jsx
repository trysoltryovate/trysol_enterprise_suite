/* eslint-disable simple-import-sort/imports */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiEdit, FiTrash, FiInfo, FiUser } from "react-icons/fi";
import { ImSpinner2 } from "react-icons/im";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const API_BASE_URL = "http://192.168.0.224:8082";

const CandidateTable = () => {
  const [candidates, setCandidates] = useState([]);
  const [loadingDeleteId, setLoadingDeleteId] = useState(null);
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
  const handleEditClick = (candidate) => {
    navigate(`/candidates/edit/${candidate.sNo}`);
  };


  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="rounded-lg bg-white p-6 shadow-md">
        <p className="mb-4 flex items-center rounded-md bg-blue-100 p-3 text-gray-600">
          <FiInfo className="mr-2" />
          The candidates directory lists all candidates in the organization.
        </p>

        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-800">
            Candidates List
          </h2>

          <Link
            className="flex items-center rounded bg-green-500 px-2 py-2 text-white"
            to="/candidates/add"
          >
            {/* <FiUser className="mr-2" /> */}
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
        </div>

        <div className="overflow-x-auto">
          <table className="w-full rounded-lg border border-gray-300 bg-white shadow-md">
            <thead className="bg-gray-200">
              <tr>
                {[
                  "S.No",
                  "Mode",
                  "Name",
                  "Skill",
                  "projects/Shadow",
                  "Experience",
                  "NDA",
                  "CV Ready",
                  "LinkedIn",
                  "Date Of NDA",
                  "Notary",
                  "Affidavit",
                  "salary On Deployed",
                  "salary On Bench",
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
              {candidates.map((candidate) => (
                <tr key={candidate.id} className="border">
                  <td className="px-4 py-2">{candidate.sNo}</td>
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
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CandidateTable;