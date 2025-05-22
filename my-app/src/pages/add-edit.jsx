import { useEffect, useState } from "react";
import api from "../api/api";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import Navbar from "../components/navbar";

const initialForm = {
  name: "",
  facility: "",
  roomCapacity: 0,
  imgUrl: "",
  location: "",
  price: 0,
  TypeId: 0,
};

export default function AddEdit({ dataToEdit, setDataToEdit }) {
  const isEdit = dataToEdit ? true : false;
  const [form, setForm] = useState(initialForm);
  const [types, setTypes] = useState([]);
  const navigate = useNavigate();

  const onChangeForm = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const createLodging = async () => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        navigate("/login");
        return Swal.fire({
          title: "Adding Failed",
          text: "Please login first!",
          icon: "error",
        });
      }
      const response = await api.post("/lodging", form);

      if (response) {
        Swal.fire({
          title: "Succes Added",
          text: response.data.message,
          icon: "success",
        });
        navigate("/");
      }
      if (!response) {
        throw "Invalid input";
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error",
        text: "Please fill all form",
        icon: "warning",
      });
    }
  };

  const updateLodging = async () => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        return Swal.fire({
          title: "Fail to edit",
          text: "Please login first",
          icon: "error",
        });
      }
      const response = await api.put(`/lodging/${form.id}`, form);
      setForm(initialForm);
      setDataToEdit(null);
      Swal.fire({
        title: "Success Edit",
        text: response.data.message,
        icon: "success",
      });
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const getTypes = async () => {
      const response = (await api.get("/type")).data;
      setTypes(response);
    };

    getTypes();
  }, []);

  useEffect(() => {
    if (dataToEdit) {
      setForm(dataToEdit);
    }
  }, [dataToEdit]);

  return (
    <div>
      <Navbar />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          isEdit ? updateLodging() : createLodging();
        }}
        className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">
          {isEdit ? "Edit Lodging" : "Add New Lodging"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-gray-700">Name</label>
            <input
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={form.name}
              onChange={(e) => onChangeForm("name", e.target.value)}
              placeholder="Enter lodging name"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Facility
            </label>
            <input
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={form.facility}
              onChange={(e) => onChangeForm("facility", e.target.value)}
              placeholder="Enter facilities"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Room Capacity
            </label>
            <input
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={form.roomCapacity}
              type="number"
              onChange={(e) => onChangeForm("roomCapacity", e.target.value)}
              placeholder="Enter room capacity"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Image URL
            </label>
            <input
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={form.imgUrl}
              onChange={(e) => onChangeForm("imgUrl", e.target.value)}
              placeholder="Enter image URL"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={form.location}
              onChange={(e) => onChangeForm("location", e.target.value)}
              placeholder="Enter location"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-gray-700">Price</label>
            <input
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              type="number"
              value={form.price}
              onChange={(e) => onChangeForm("price", e.target.value)}
              placeholder="Enter price"
            />
          </div>

          <div className="flex flex-col space-y-2 col-span-full">
            <label className="text-sm font-medium text-gray-700">Type</label>
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              disabled={!types?.length}
              value={form.TypeId}
              onChange={(e) => onChangeForm("TypeId", e.target.value)}
            >
              <option value="" disabled>
                Choose type
              </option>
              {types?.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            type="submit"
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium shadow-md hover:shadow-lg"
          >
            {isEdit ? "Update Lodging" : "Add Lodging"}
          </button>
        </div>
      </form>
    </div>
  );
}
