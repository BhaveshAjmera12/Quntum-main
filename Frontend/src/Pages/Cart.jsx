import React, { useEffect } from "react";
import { useCart } from "../context/CartContext";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const CartPage = () => {
  const { cart, fetchCart, token, dispatch } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      fetchCart();
    }
  }, [token]);

  const handleRemoveFromCart = async (product) => {
    try {
      await axios.delete(`http://localhost:4000/api/cart/remove/${product.product._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch({ type: "REMOVE_FROM_CART", payload: product.product._id });
    } catch (error) {
      console.error("Failed to remove item from cart:", error);
    }
  };

  const handleUpdateQuantity = async (product, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      await axios.put(
        `http://localhost:4000/api/cart/update-quantity`,
        { productId: product.product._id, quantity: newQuantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      dispatch({
        type: "UPDATE_QUANTITY",
        payload: { productId: product.product._id, quantity: newQuantity },
      });

      fetchCart(); 
    } catch (error) {
      console.error("Failed to update quantity:", error);
    }
  };

  const handleClearCart = async () => {
    try {
      await axios.delete("http://localhost:4000/api/cart/clear", {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch({ type: "CLEAR_CART" });
    } catch (error) {
      console.error("Failed to clear cart:", error);
    }
  };

  const totalPrice = (Array.isArray(cart) ? cart : []).reduce(
    (total, item) => total + (item.product.price ?? 0) * (item.quantity ?? 1),
    0
  );

  return (
    <div className="container mx-auto p-4 pt-32">
      <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
      {cart.length === 0 ? (
        <p className="text-lg">
          Your cart is empty. <Link to="/shop" className="text-blue-500">Continue shopping</Link>
        </p>
      ) : (
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 space-y-4">
            {cart.map((item) => (
              <div key={item.product._id} className="flex items-center bg-gray-100 p-4 rounded-lg shadow">
                <img className="w-[20vw] h-[30vh] object-cover rounded-lg" src={`http://localhost:4000${item.product.imageUrl}`} alt={item.product.name} />
                <div className="ml-4 flex-1">
                  <h3 className="text-xl font-semibold">{item.product.name}</h3>
                  <p className="text-gray-600">₹{(item.product.price * item.quantity).toFixed(2)}</p>
                  <div className="flex items-center mt-2 space-x-2">
                    <button className="px-3 py-1 bg-gray-300 rounded" onClick={() => handleUpdateQuantity(item, item.quantity - 1)}>-</button>
                    <span className="px-3">{item.quantity}</span>
                    <button className="px-3 py-1 bg-gray-300 rounded" onClick={() => handleUpdateQuantity(item, item.quantity + 1)}>+</button>
                  </div>
                </div>
                <button className="ml-auto bg-red-500 text-white px-3 py-1 rounded" onClick={() => handleRemoveFromCart(item)}>Remove</button>
              </div>
            ))}
          </div>
          <div className="w-1/3 p-6 bg-white shadow rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
            <p className="text-lg font-semibold mt-4">Total: ₹{totalPrice.toFixed(2)}</p>
            <div className="create-order mt-58 ">
            <Link to="/checkout">
                <button className="bg-blue-500 p-2 rounded-xl text-white font-[500] w-full">Create Order</button>
              </Link>
            </div>
          </div>
        </div>
      )}
      {cart.length > 0 && (
        <button className="fixed bottom-4 right-4 bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg" onClick={handleClearCart}>
          Clear Cart
        </button>
      )}
    </div>
  );
};

export default CartPage;
