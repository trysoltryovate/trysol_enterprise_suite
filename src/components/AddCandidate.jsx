import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = "http://192.168.0.224:8082";

function AddCandidate() {
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

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/employee-save`, formData);
      navigate("/candidates"); // redirect to candidate list
    } catch (error) {
      console.error("Error adding candidate:", error);
    }
  };

  return (
    <div className="bg-white p-6 shadow-md">
      <h2 className="mb-4 text-xl font-semibold">Add New Candidate</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 rounded-md bg-white p-4 shadow-md">
        {/* Text Fields */}
        {[
          { label: "Full Name", name: "name" },
          { label: "Technology", name: "technology" },
          { label: "Experience", name: "experience" },
          { label: "Email", name: "email", type: "email" },
          { label: "Phone", name: "phone" },
          { label: "Skill Set", name: "skillSet" },
          { label: "Client Name", name: "clientName" },
          { label: "Project Duration", name: "projectDuration" },
        ].map(({ label, name, type = "text" }) => (
          <div className="relative" key={name}>
            <label htmlFor={name} className="text-sm text-gray-600">
              {label}
            </label>
            <input
              type={type}
              id={name}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              required
              className="h-12 w-full rounded-md border border-gray-300 px-3 focus:border-blue-600 focus:outline-none"
              placeholder={label}
            />
          </div>
        ))}

        {/* Date Fields */}
        <div className="relative">
          <label htmlFor="startDate" className="text-sm text-gray-600">
            Start Date
          </label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
            className="h-12 w-full rounded-md border border-gray-300 px-3 focus:border-blue-600 focus:outline-none"
          />
        </div>

        <div className="relative">
          <label htmlFor="endDate" className="text-sm text-gray-600">
            End Date
          </label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            required
            className="h-12 w-full rounded-md border border-gray-300 px-3 focus:border-blue-600 focus:outline-none"
          />
        </div>

        {/* Submit Button */}
        <div className="col-span-2 flex justify-end mt-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition"
          >
            Add Candidate
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddCandidate;
