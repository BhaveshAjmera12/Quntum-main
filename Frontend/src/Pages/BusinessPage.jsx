import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BusinessPage = () => {
  const [businessLaptops, setBusinessLaptops] = useState([]);
  const { token, fetchCart } = useCart();
  const navigate = useNavigate();

  const fetchBusinessLaptops = async () => {
    try {
      const response = await axios.get("http://localhost:4000/products");
      const filteredLaptops = response.data.products.filter(
        (product) =>
          product.category.toLowerCase() === "business" ||
          product.category.toLowerCase() === "business laptop"
      );
      setBusinessLaptops(filteredLaptops);
    } catch (error) {
      console.error("Error fetching business laptops:", error);
    }
  };

  useEffect(() => {
    fetchBusinessLaptops();
  }, []);

  const handleAddToCart = async (productId) => {
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      await axios.post(
        "http://localhost:4000/api/cart",
        { productId, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      fetchCart();
      toast.success("🛒 Product successfully added to cart!", {
        position: "top-right",
        autoClose: 2000,
        theme: "colored",
      });
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("⚠️ Failed to add product! Try again.", {
        position: "top-right",
        autoClose: 2000,
        theme: "colored",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-32">
      <h1 className="text-3xl font-bold mb-6 text-center">Business Laptops</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {businessLaptops.map((product) => (
          <div key={product._id} className="bg-white border-2 border-black shadow-md rounded-lg p-4">
            <img
              src={`http://localhost:4000${product.imageUrl}`}
              alt={product.name}
              className="w-full h-[250px] object-cover rounded-lg"
            />
            <h2 className="text-xl font-semibold mt-2">{product.name}</h2>
            <p className="text-gray-600 mt-1">{product.brand}</p>
            <p className="text-gray-800 font-bold text-lg mt-2">₹{product.price}</p>
            <p className="text-gray-500 text-sm mt-1">{product.description}</p>
            <div className="mt-4 flex justify-between items-center">
              <Link to={`/product/${product._id}`} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                View Details
              </Link>
              <button onClick={() => handleAddToCart(product._id)} className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BusinessPage;
