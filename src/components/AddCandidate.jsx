/* eslint-disable simple-import-sort/imports */
import React, { useState } from "react";
import axios from "axios";
import { FiInfo } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "http://192.168.0.224:8082";

function AddCandidate() {
  const [formData, setFormData] = useState({
    // sNo: "",
    mode: "",
    name: "",
    skill: "",
    projectsShadow: "",
    experience: "",
    nda: "",
    cvReady: "",
    linkedin: "", // Ensure this matches the state
    dateOfNDA: "",
    notary: "",
    affidavit: "",
    salaryOnDeployed: "",
    salaryOnBench: "",
    readyToTravel: "",
    email: "",
    mobile: "", // Changed from mobileNum to phone to match the input name
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
    console.log("Form submitted:", formData); // Debugging line
    try {
      const response = await axios.post(
        `${API_BASE_URL}/employee-save`,
        formData,
      );
      console.log("Response:", response.data); // Log the response for debugging
      navigate("/candidates"); // redirect to candidate list
    } catch (error) {
      console.error(
        "Error adding candidate:",
        error.response ? error.response.data : error.message,
      );
    }
  };

  return (
    <div className="bg-white p-6 shadow-md">
      <p className="mb-4 flex items-center rounded-md bg-blue-100 p-3 text-gray-600">
        <FiInfo className="mr-2" />
        Use this form to add a new candidate to the organization.
      </p>
      <h2 className="mb-4 text-xl font-semibold">Add New Candidate</h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-2 gap-4 rounded-md bg-white p-4 shadow-md"
      >
        {/* Text Fields */}
        {[
          // { label: "S.No", name: "sNo" },
          { label: "Mode", name: "mode" },
          { label: "Name", name: "name" },
          { label: "Skill", name: "skill" },
          { label: "Projects/Shadow", name: "projectsShadow" },
          { label: "Experience", name: "experience" },
          { label: "NDA", name: "nda" },
          { label: "CV Ready", name: "cvReady" },
          { label: "Linked In", name: "linkedin" },
          { label: "Date of NDA", name: "dateOfNDA", type: "date" },
          { label: "Notary", name: "notary" },
          { label: "Affidavit", name: "affidavit" },
          { label: "Salary On Deployed", name: "salaryOnDeployed" },
          { label: "Salary on Bench", name: "salaryOnBench" },
          { label: "Ready to Travel", name: "readyToTravel" },
          { label: "Email", name: "email", type: "email" },
          { label: "Mobile No", name: "mobileNum", type: "number" },
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

        {/* Submit Button */}
        <div className="col-span-2 mt-4 flex justify-end">
          <button
            type="submit"
            className="group relative inline-block w-[180px] cursor-pointer overflow-hidden rounded-md bg-blue-500 px-4 py-2 text-[17px] text-white transition-all duration-500"
          >
            <span className="relative inline-block pr-0 transition-all duration-500 group-hover:pr-4">
              Add Candidate
              <span className="absolute right-[-15px] top-0 opacity-0 transition-all duration-500 group-hover:right-0 group-hover:opacity-100">
                »
              </span>
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddCandidate;
