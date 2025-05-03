import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const apiUrl = "http://localhost:3000/api";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      alert("Not logged in! Redirecting...");
      navigate("/login");
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await fetch(`${apiUrl}/admin/dashboard`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error("Failed to fetch orders");
        const data = await response.json();
        setOrders(data.orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [navigate, token]);

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-5">Manage Orders</h1>
      {orders.length > 0 ? (
        orders.map((order) => (
          <div key={order.id} className="bg-white p-5 rounded-lg shadow-md mb-2">
            <p><strong>Product:</strong> {order.product_name}</p>
            <p><strong>Consumer:</strong> {order.consumer_name}</p>
            <p><strong>Status:</strong> {order.status}</p>
          </div>
        ))
      ) : (
        <p>No orders placed yet.</p>
      )}
    </div>
  );
}

export default AdminOrders;
