import { createContext, useContext, useEffect, useState, useReducer } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case "SET_CART":
      return action.payload || [];
    case "ADD_TO_CART":
      return [...state, action.payload];
    case "REMOVE_FROM_CART":
      return state.filter(item => item.product._id !== action.payload);
    case "UPDATE_QUANTITY":
      return state.map(item =>
        item.product._id === action.payload.productId
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
    case "CLEAR_CART":
      return [];
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, []);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const navigate = useNavigate();

  const fetchCart = async () => {
    if (!token) return;
    try {
      const { data } = await axios.get("http://localhost:4000/api/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch({ type: "SET_CART", payload: data.cart?.products || [] });
    } catch (error) {
      console.error("Error fetching cart", error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [token]);

  //  Login function to save token and fetch cart
  const login = (userToken) => {
    localStorage.setItem("token", userToken); // Save token in localStorage
    setToken(userToken); // Update state
    fetchCart(); // Fetch user's cart after login
    navigate("/profile"); // Redirect to profile after login
  };

  //  Logout function to clear token and cart
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    dispatch({ type: "CLEAR_CART" }); // Clear cart on logout
    navigate("/login", { replace: true });
  };

  return (
    <CartContext.Provider value={{ cart, fetchCart, token, dispatch, login, logout }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
