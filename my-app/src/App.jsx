import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const getPub = async () => {
    const res = await fetch("http://localhost:3000/pub");
    setData(await res.json());
  };

  useEffect(() => {
    getPub();
  }, []);
  return (
    <div
      style={{
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        gap: "20px",
      }}
      className="flex justify-center"
    >
      {data?.data?.map((el) => {
        return (
          <div className="card bg-base-100 w-96 shadow-sm">
            <figure>
              <img
                style={{ objectFit: "cover", width: "100%", height: "300px" }}
                src={el.imgUrl}
                alt="Shoes"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{el.name}</h2>
              <p>{el.facility}</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Buy Now</button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default App;
