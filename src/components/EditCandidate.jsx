
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiInfo } from "react-icons/fi";

const API_BASE_URL = "http://192.168.0.224:8082";

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

    const { id } = useParams(); // Assuming sNo or id is passed as URL param
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
            navigate("/candidates");
        } catch (error) {
            console.error("Error updating candidate:", error);
        }
    };

    return (
        <div className="p-6">
            <p className="mb-4 flex items-center rounded-md bg-blue-100 p-3 text-gray-600">
                <FiInfo className="mr-2" />
                Use this form to edit the candidate's information in the organization.
            </p>
            <h2 className="mb-4 text-2xl font-semibold">Edit Candidate</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                {Object.entries(formData).map(([key, value]) => (
                    <div key={key} className="flex flex-col">
                        <label className="mb-1 capitalize">{key}</label>
                        <input
                            type="text"
                            name={key}
                            value={value}
                            onChange={handleChange}
                            className="h-12 w-full rounded-md border border-gray-300 px-3 focus:border-blue-600 focus:outline-none"
                        />
                    </div>
                ))}
                <div className="col-span-2 text-right">


                    <button
                        type="submit"
                        className="relative inline-block rounded-md bg-blue-500 text-white text-[17px] px-4 py-2 w-[220px] transition-all duration-500 cursor-pointer overflow-hidden group">
                        <span className="inline-block relative transition-all duration-500 pr-0 group-hover:pr-4">
                            Update Candidate
                            <span className="absolute opacity-0 right-[-15px] top-0 transition-all duration-500 group-hover:opacity-100 group-hover:right-0">
                                »
                            </span>
                        </span>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditCandidate;