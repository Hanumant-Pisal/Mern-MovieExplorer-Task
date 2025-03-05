import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); 
  const [errorMessage, setErrorMessage] = useState(""); 
  const [isLoading, setIsLoading] = useState(false); 
  const navigate = useNavigate();

  
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    return regex.test(email);
  };

  const handleRegister = async () => {
    
    if (!validateEmail(email)) {
      setErrorMessage("Invalid Details.");
      return; 
    }

    setIsLoading(true); 
    setErrorMessage(""); 
    setSuccessMessage(""); 

    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        username,
        email,
        password,
      });
      setSuccessMessage("Registration successful! Redirecting to login..."); 
      setTimeout(() => {
        navigate("/login"); 
      }, 2000); 
    } catch (err) {
      if (err.response) {
     
        if (err.response.status === 400) {
          setErrorMessage("Invalid input. Please check your details.");
        } 
        
      } 
      console.error("Registration failed:", err);
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-black mb-6">Sign Up</h1>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            onClick={handleRegister}
            disabled={isLoading} 
            className="w-full p-3 bg-black text-white rounded-lg hover:bg-zinc-900 cursor-pointer transition-all duration-300"
          >
            {isLoading ? "Signing Up..." : "Sign Up"} 
          </button>
          {successMessage && ( 
            <p className="text-center text-green-600 mt-4">{successMessage}</p>
          )}
          {errorMessage && ( 
            <p className="text-center text-red-600 mt-4">{errorMessage}</p>
          )}
          <p className="text-center text-gray-600 mt-4">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")} 
              className="text-blue-600 hover:underline cursor-pointer"
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;