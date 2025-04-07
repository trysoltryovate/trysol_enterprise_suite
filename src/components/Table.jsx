import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiEdit, FiTrash, FiPlus, FiInfo } from "react-icons/fi";
import { ImSpinner2 } from "react-icons/im";

const API_BASE_URL = "http://192.168.0.224:8082";

const CandidateTable = () => {
  const [candidates, setCandidates] = useState([]);
  const [loadingDeleteId, setLoadingDeleteId] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    technology: "",
    experience: "",
    email: "",
    phone: "",
    skillSet: "",
    startDate: "",
    endDate: "",
    clientName: "",
    projectDuration: "",
  });

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

  const handleEdit = async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/get/${id}`);
      setFormData(response.data);
      setEditId(id);
      setIsEditing(true);
      setIsAdding(true);
    } catch (error) {
      console.error("Error fetching candidate for edit:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`${API_BASE_URL}/update/${editId}`, formData);
        const updatedCandidates = candidates.map((c) =>
          c.id === editId ? { ...formData, id: editId } : c
        );
        setCandidates(updatedCandidates);
        setIsEditing(false);
        setEditId(null);
      } else {
        const response = await axios.post(`${API_BASE_URL}/employee-save`, formData);
        setCandidates([...candidates, response.data]);
      }

      setIsAdding(false);
      setFormData({
        name: "",
        technology: "",
        experience: "",
        email: "",
        phone: "",
        skillSet: "",
        startDate: "",
        endDate: "",
        clientName: "",
        projectDuration: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
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
          <button
            className="bg-green-500 text-white px-4 py-2 rounded flex items-center"
            onClick={() => {
              setIsAdding(true);
              setIsEditing(false);
              setFormData({
                name: "",
                technology: "",
                experience: "",
                email: "",
                phone: "",
                skillSet: "",
                startDate: "",
                endDate: "",
                clientName: "",
                projectDuration: "",
              });
            }}
          >
            <FiPlus className="mr-2" /> Add Candidate
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full bg-white border border-gray-300 rounded-lg shadow-md">
            <thead className="bg-gray-200">
              <tr>
                {["Name", "Technology", "Experience", "Email", "Phone", "Skill Set", "Start Date", "End Date", "Client Name", "Project Duration", "Edit", "Delete"].map((heading, index) => (
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
                    <button
                      className="text-yellow-500 hover:text-yellow-700"
                      onClick={() => handleEdit(candidate.id)}
                    >
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

        {isAdding && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
              <h3 className="text-lg font-semibold mb-4">
                {isEditing ? "Edit Candidate" : "Add New Candidate"}
              </h3>
              <form onSubmit={handleSubmit}>
                {["name", "technology", "experience", "email", "phone", "skillSet", "clientName", "projectDuration"].map((field) => (
                  <input
                    key={field}
                    type={field === "email" ? "email" : "text"}
                    name={field}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    value={formData[field]}
                    onChange={handleChange}
                    required
                    className="border p-2 mb-2 w-full"
                  />
                ))}
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                  className="border p-2 mb-2 w-full"
                />
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  required
                  className="border p-2 mb-2 w-full"
                />
                <div className="flex justify-end mt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setIsAdding(false);
                      setIsEditing(false);
                      setEditId(null);
                    }}
                    className="mr-2 text-gray-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    {isEditing ? "Update Candidate" : "Add Candidate"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CandidateTable;
