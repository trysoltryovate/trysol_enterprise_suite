import React, { useState } from "react";
import axios from "axios";
import { FiInfo } from "react-icons/fi";
import { FaCircleCheck } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import HomeNav from "./HomeNav";

const API_BASE_URL = "http://192.168.0.224:8082/asset";

function AssetsAddCandidate() {
  const [formData, setFormData] = useState({
    employeeId: "",
    employeeName: "",
    department: "",
    assignedDate: "",
    assetType: "",
    make: "",
    processor: "",
    ram: "",
    hardDisk: "",
    charger: "",
    chargerWatt: "",
    bag: "",
    modelNumber: "",
    serialNumber: "",
    issuedItPersonName: "",
    approvedBy: "",
    location: "",
    mobileNumber: "",
  });

  const [validationErrors, setValidationErrors] = useState({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (validationErrors[name]) {
      setValidationErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (typeof value === "string" && value.trim() === "") {
        newErrors[key] = "This field is required";
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setValidationErrors(newErrors);
      return;
    }

    try {
      const response = await axios.post(
        `${API_BASE_URL}/assign-asset`,
        formData,
      );
      console.log("Response:", response.data);
      setShowSuccessModal(true);

      setTimeout(() => {
        setShowSuccessModal(false);
        navigate("/assets-table");
      }, 3000);
    } catch (error) {
      console.error("Backend error response:", error.response?.data);

      const errorData = error?.response?.data;
      const newErrors = {};

      if (typeof errorData === "string") {
        if (/email/i.test(errorData))
          newErrors.email = "Email is already registered";
        if (/linkedin/i.test(errorData))
          newErrors.linkedin = "LinkedIn is already registered";
        if (/mobile|phone/i.test(errorData))
          newErrors.mobileNum = "Mobile number is already registered";
      } else if (typeof errorData === "object") {
        if (errorData.email) newErrors.email = errorData.email;
        if (errorData.linkedin) newErrors.linkedin = errorData.linkedin;
        if (errorData.mobileNum || errorData.phone)
          newErrors.mobileNum = errorData.mobileNum || errorData.phone;
      } else {
        alert("Something went wrong. Please try again.");
      }

      if (Object.keys(newErrors).length > 0) {
        setValidationErrors((prev) => ({ ...prev, ...newErrors }));
      }
    }
  };

  // Fields list
  const fields = [
    { label: "Employee ID", name: "employeeId" },
    { label: "Employee Name", name: "employeeName" },
    { label: "Department", name: "department" },
    { label: "Assigned Date", name: "assignedDate", type: "date" },
    { label: "Asset Type", name: "assetType" },
    { label: "Make", name: "make" },
    { label: "Processor", name: "processor" },
    { label: "RAM", name: "ram" },
    { label: "Hard Disk", name: "hardDisk" },
    {
      label: "Charger",
      name: "charger",
      type: "select",
      options: ["Yes", "No"],
    },
    { label: "Charger Watt", name: "chargerWatt" },
    { label: "Bag", name: "bag", type: "select", options: ["Yes", "No"] },
    { label: "Model Number", name: "modelNumber" },
    { label: "Serial Number", name: "serialNumber" },
    { label: "Issued IT Person Name", name: "issuedItPersonName" },
    { label: "Approved By", name: "approvedBy" },
    { label: "Location", name: "location" },
    { label: "Mobile Number", name: "mobileNumber" },
  ];

  return (
    <div className="bg-white p-6 shadow-md">
      <HomeNav />
      <p className="mb-4 flex items-center rounded-md bg-blue-100 p-3 text-gray-600">
        <FiInfo className="mr-2" />
        Use this form to add a new asset to the organization.
      </p>
      <h2 className="mb-4 text-xl font-semibold">Add New Asset</h2>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="grid grid-cols-2 gap-4 rounded-md bg-white p-4 shadow-md"
      >
        {fields.map(({ label, name, type = "text", options }) => (
          <div className="relative" key={name}>
            <label htmlFor={name} className="text-sm text-gray-600">
              {label} <span className="text-red-500">*</span>
            </label>
            {type === "select" ? (
              <select
                id={name}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className={`h-12 w-full rounded-md border px-3 focus:outline-none ${
                  validationErrors[name]
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-300 focus:border-blue-600"
                }`}
              >
                <option value="">Select</option>
                {options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={type}
                id={name}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className={`h-12 w-full rounded-md border px-3 focus:outline-none ${
                  validationErrors[name]
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-300 focus:border-blue-600"
                }`}
                placeholder={label}
              />
            )}
            {validationErrors[name] && (
              <p className="mt-1 text-sm text-red-500">
                {validationErrors[name]}
              </p>
            )}
          </div>
        ))}

        <div className="col-span-2 mt-4 flex justify-end">
          <button
            type="submit"
            className="group relative inline-block w-[180px] cursor-pointer overflow-hidden rounded-md bg-blue-500 px-4 py-2 text-[17px] text-white transition-all duration-500"
          >
            <span className="relative inline-block pr-0 transition-all duration-500 group-hover:pr-4">
              Add Asset
              <span className="absolute right-[-15px] top-0 opacity-0 transition-all duration-500 group-hover:right-0 group-hover:opacity-100">
                »
              </span>
            </span>
          </button>
        </div>
      </form>

      {showSuccessModal && (
        <div className="fixed left-1/3 top-0 z-50 mt-4 flex items-center justify-center bg-opacity-50">
          <div className="flex w-[500px] justify-center rounded-2xl border border-green-400 bg-green-100 py-6 text-center text-sm font-medium text-green-700">
            <div className="flex items-center justify-center gap-2">
              <FaCircleCheck className="text-lg text-green-500" />
              <span>Asset added successfully!</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AssetsAddCandidate;
