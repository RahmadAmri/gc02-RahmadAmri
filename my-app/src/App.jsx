import { useState } from "react";
import "./App.css";
import Card from "./components/card";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (el) => {
    el.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!email) {
        localStorage.removeItem("access_token");
        return alert("Email is required");
      }
      if (!password) {
        localStorage.removeItem("access_token");
        return alert("Password is required");
      }

      const data = await response.json();

      if (data.token) {
        localStorage.setItem("access_token", data.token);
        return alert("Succes Login");
      } else {
        localStorage.removeItem("access_token");
        return alert("Invalid Email or Password");
      }
    } catch (error) {
      console.error(error);
    }
  };

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

          <form onSubmit={handleLogin}>
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
          </form>
        </fieldset>
      </div>

      {/* Cards Grid */}
      <Card />
    </div>
  );
}

export default App;
