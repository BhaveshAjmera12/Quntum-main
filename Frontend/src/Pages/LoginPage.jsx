import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useCart } from "../context/CartContext";

const LoginPage = ({ isRegister }) => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();
  const { login } = useCart(); // Get login function from context

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isRegister ? "/register" : "/login";
      const { data } = await axios.post(`http://localhost:4000/user${endpoint}`, formData);

      if (isRegister) {
        toast.success("Registration successful! Please login.");
        navigate("/login");
      } else {
        login(data.token); // Save token via context
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 relative">
      {/* Home Button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-4 right-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Home
      </button>

      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-700 mb-6">
          {isRegister ? "Register" : "Login"}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {isRegister ? "Register" : "Login"}
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          {isRegister ? "Already have an account? " : "Need an account? "}
          <Link to={isRegister ? "/login" : "/register"} className="text-blue-500 hover:underline">
            {isRegister ? "Login" : "Register"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
