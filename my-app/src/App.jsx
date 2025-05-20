import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [result, setResult] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const getPub = async () => {
    const res = await fetch("http://localhost:3000/pub");
    setResult(await res.json());
  };

  const detailPub = async (id) => {
    const res = await fetch(`http://localhost:3000/pub/${id}`);
    setResult(await res.json());
  };

  useEffect(() => {
    getPub();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Navbar */}
      <div className="navbar bg-primary text-primary-content shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle text-primary-content"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <a>Homepage</a>
              </li>
              <li>
                <a>Portfolio</a>
              </li>
              <li>
                <a>About</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <a className="btn btn-ghost text-xl text-primary-content">Mami Kos</a>
        </div>
        <div className="navbar-end">
          <button className="btn btn-ghost btn-circle text-primary-content">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
          <button className="btn btn-ghost btn-circle text-primary-content">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span className="badge badge-xs badge-primary indicator-item"></span>
            </div>
          </button>
        </div>
      </div>
      {/* Login Form */}
      <div className="flex justify-center mb-8">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-96 border p-4">
          <legend className="fieldset-legend">Login</legend>

          <label className="label">Email</label>
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            className="input input-bordered w-full"
            placeholder="Email"
          />

          <label className="label">Password</label>
          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            className="input input-bordered w-full"
            placeholder="Password"
          />

          <button type="submit" className="btn btn-neutral mt-4 w-full">
            Login
          </button>
        </fieldset>
      </div>

      {/* Cards Grid */}
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
                  <button onChange={detailPub} className="btn btn-primary">
                    Detail
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
    </div>
  );
}

export default App;
