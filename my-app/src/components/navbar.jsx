import { NavLink, useNavigate } from "react-router";

export default function Navbar() {
  const { handleLogout, handleLogin, handleAdd } = useNavigate();

  return (
    <div className="navbar bg-primary text-primary-content shadow-sm mb-10">
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
              <NavLink to="/login" end>
                <a
                  onClick={() => {
                    localStorage.removeItem("access_token");
                    handleLogout("/login");
                  }}
                >
                  Logout
                </a>
              </NavLink>
            </li>
            <li>
              <NavLink to="/" end>
                <a
                  onClick={() => {
                    handleLogin("/");
                  }}
                >
                  HomePage
                </a>
              </NavLink>
            </li>
            <li>
              <NavLink to="/add" end>
                <a
                  onClick={() => {
                    handleAdd("/add-edit");
                  }}
                >
                  Add Lodging
                </a>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <a className="btn btn-ghost text-xl text-primary-content">Mami Kos</a>
      </div>
      <div className="navbar-end"></div>
    </div>
  );
}
