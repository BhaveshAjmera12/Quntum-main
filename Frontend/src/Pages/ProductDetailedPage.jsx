import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import gsap from 'gsap';
import { useCart } from '../context/CartContext';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const ProductDetailedPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const productRef = useRef(null);
  const { token, fetchCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:4000/products/${id}`)
      .then((response) => setProduct(response.data))
      .catch((error) => console.log("Error fetching product:", error));
  }, [id]);

  useEffect(() => {
    if (product) {
      gsap.from(productRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out',
      });
    }
  }, [product]);

  const handleAddToCart = async () => {
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      await axios.post(
        "http://localhost:4000/api/cart",
        { productId: id, quantity: 1 },
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

  if (!product) return <div className="text-center py-20 text-xl font-semibold">Loading...</div>;

  return (
    <div className="py-32">
      <div className="product-details flex flex-row items-start justify-center px-10 max-w-5xl mx-auto shadow-lg rounded-lg bg-white border-2 py-10 border-black" ref={productRef}>
        
        <div className="w-1/2 flex flex-col items-start">
          <img 
            className='w-[30vw] h-[44vh] object-cover rounded-lg'  
            src={`http://localhost:4000${product.imageUrl}`} 
            alt={product.name} 
          />
          <h2 className="text-2xl font-bold mt-5">{product.name}</h2>
          <p className="text-lg text-gray-700 mt-2">{product.description}</p>
        </div>

        <div className="w-1/2 flex flex-col items-start pl-10">
          <p className="text-xl font-semibold text-gray-800">Price: ₹{new Intl.NumberFormat('en-IN').format(product.price)}</p>
          <p><strong>Brand:</strong> {product.brand}</p>
          <p><strong>Processor:</strong> {product.processor}</p>
          <p><strong>RAM:</strong> {product.ram}</p>
          <p><strong>Storage:</strong> {product.storage}</p>
          <p><strong>Display:</strong> {product.displaySize}</p>
          <p><strong>Graphics Card:</strong> {product.graphicsCard}</p>
          <p><strong>Operating System:</strong> {product.operatingSystem}</p>
          <p><strong>Stock Available:</strong> {product.stock}</p>
          <p><strong>Category:</strong> {product.category}</p>

          {/* Add to Cart Button with functionality */}
          <button 
            onClick={handleAddToCart}
            className="mt-5 bg-blue-600 text-white px-6 py-2 rounded-lg text-lg font-semibold hover:bg-blue-700"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailedPage;
