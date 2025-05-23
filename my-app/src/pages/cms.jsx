import { useEffect, useState } from "react";
import api from "../api/api";
import Navbar from "../components/navbar";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

export default function Cms() {
    const [lodgings, setLodgings] = useState([]);
    const [showCreateStaff, setShowCreateStaff] = useState(false);
    const [formData, setFormData] = useState({
        userName: "",
        email: "",
        password: "",
        phoneNumber: "",
        address: "",
        role: "Staff"
    });
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (!token) {
            navigate("/login");
            return;
        }
        fetchLodgings();
    }, []);

    const fetchLodgings = async () => {
        try {
            const token = localStorage.getItem("access_token");
            const response = await api.get("/pub", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response && response.data) {
                setLodgings(response.data.data || []);
            }
        } catch (error) {
            console.error(error);
            if (error.response?.status === 401) {
                localStorage.removeItem("access_token");
                navigate("/login");
            }
            Swal.fire({
                title: "Error",
                text: "Failed to fetch lodgings",
                icon: "error"
            });
        }
    };

    const handleEdit = (lodging) => {
        navigate(`/add-edit`, { state: { lodging } });
    };

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem("access_token");
            await api.delete(`/lodging/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            Swal.fire({
                title: "Success",
                text: "Lodging deleted successfully",
                icon: "success"
            });
            fetchLodgings();
        } catch (error) {
            console.error(error);
            if (error.response?.status === 401) {
                localStorage.removeItem("access_token");
                navigate("/login");
            }
            Swal.fire({
                title: "Error",
                text: "Failed to delete lodging",
                icon: "error"
            });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCreateStaff = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("access_token");
            const response = await api.post("/register", formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response) {
                Swal.fire({
                    title: "Success",
                    text: "Staff created successfully",
                    icon: "success"
                });
                setShowCreateStaff(false);
                setFormData({
                    userName: "",
                    email: "",
                    password: "",
                    phoneNumber: "",
                    address: "",
                    role: "Staff"
                });
            }
        } catch (error) {
            console.error(error);
            if (error.response?.status === 401) {
                localStorage.removeItem("access_token");
                navigate("/login");
            }
            Swal.fire({
                title: "Error",
                text: error.response?.data?.message || "Failed to create staff",
                icon: "error"
            });
        }
    };

    return (
        <div className="min-h-screen bg-gray-900">
            <Navbar />
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold text-white">
                        {showCreateStaff ? "Create Staff" : "List of Lodgings"}
                    </h1>
                    <div className="flex gap-4">
                        <button
                            onClick={() => setShowCreateStaff(!showCreateStaff)}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            {showCreateStaff ? "View Lodgings" : "Create Staff"}
                        </button>
                        {!showCreateStaff && (
                            <button
                                onClick={() => navigate("/add-edit")}
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            >
                                Create Lodging
                            </button>
                        )}
                    </div>
                </div>

                {showCreateStaff ? (
                    <div className="bg-gray-800 rounded-lg p-6">
                        <form onSubmit={handleCreateStaff} className="space-y-4">
                            <div>
                                <label className="block text-gray-300 mb-2">Username</label>
                                <input
                                    type="text"
                                    name="userName"
                                    value={formData.userName}
                                    onChange={handleChange}
                                    className="w-full bg-gray-700 text-white px-3 py-2 rounded"
                                    placeholder="Enter username"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-300 mb-2">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full bg-gray-700 text-white px-3 py-2 rounded"
                                    placeholder="Enter email"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-300 mb-2">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full bg-gray-700 text-white px-3 py-2 rounded"
                                    placeholder="Enter password"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-300 mb-2">Phone Number</label>
                                <input
                                    type="tel"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    className="w-full bg-gray-700 text-white px-3 py-2 rounded"
                                    placeholder="Enter phone number"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-300 mb-2">Address</label>
                                <textarea
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    className="w-full bg-gray-700 text-white px-3 py-2 rounded"
                                    placeholder="Enter address"
                                    required
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            >
                                Create
                            </button>
                        </form>
                    </div>
                ) : (
                    <div className="bg-gray-800 rounded-lg overflow-hidden">
                        <table className="w-full text-left text-gray-200">
                            <thead className="bg-gray-700 text-gray-300">
                                <tr>
                                    <th className="px-6 py-3">No</th>
                                    <th className="px-6 py-3">Name</th>
                                    <th className="px-6 py-3">Facility</th>
                                    <th className="px-6 py-3">Image</th>
                                    <th className="px-6 py-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {lodgings.map((lodging, index) => (
                                    <tr key={lodging.id} className="border-b border-gray-700">
                                        <td className="px-6 py-4">{index + 1}</td>
                                        <td className="px-6 py-4">{lodging.name}</td>
                                        <td className="px-6 py-4">{lodging.facility}</td>
                                        <td className="px-6 py-4">
                                            <img
                                                src={lodging.imgUrl}
                                                alt={lodging.name}
                                                className="w-20 h-20 object-cover rounded"
                                            />
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleEdit(lodging)}
                                                    className="text-blue-400 hover:text-blue-300"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(lodging.id)}
                                                    className="text-red-400 hover:text-red-300"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}