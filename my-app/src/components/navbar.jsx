import { NavLink, useNavigate } from "react-router";

export default function Navbar() {
  const { handleLogout, handleLogin, handleAdd } = useNavigate();

  return (
    <div className="navbar bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg mb-10">
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle hover:bg-blue-700/50 transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
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
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg bg-white rounded-lg w-52 border border-gray-100"
          >
            <li>
              <NavLink 
                to="/login" 
                end
                className="text-red-600 hover:bg-red-50 rounded-md transition-colors duration-200"
                onClick={() => {
                  localStorage.removeItem("access_token");
                  handleLogout("/login");
                }}
              >
                Logout
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/" 
                end
                className="text-gray-700 hover:bg-gray-50 hover:text-blue-600 rounded-md transition-colors duration-200"
                onClick={() => handleLogin("/")}
              >
                HomePage
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/add-edit" 
                end
                className="text-gray-700 hover:bg-gray-50 hover:text-blue-600 rounded-md transition-colors duration-200"
                onClick={() => handleAdd("/add-edit")}
              >
                Add Lodging
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <a className="text-2xl font-bold tracking-wide hover:text-blue-200 transition-colors duration-200">
          Mami Kos
        </a>
      </div>
      <div className="navbar-end"></div>
    </div>
  );
}
