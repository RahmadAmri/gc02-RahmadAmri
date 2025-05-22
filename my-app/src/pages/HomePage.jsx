import { useEffect, useState } from "react";
import api from "../api/api";
import Swal from "sweetalert2";
import Navbar from "../components/navbar";
import { NavLink, useNavigate } from "react-router";
import Button from "../components/Button";

export default function HomePage({ setDataToEdit }) {
  const [result, setResult] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const handleEdit = async (lodging) => {
    try {
      const token = localStorage.getItem("access_token");
      if (token) {
        setDataToEdit(lodging);
        navigate("/add-edit");
      } else {
        Swal.fire({
          title: "Error Edit",
          text: "Please login first",
          icon: "error",
        });
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await api.delete(`/lodging/${id}`);
      const token = localStorage.getItem("access_token");

      if (!token) {
        Swal.fire({
          title: "Error Delete",
          text: "Please login first",
          icon: "error",
        });
        navigate("/login");
      }

      if (response) {
        Swal.fire({
          title: "Success delete",
          text: response.data.message,
          icon: "success",
        });
      } else {
        Swal.fire({
          title: "Error Delete",
          text: "Please login first",
          icon: "error",
        });
      }
      await getPub();
    } catch (error) {
      console.log(error);
    }
  };

  const getPub = async () => {
    try {
      const response = (await api.get(`/pub?search=${search}`)).data;
      setResult(response);

      if (!response.data.length) {
        Swal.fire({
          title: "Not Found",
          text: "There is no Lodging",
          icon: "error",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPub();
  }, []);

  const itemsPerPage = 6;
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentItems = result?.data?.slice(firstIndex, lastIndex) || [];
  const totalPages = Math.ceil((result?.data?.length || 0) / itemsPerPage);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            getPub();
            setCurrentPage(1);
          }}
          className="mb-8 max-w-2xl mx-auto"
        >
          <div className="relative flex items-center shadow-md rounded-lg overflow-hidden">
            <input
              value={search}
              placeholder="Search for lodgings..."
              onChange={(e) => setSearch(e.target.value)}
              className="w-full py-3 px-4 pr-12 border-0 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
            <Button
              type="submit"
              variant="primary"
              className="absolute right-0 h-full px-6 flex items-center justify-center"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </Button>
          </div>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentItems.length ? (
            currentItems.map((el, index) => (
              <div
                key={index}
                className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="relative">
                  <img
                    className="w-full h-[300px] object-cover group-hover:scale-105 transition-transform duration-300"
                    src={el.imgUrl}
                    alt={el.name}
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                    {el.name}
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {el.facility}
                  </p>
                  <div className="flex justify-end space-x-3">
                    <Button
                      onClick={() => handleEdit(el)}
                      variant="secondary"
                      className="flex items-center gap-2"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                      Edit
                    </Button>
                    <Button
                      type="button"
                      onClick={() => handleDelete(el.id)}
                      variant="danger"
                      className="flex items-center gap-2"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center py-16 bg-gray-50 rounded-xl">
              <svg
                className="w-16 h-16 mx-auto text-gray-400 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
              <p className="text-xl text-gray-600">No lodgings found</p>
            </div>
          )}
        </div>

        {/* Pagination Controls */}
        {result?.data?.length > 0 && (
          <div className="mt-8">
            <div className="flex justify-center items-center gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded ${
                  currentPage === 1
                    ? "bg-gray-200 text-gray-500"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                } transition-colors`}
              >
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 rounded ${
                      currentPage === page
                        ? "bg-blue-600 text-white"
                        : "bg-white text-blue-600 hover:bg-blue-50"
                    } transition-colors`}
                  >
                    {page}
                  </button>
                )
              )}

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded ${
                  currentPage === totalPages
                    ? "bg-gray-200 text-gray-500"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                } transition-colors`}
              >
                Next
              </button>
            </div>

            <div className="text-center text-gray-600 mt-4">
              Showing {firstIndex + 1} to{" "}
              {Math.min(lastIndex, result.data.length)} of {result.data.length}{" "}
              entries
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
