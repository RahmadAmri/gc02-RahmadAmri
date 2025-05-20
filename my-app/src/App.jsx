import { useState } from "react";
import "./App.css";
import Card from "./components/card";
import Navbar from "./components/navbar";

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
      <Navbar />

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
