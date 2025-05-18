import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
  const { cart, dispatch } = useCart();
  const navigate = useNavigate(); 
  
  const [shippingDetails, setShippingDetails] = useState({
    name: '',
    PhoneNumber: '',
    email: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    landmark: '',
    deliveryInstructions: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('COD');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingDetails({ ...shippingDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // **Check if cart is empty**
    if (cart.length === 0) {
      alert("Cart is empty! Please add products before placing an order.");
      return;
    }

    const orderData = {
      shippingDetails,
      products: cart.map((item) => ({
        product: item.product._id,
        quantity: item.quantity
      })),
      totalPrice: cart.reduce((total, item) => total + item.product.price * item.quantity, 0) + 50,
      paymentMethod,
    };

    try {
      const response = await fetch('http://localhost:4000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(orderData)
      });

      if (!response.ok) {
        throw new Error('Failed to place order');
      }

      await fetch('http://localhost:4000/api/cart/clear', {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      dispatch({ type: 'CLEAR_CART' });

      navigate('/orderdetail');

    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  const totalPrice = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const shippingFee = 50;
  const grandTotal = totalPrice + shippingFee;

  return (
    <div className="checkout-page container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Checkout</h1>
      <div className="flex gap-6">
        <div className="w-1/2 bg-gray-100 p-4 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
          <div className="divide-y divide-gray-300">
            {cart.map((item) => (
              <div key={item.product._id} className="flex items-center gap-4 py-3">
                <img className="w-[30vw] h-[35vh] object-cover rounded" src={`http://localhost:4000${item.product.imageUrl}`} alt={item.product.name} />
                <div>
                  <h3 className="text-lg font-semibold">{item.product.name}</h3>
                  <p>{item.product.processor} | {item.product.ram} RAM | {item.product.storage} Storage</p>
                  <p>₹{item.product.price} x {item.quantity} = ₹{(item.product.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
          <h3 className="text-lg font-semibold mt-4">Shipping Fee: ₹{shippingFee.toFixed(2)}</h3>
          <h3 className="text-xl font-bold mt-2 text-green-600">Grand Total: ₹{grandTotal.toFixed(2)}</h3>
        </div>

        <div className="flex-1 bg-white p-6 shadow rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Shipping Details</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input className="w-full p-2 border rounded" type="text" name="name" placeholder="Full Name" value={shippingDetails.name} onChange={handleInputChange} required />
            <input className="w-full p-2 border rounded" type="text" name="phone" placeholder="Phone Number" value={shippingDetails.phone} onChange={handleInputChange} required />
            <input className="w-full p-2 border rounded" type="email" name="email" placeholder="Email Address" value={shippingDetails.email} onChange={handleInputChange} required />
            <input className="w-full p-2 border rounded" type="text" name="address" placeholder="Address" value={shippingDetails.address} onChange={handleInputChange} required />
            <input className="w-full p-2 border rounded" type="text" name="city" placeholder="City" value={shippingDetails.city} onChange={handleInputChange} required />
            <input className="w-full p-2 border rounded" type="text" name="state" placeholder="State" value={shippingDetails.state} onChange={handleInputChange} required />
            <input className="w-full p-2 border rounded" type="text" name="postalCode" placeholder="Postal Code" value={shippingDetails.postalCode} onChange={handleInputChange} required />
            <input className="w-full p-2 border rounded" type="text" name="country" placeholder="Country" value={shippingDetails.country} onChange={handleInputChange} required />

            <h2 className="text-2xl font-bold mt-4">Payment Method</h2>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input type="radio" name="payment" value="COD" checked={paymentMethod === 'COD'} onChange={() => setPaymentMethod('COD')} />
                <span>Cash on Delivery</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="radio" name="payment" value="Online" checked={paymentMethod === 'Online'} onChange={() => setPaymentMethod('Online')} />
                <span>Online Payment</span>
              </label>
            </div>

            {/* Checkout Button - Disabled if Cart is Empty */}
            <button 
              type="submit" 
              className={`w-full p-2 rounded-lg font-semibold mt-4 ${cart.length === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 text-white'}`} 
              disabled={cart.length === 0}
            >
              Place Order
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
