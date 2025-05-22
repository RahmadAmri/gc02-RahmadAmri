import { useEffect, useState } from "react";
import api from "../api/api";
import Swal from "sweetalert2";
import Navbar from "../components/navbar";
import { NavLink, useNavigate } from "react-router";

export default function HomePage(dataToEdit, setDataToEdit) {
  const isEdit = dataToEdit ? true : false;
  const [result, setResult] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleEdit = async () => {
    try {
      const token = localStorage.getItem("access_token");
      if (token) {
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

  return (
    <div>
      <Navbar />
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            getPub();
          }}
          className="mb-6 flex justify-between items-center gap-4"
        >
          <input
            value={search}
            placeholder="Search by name..."
            onChange={(e) => setSearch(e.target.value)}
            className="h-9 w-full px-4 rounded-lg"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 h-9 rounded-md"
          >
            Search
          </button>
        </form>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {result?.data?.length ? (
            result.data.map((el, index) => (
              <div
                key={index}
                className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow"
              >
                <figure>
                  <img
                    className="w-full h-[300px] object-cover"
                    src={el.imgUrl}
                    alt={el.name}
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{el.name}</h2>
                  <p>{el.facility}</p>
                  <div className="card-actions justify-end">
                    <button
                      className="btn btn-secondary"
                      onClick={() => {
                        handleEdit(el.id);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        handleDelete(el.id);
                      }}
                      className="btn btn-primary"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center py-8">
              <p className="text-lg">....</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
