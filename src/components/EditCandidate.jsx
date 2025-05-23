import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiInfo } from "react-icons/fi";
import { FaCircleCheck } from "react-icons/fa6";
import HomeNav from "./HomeNav";

const API_BASE_URL = "http://192.168.0.225:8082";

const EditCandidate = () => {
  const [formData, setFormData] = useState({
    sNo: "",
    mode: "",
    name: "",
    skill: "",
    projectsShadow: "",
    experience: "",
    nda: "",
    cvReady: "",
    linkedin: "",
    dateOfNDA: "",
    notary: "",
    affidavit: "",
    salaryOnDeployed: "",
    salaryOnBench: "",
    readyToTravel: "",
    email: "",
    mobileNum: "",
  });

  const [showModal, setShowModal] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCandidate = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/get/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching candidate:", error);
      }
    };

    fetchCandidate();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_BASE_URL}/update/${id}`, formData);
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
        navigate("/candidates");
      }, 2000);
    } catch (error) {
      console.error("Error updating candidate:", error);
    }
  };

  return (
    <div className="p-6">
      <HomeNav />

      <p className="mb-4 flex items-center rounded-md bg-blue-100 p-3 text-gray-600">
        <FiInfo className="mr-2" />
        Use this form to edit the candidate's information in the organization.
      </p>

      <h2 className="mb-4 text-2xl font-semibold">Edit Candidate</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        {[
          { label: "S.No", name: "sNo" },
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
              disabled={name === "sNo"}
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

        <div className="col-span-2 text-right">
          <button
            type="submit"
            className="group relative inline-block w-[220px] cursor-pointer overflow-hidden rounded-md bg-blue-500 px-4 py-2 text-[17px] text-white transition-all duration-500"
          >
            <span className="relative inline-block pr-0 transition-all duration-500 group-hover:pr-4">
              Update Candidate
              <span className="absolute right-[-15px] top-0 opacity-0 transition-all duration-500 group-hover:right-0 group-hover:opacity-100">
                »
              </span>
            </span>
          </button>
        </div>
      </form>

      {/* Alert Modal */}
      {showModal && (
        <div className="insert-0 fixed left-1/3 top-0 z-50 mt-4 items-center justify-center bg-opacity-50">
          <div className="flex w-[500px] justify-center rounded-2xl border border-green-400 bg-green-100 py-6 text-center text-sm font-medium text-green-700">
            <div className="flex items-center justify-center gap-2">
              <FaCircleCheck className="text-lg text-green-500" />
              <span>
                Edited candidate successfully! Redirecting to Table page...
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditCandidate;
