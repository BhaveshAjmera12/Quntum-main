import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { token, logout } = useCart();

  useEffect(() => {
    if (!token) {
      navigate("/login", { replace: true });
      return;
    }
    
    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:4000/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data.user);
      } catch (error) {
        console.error("Profile fetch error:", error.response?.data || error);
        logout();
        navigate("/login", { replace: true });
      }
    };

    fetchProfile();
  }, [navigate, token, logout]);

  if (!token) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-gray-700 mb-4">Profile Page</h1>
        {user ? (
          <div className="text-center">
            <p className="text-gray-600 mb-2"><span className="font-semibold">Name:</span> {user.name}</p>
            <p className="text-gray-600"><span className="font-semibold">Email:</span> {user.email}</p>

            <button
              onClick={() => {
                logout();
                navigate("/login", { replace: true });
              }}
              className="w-full mt-4 px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Logout
            </button>
          </div>
        ) : (
          <p className="text-center text-gray-500">Login first...</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
