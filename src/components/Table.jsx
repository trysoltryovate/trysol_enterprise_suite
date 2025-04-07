/* eslint-disable simple-import-sort/imports */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiEdit, FiTrash, FiInfo, FiUser } from "react-icons/fi";
import { ImSpinner2 } from "react-icons/im";
import { Link } from "react-router-dom";

const API_BASE_URL = "http://192.168.0.224:8082";

const CandidateTable = () => {
  const [candidates, setCandidates] = useState([]);
  const [loadingDeleteId, setLoadingDeleteId] = useState(null);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/getAll`);
        setCandidates(response.data);
      } catch (error) {
        console.error("Error fetching candidates:", error);
      }
    };

    fetchCandidates();
  }, []);

  const handleDelete = async (id) => {
    setLoadingDeleteId(id);
    await new Promise((resolve) => setTimeout(resolve, 400));

    const confirmDelete = window.confirm("Are you sure you want to delete this candidate?");
    if (confirmDelete) {
      try {
        await axios.delete(`${API_BASE_URL}/delete/${id}`);
        setCandidates(candidates.filter(candidate => candidate.id !== id));
      } catch (error) {
        console.error("Error deleting candidate:", error);
      }
    }
    setLoadingDeleteId(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <p className="mb-4 flex items-center rounded-md bg-blue-100 p-3 text-gray-600">
          <FiInfo className="mr-2" />
          The candidates directory lists all candidates in the organization.
        </p>

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">Candidates List</h2>

          <Link className="bg-green-500 text-white px-4 py-2 rounded flex items-center" to="/candidates/add"> <FiUser className="mr-2" />Add Candidate</Link>
          
        </div>

        <div className="overflow-x-auto">
          <table className="w-full bg-white border border-gray-300 rounded-lg shadow-md">
            <thead className="bg-gray-200">
              <tr>
                {[
                  "Name", "Technology", "Experience", "Email", "Phone",
                  "Skill Set", "Start Date", "End Date", "Client Name", "Project Duration", "Edit", "Delete"
                ].map((heading, index) => (
                  <th key={index} className="px-4 py-2 text-left border">{heading}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {candidates.map((candidate) => (
                <tr key={candidate.id} className="border">
                  <td className="px-4 py-2">{candidate.name}</td>
                  <td className="px-4 py-2">{candidate.technology}</td>
                  <td className="px-4 py-2">{candidate.experience}</td>
                  <td className="px-4 py-2">{candidate.email}</td>
                  <td className="px-4 py-2">{candidate.phone}</td>
                  <td className="px-4 py-2">{candidate.skillSet}</td>
                  <td className="px-4 py-2">{candidate.startDate}</td>
                  <td className="px-4 py-2">{candidate.endDate}</td>
                  <td className="px-4 py-2">{candidate.clientName}</td>
                  <td className="px-4 py-2">{candidate.projectDuration}</td>
                  <td className="px-4 py-2">
                    <button className="text-yellow-500 hover:text-yellow-700">
                      <FiEdit className="w-5 h-5" />
                    </button>
                  </td>
                  <td className="px-4 py-2">
                    <button
                      className="text-red-500 hover:text-red-700 disabled:opacity-50"
                      onClick={() => handleDelete(candidate.id)}
                      disabled={loadingDeleteId === candidate.id}
                    >
                      {loadingDeleteId === candidate.id ? (
                        <ImSpinner2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <FiTrash className="w-5 h-5" />
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
