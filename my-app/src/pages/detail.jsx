import { useEffect, useState } from "react";
import { useParams } from "react-router";
import api from "../api/api";
import Navbar from "../components/navbar";

export default function Detail() {
    const [lodging, setLodging] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchLodging = async () => {
            try {
                const response = await api.get(`/pub/${id}`);
                setLodging(response.data.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchLodging();
    }, [id]);

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-900 text-white p-8">
                <div className="container mx-auto">
                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Left side - Lodging Image */}
                        <div className="md:w-1/3">
                            <img
                                src={lodging?.imgUrl}
                                alt={lodging?.name}
                                className="w-full h-auto rounded-lg shadow-lg"
                            />
                        </div>

                        {/* Right side - Lodging Details */}
                        <div className="md:w-2/3">
                            <h1 className="text-4xl font-bold mb-4">{lodging?.name}</h1>
                            
                            {/* Type Badge */}
                            <div className="mb-4">
                                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                                    {lodging?.Type?.name}
                                </span>
                            </div>

                            {/* Description */}
                            <p className="text-gray-300 mb-6">
                                {lodging?.facility}
                            </p>

                            {/* Additional Details */}
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div>
                                    <h3 className="text-gray-400 text-sm">Location</h3>
                                    <p className="text-lg">{lodging?.location}</p>
                                </div>
                                <div>
                                    <h3 className="text-gray-400 text-sm">Room Capacity</h3>
                                    <p className="text-lg">{lodging?.roomCapacity} persons</p>
                                </div>
                                <div>
                                    <h3 className="text-gray-400 text-sm">Price</h3>
                                    <p className="text-lg">${lodging?.price}</p>
                                </div>
                                <div>
                                    <h3 className="text-gray-400 text-sm">Owner</h3>
                                    <p className="text-lg">{lodging?.User?.email}</p>
                                </div>
                            </div>

                            {/* Rating */}
                            <div className="flex items-center gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <svg
                                        key={star}
                                        className="w-5 h-5 text-yellow-400"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}