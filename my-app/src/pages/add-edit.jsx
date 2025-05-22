import { useEffect, useState } from "react";
import api from "../api/api";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const initialForm = {
  name: "",
  facility: "",
  roomCapacity: 0,
  imgUrl: "",
  location: "",
  price: 0,
  TypeId: 0,
};

export default function AddEdit({ getAllData, dataToEdit, setDataToEdit }) {
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
      getAllData();
      setForm(initialForm);
      setDataToEdit(null);
      Swal.fire({
        title: "Success Edit",
        text: response.data.message,
        icon: "success",
      });
    } catch (error) {
      console.error(error);
      alert("");
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
    <form
      onSubmit={(e) => {
        e.preventDefault();
        isEdit ? updateLodging() : createLodging();
      }}
      className="grid grid-cols-2 gap-4 mb-6"
    >
      <div className="flex flex-col">
        <label>Name</label>
        <input
          value={form.name}
          onChange={(e) => onChangeForm("name", e.target.value)}
        />
      </div>
      <div className="flex flex-col">
        <label>Facility</label>
        <input
          value={form.facility}
          onChange={(e) => onChangeForm("facility", e.target.value)}
        />
      </div>

      <div className="flex flex-col">
        <label>Room Capacity</label>
        <input
          value={form.roomCapacity}
          type="number"
          onChange={(e) => onChangeForm("roomCapacity", e.target.value)}
        />
      </div>
      <div className="flex flex-col">
        <label>Image Url</label>
        <input
          value={form.imgUrl}
          onChange={(e) => onChangeForm("imgUrl", e.target.value)}
        />
      </div>

      <div className="flex flex-col">
        <label>Location</label>
        <input
          value={form.location}
          onChange={(e) => onChangeForm("location", e.target.value)}
        />
      </div>

      <div className="flex flex-col">
        <label>Price</label>
        <input
          type="number"
          value={form.price}
          onChange={(e) => onChangeForm("price", e.target.value)}
        />
      </div>
      <div className="flex flex-col col-span-2">
        <label>Type</label>
        <select
          disabled={!types?.length}
          value={form.TypeId}
          onChange={(e) => onChangeForm("TypeId", e.target.value)}
        >
          <option disabled>Choose type</option>
          {types?.map((e) => {
            return (
              <option key={e.id} value={e.id}>
                {e.name}
              </option>
            );
          })}
        </select>
      </div>

      <button
        type="submit"
        className=" bg-blue-600 text-white h-9 rounded-full w-fit mx-auto px-6 col-span-2"
      >
        {isEdit ? "Update" : "Add"}
      </button>
    </form>
  );
}
