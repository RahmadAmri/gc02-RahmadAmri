import { useEffect, useState } from "react";
import api from "../api/api";
import { useDebounce } from "@uidotdev/usehooks";

export default function Card() {
  const [result, setResult] = useState([]);
  const [q, setQ] = useState("");
  const debouncedQ = useDebounce(q, 1500);

  const handleDelete = async (id) => {
    try {
      const response = (await api.delete(`/lodging/${id}`)).data;
      alert(response?.message);
      await getPub();
    } catch (error) {
      console.log(error);
      alert("Failed to deleted");
    }
  };

  const getPub = async () => {
    try {
      const response = (await api.get(`/pub?search=${debouncedQ}`)).data;
      setResult(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPub();
  }, [debouncedQ]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <input value={q} onChange={(e) => setQ(e.target.value)} />
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
          <p className="text-lg">loading...</p>
        </div>
      )}
    </div>
  );
}
