import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutSuccess } from "../features/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user); // Get user details from Redux store
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown visibility

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logoutSuccess());
    navigate("/login");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="bg-zinc-900 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          Movie Explorer
        </Link>
        <div className="flex gap-4 items-center">
          {isAuthenticated ? (
            <>
              {/* User Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center focus:outline-none"
                >
                  {/* Profile Icon */}
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      ></path>
                    </svg>
                  </div>
                  {/* Username */}
                  <span className="ml-2">{user?.username}</span>
                  {/* Dropdown Arrow */}
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </button>
                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-lg">
                    <div className="p-4 border-b">
                      <p className="font-semibold">{user?.username}</p>
                      <p className="text-sm text-gray-600">{user?.email}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className=" border border-blue-600 px-4 py-1 w-18 rounded hover:bg-white hover:text-black transition-all duration-300">Login</Link>
              <Link to="/register" className=" bg-blue-600 px-3 py-1 rounded hover:bg-white hover:text-black transition-all duration-300 ">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;