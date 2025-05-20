import { useEffect, useState } from "react";
import api from "../api/api";

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

  const onChangeForm = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const createLodging = async () => {
    try {
      await api.post("/lodging", form);
      getAllData();
    } catch (error) {
      console.log(error);
      alert("");
    }
  };

  const updateLodging = async () => {
    try {
      await api.put(`/lodging/${form.id}`, form);
      getAllData();
      setForm(initialForm);
      setDataToEdit(null);
    } catch (error) {
      console.log(error);
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
      <input
        required
        value={form.name}
        onChange={(e) => onChangeForm("name", e.target.value)}
      />
      <input
        required
        value={form.facility}
        onChange={(e) => onChangeForm("facility", e.target.value)}
      />
      <div className="flex flex-col">
        <label htmlFor="roomCapacity">Room Capacity</label>
        <input
          required
          id="roomCapacity"
          value={form.roomCapacity}
          type="number"
          onChange={(e) => onChangeForm("roomCapacity", e.target.value)}
        />
      </div>
      <input
        required
        value={form.imgUrl}
        onChange={(e) => onChangeForm("imgUrl", e.target.value)}
      />
      <input
        required
        value={form.location}
        onChange={(e) => onChangeForm("location", e.target.value)}
      />
      <input
        required
        type="number"
        value={form.price}
        onChange={(e) => onChangeForm("price", e.target.value)}
      />
      <select
        required
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
      <button type="submit" className="col-span-2">
        {isEdit ? "Update" : "Add"}
      </button>
    </form>
  );
}
