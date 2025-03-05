import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../features/authSlice";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginSuccessMessage, setLoginSuccessMessage] = useState(""); 
  const [errorMessage, setErrorMessage] = useState(""); 
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    setErrorMessage(""); 
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        username,
        password,
      });
      localStorage.setItem("token", response.data.token);
      dispatch(loginSuccess({ username, email: response.data.email })); 
      setLoginSuccessMessage("Login Successful!"); 
      setTimeout(() => {
        navigate("/dashboard"); 
      }, 2000); 
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setErrorMessage("Invalid credentials. Please try again."); 
      } else {
        setErrorMessage("An error occurred. Please try again later."); 
      }
      console.error("Login failed:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-black mb-6">Login</h1>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleLogin}
            className="w-full p-3 bg-black text-white rounded-lg hover:bg-zinc-900 cursor-pointer transition-all duration-300"
          >
            Login
          </button>
          {loginSuccessMessage && ( 
            <p className="text-center text-green-600 mt-4">{loginSuccessMessage}</p>
          )}
          {errorMessage && ( 
            <p className="text-center text-red-600 mt-4">{errorMessage}</p>
          )}
          <p className="text-center text-gray-600 mt-4">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/register")} 
              className="text-blue-600 hover:underline cursor-pointer"
            >
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;