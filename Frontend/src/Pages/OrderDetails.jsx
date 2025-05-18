import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OrderDetails = () => {
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLatestOrder = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await axios.get("http://localhost:4000/api/orders/latest", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.data.success) {
          throw new Error(response.data.message || "Failed to fetch order");
        }

        // console.log("Fetched latest order:", response.data.order);
        setOrder(response.data.order);
      } catch (error) {
        setError(error.response ? error.response.data.message : error.message);
        console.error("Error fetching order details:", error);
      }
    };

    fetchLatestOrder();
     toast.success("🛒 order placed successfully!", {
                  position: "top-right",
                  autoClose: 2000,
                  theme: "colored",
                });
  }, [navigate]);

  const handleDownloadInvoice = () => {
    if (!order) return;
    
    const invoiceContent = `
      Order Invoice
      ----------------------
      Order ID: ${order._id}

      User: ${order.user?.name} (${order.user?.email})

      Shipping Address: 
      ${order.shippingDetails?.address}, ${order.shippingDetails?.city}, ${order.shippingDetails?.postalCode}, ${order.shippingDetails?.country}

      Payment Method: ${order.paymentMethod}

      Products:
      ${order.products.map(p => `${p.product?.name || "Unknown Product"}- Brand:${p.product?.brand || "Unknown Product"} - Quantity: ${p.quantity} - Price: ₹${p.product?.price * p.quantity} -shipping prize:50`).join("\n")}

      Total Price: ₹${order.totalPrice}
    `;

    const blob = new Blob([invoiceContent], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Order_${order._id}_Invoice.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container mx-auto px-4 py-28">
      <h1 className="text-3xl font-bold mb-4">Order Details</h1>

      {error && <p className="text-red-500">{error}</p>}

      {order ? (
        <div className="bg-white p-6 shadow rounded-lg">
          <p className="text-lg font-semibold">Order ID: {order._id}</p>
          <p><strong>User:</strong> {order.user?.name} ({order.user?.email})</p>
          <p>
            <strong>Shipping Address:</strong> 
            {order.shippingDetails?.address}, {order.shippingDetails?.city}, 
            {order.shippingDetails?.postalCode}, {order.shippingDetails?.country}
          </p>
          {/* <p><strong>PhoneNumber:</strong> {order.shippingDetails?.PhoneNumber}</p> */}
          <p><strong>Payment Method:</strong> {order.paymentMethod}</p>

          <h2 className="text-2xl font-bold mt-4">Products</h2>
          {order.products.map((p, index) => (
            <div key={index} className="border-b pb-2 mb-2">
              <p><strong>{p.product?.name || "Unknown Product"}</strong></p>
              <p><strong>{p.product?.brand || "Unknown Product"}</strong></p>
              <p>Quantity: {p.quantity}</p>
              <p>Price: ₹{p.product?.price * p.quantity}</p>
            </div>
          ))}

          <p className="text-xl font-bold mt-4">Total Price: ₹{order.totalPrice}</p>

          <button
            onClick={handleDownloadInvoice}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Download Invoice
          </button>
        </div>
      ) : (
        <p className="text-gray-500">Fetching order details...</p>
      )}
    </div>
  );
};

export default OrderDetails;
