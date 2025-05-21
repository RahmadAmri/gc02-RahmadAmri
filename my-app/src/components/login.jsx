import { useState } from "react";
import Navbar from "../components/navbar";
import api from "../api/api";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (el) => {
    el.preventDefault();

    try {
      const response = await api.post("/login", {
        email,
        password,
      });

      if (!response) {
        throw "Invalid Email or Password";
      }

      if (!email && !password) {
        localStorage.removeItem("access_token");
        navigate("/login");
        Swal.fire({
          title: "error login",
          text: "email or password is required",
          icon: "error",
        });
      } else {
        Swal.fire({
          title: "Succes login",
          text: "Welcome Back",
          icon: "success",
        });
        localStorage.setItem("access_token", response.data.token);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      localStorage.removeItem("access_token");
      Swal.fire({
        title: "Error Login",
        text: error,
        icon: "error",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Navbar */}
      <Navbar />

      {/* Login Form */}
      <div className="flex justify-center mt-6 mb-8">
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

            <button type="submit" className="btn btn-primary mt-4 w-full">
              Login
            </button>
          </form>
        </fieldset>
      </div>

      {/* Cards Grid */}
    </div>
  );
}

export default Login;
