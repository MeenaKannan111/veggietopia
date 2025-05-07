
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Chatbot from "../components/chatbot";
import "./AdminDashboard.css";

const apiUrl = "http://localhost:3000/api";

function AdminDashboard() {
  const [admin, setAdmin] = useState(null);
  const [farmers, setFarmers] = useState([]);
  const [consumers, setConsumers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      alert("Not logged in! Redirecting...");
      navigate("/login");
      return;
    }

    const fetchAdminData = async () => {
      try {
        const response = await fetch(`${apiUrl}/admin/dashboard`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("Failed to fetch admin data");
        const data = await response.json();
        setAdmin(data.admin);
        setFarmers(data.farmers);
        setConsumers(data.consumers);
        setOrders(data.orders);
        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching admin data:", error);
      }
    };

    fetchAdminData();
  }, [token, navigate]);

  const handleRemoveFarmer = async (farmerId) => {
    try {
      const response = await fetch(`${apiUrl}/admin/remove-farmer/${farmerId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      alert(data.message);
      setFarmers(farmers.filter((f) => f.id !== farmerId));
    } catch (error) {
      console.error("Error removing farmer:", error);
    }
  };

  const handleRemoveConsumer = async (consumerId) => {
    try {
      const response = await fetch(`${apiUrl}/admin/remove-consumer/${consumerId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      alert(data.message);
      setConsumers(consumers.filter((c) => c.id !== consumerId));
    } catch (error) {
      console.error("Error removing consumer:", error);
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Chatbot from "../components/Chatbot";

// const apiUrl = "http://localhost:3000/api";

// function AdminDashboard() {
//   const [admin, setAdmin] = useState(null);
//   const [farmers, setFarmers] = useState([]);
//   const [consumers, setConsumers] = useState([]);
//   const [orders, setOrders] = useState([]);
//   const [products, setProducts] = useState([]);
//   const token = localStorage.getItem("token");
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!token) {
//       alert("Not logged in! Redirecting...");
//       navigate("/");
//       return;
//     }

//     const fetchAdminData = async () => {
//       try {
//         const response = await fetch(`${apiUrl}/admin/dashboard`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         if (!response.ok) throw new Error("Failed to fetch admin data");
//         const data = await response.json();
//         setAdmin(data.admin);
//         setFarmers(data.farmers);
//         setConsumers(data.consumers);
//         setOrders(data.orders);
//         setProducts(data.products);
//       } catch (error) {
//         console.error("Error fetching admin data:", error);
//       }
//     };

//     fetchAdminData();
//   }, [navigate, token]);

//   const handleRemoveFarmer = async (farmerId) => {
//     try {
//       const response = await fetch(`${apiUrl}/admin/remove-farmer/${farmerId}`, {
//         method: "DELETE",
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       const data = await response.json();
//       alert(data.message);
//       setFarmers(farmers.filter((f) => f.id !== farmerId));
//     } catch (error) {
//       console.error("Error removing farmer:", error);
//     }
//   };

//   const handleRemoveConsumer = async (consumerId) => {
//     try {
//       const response = await fetch(`${apiUrl}/admin/remove-consumer/${consumerId}`, {
//         method: "DELETE",
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       const data = await response.json();
//       alert(data.message);
//       setConsumers(consumers.filter((c) => c.id !== consumerId));
//     } catch (error) {
//       console.error("Error removing consumer:", error);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/login");
//   };

//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* Sidebar */}
//       <div className="w-64 bg-blue-900 text-white flex flex-col p-5">
//         <h2 className="text-3xl font-bold">Admin Panel</h2>
//         <nav className="mt-5 space-y-4">
//           <button onClick={() => navigate("/admin-dashboard")} className="block w-full text-left">Dashboard</button>
//           <button onClick={() => navigate("/admin-farmers")} className="block w-full text-left">Manage Farmers</button>
//           <button onClick={() => navigate("/admin-consumers")} className="block w-full text-left">Manage Consumers</button>
//           <button onClick={() => navigate("/admin-orders")} className="block w-full text-left">Manage Orders</button>
//           <button onClick={() => navigate("/admin-products")} className="block w-full text-left">Manage Products</button>
//           <button onClick={() => navigate("/admin-chatbot")} className="block w-full text-left">Chatbot</button>
//           <button onClick={handleLogout} className="block w-full text-left">Logout</button>
//         </nav>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 p-5">
//         <h1 className="text-3xl font-bold text-blue-900">Admin Dashboard</h1>

//         {/* Profile Section */}
//         <section className="mt-5 bg-white p-5 rounded-lg shadow-md">
//           <h2 className="text-xl font-bold">Admin Profile</h2>
//           {admin ? (
//             <div>
//               <p><strong>Name:</strong> {admin.name}</p>
//               <p><strong>Email:</strong> {admin.email}</p>
//             </div>
//           ) : <p>Loading profile...</p>}
//         </section>

//         {/* Farmers Management */}
//         <section className="mt-5 bg-white p-5 rounded-lg shadow-md">
//           <h2 className="text-xl font-bold">Manage Farmers</h2>
//           {farmers.length > 0 ? (
//             farmers.map((farmer) => (
//               <div key={farmer.id} className="bg-gray-100 p-3 rounded-lg flex justify-between mt-2">
//                 <span>{farmer.name} - {farmer.email}</span>
//                 <button onClick={() => handleRemoveFarmer(farmer.id)} className="bg-red-500 text-white px-3 py-1 rounded">Remove</button>
//               </div>
//             ))
//           ) : <p>No farmers registered.</p>}
//         </section>

//         {/* Consumers Management */}
//         <section className="mt-5 bg-white p-5 rounded-lg shadow-md">
//           <h2 className="text-xl font-bold">Manage Consumers</h2>
//           {consumers.length > 0 ? (
//             consumers.map((consumer) => (
//               <div key={consumer.id} className="bg-gray-100 p-3 rounded-lg flex justify-between mt-2">
//                 <span>{consumer.name} - {consumer.email}</span>
//                 <button onClick={() => handleRemoveConsumer(consumer.id)} className="bg-red-500 text-white px-3 py-1 rounded">Remove</button>
//               </div>
//             ))
//           ) : <p>No consumers registered.</p>}
//         </section>

//         {/* Orders Management */}
//         <section className="mt-5">
//           <h2 className="text-xl font-bold">Manage Orders</h2>
//           <div className="mt-3">
//             {orders.length > 0 ? (
//               orders.map((order) => (
//                 <div key={order.id} className="bg-white p-5 rounded-lg shadow-md mb-2">
//                   <p><strong>Product:</strong> {order.product_name}</p>
//                   <p><strong>Consumer:</strong> {order.consumer_name}</p>
//                   <p><strong>Status:</strong> {order.status}</p>
//                 </div>
//               ))
//             ) : <p>No orders placed yet.</p>}
//           </div>
//         </section>

//         {/* Products Management */}
//         <section className="mt-5">
//           <h2 className="text-xl font-bold">Manage Products</h2>
//           <div className="mt-3 grid grid-cols-3 gap-4">
//             {products.length > 0 ? (
//               products.map((product) => (
//                 <div key={product.id} className="bg-white p-5 rounded-lg shadow-md">
//                   <h3 className="text-lg font-bold">{product.name}</h3>
//                   <p>Price: ${product.price}</p>
//                   <p>Farmer: {product.farmer_name}</p>
//                 </div>
//               ))
//             ) : <p>No products available.</p>}
//           </div>
//         </section>

//         {/* Chatbot */}
//         <Chatbot />
//       </div>
//     </div>
//   );
// }

// export default AdminDashboard;

    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-b from-blue-700 to-green-700 text-white flex flex-col p-5 space-y-3">
        <h2 className="text-3xl font-bold mb-6">Admin Panel</h2>
        <nav className="flex flex-col space-y-3">
          <button 
            onClick={() => navigate("/admin-dashboard")} 
            className="block w-full text-left px-4 py-2 rounded hover:bg-blue-900"
          >
            Dashboard Overview
          </button>
          <button 
            onClick={() => navigate("/admin-farmers")} 
            className="block w-full text-left px-4 py-2 rounded hover:bg-blue-900"
          >
            Manage Farmers
          </button>
          <button 
            onClick={() => navigate("/admin-consumers")} 
            className="block w-full text-left px-4 py-2 rounded hover:bg-blue-900"
          >
            Manage Consumers
          </button>
          <button 
            onClick={() => navigate("/admin-orders")} 
            className="block w-full text-left px-4 py-2 rounded hover:bg-blue-900"
          >
            Manage Orders
          </button>
          <button 
            onClick={() => navigate("/admin-products")} 
            className="block w-full text-left px-4 py-2 rounded hover:bg-blue-900"
          >
            Manage Products
          </button>
          <button 
            onClick={() => navigate("/admin-chatbot")} 
            className="block w-full text-left px-4 py-2 rounded hover:bg-blue-900"
          >
            Chatbot
          </button>
          <button 
            onClick={handleLogout} 
            className="block w-full text-left px-4 py-2 rounded hover:bg-blue-900"
          >
            Logout
          </button>

        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-5 overflow-y-auto">

        <h1 className="text-3xl font-bold text-blue-900">Admin Dashboard</h1>

        {/* Profile Section */}
        <section className="mt-5 bg-white p-5 rounded-lg shadow-md">
          <h2 className="text-xl font-bold">Admin Profile</h2>
          {admin ? (
            <div>
              <p><strong>Name:</strong> {admin.name}</p>
              <p><strong>Email:</strong> {admin.email}</p>

            </div>
          ) : <p>Loading profile...</p>}
        </section>

        {/* Farmers Management */}
        <section className="mt-5 bg-white p-5 rounded-lg shadow-md">
          <h2 className="text-xl font-bold">Manage Farmers</h2>
          {farmers.length > 0 ? (
            farmers.map((farmer) => (
              <div key={farmer.id} className="bg-gray-100 p-3 rounded-lg flex justify-between mt-2">
                <span>{farmer.name} - {farmer.email}</span>
                <button onClick={() => handleRemoveFarmer(farmer.id)} className="bg-red-500 text-white px-3 py-1 rounded">Remove</button>
              </div>
            ))
          ) : <p>No farmers registered.</p>}
        </section>

        {/* Consumers Management */}
        <section className="mt-5 bg-white p-5 rounded-lg shadow-md">
          <h2 className="text-xl font-bold">Manage Consumers</h2>
          {consumers.length > 0 ? (
            consumers.map((consumer) => (
              <div key={consumer.id} className="bg-gray-100 p-3 rounded-lg flex justify-between mt-2">
                <span>{consumer.name} - {consumer.email}</span>
                <button onClick={() => handleRemoveConsumer(consumer.id)} className="bg-red-500 text-white px-3 py-1 rounded">Remove</button>
              </div>
            ))
          ) : <p>No consumers registered.</p>}
        </section>

        {/* Orders Management */}
        <section className="mt-5">
          <h2 className="text-xl font-bold">Manage Orders</h2>
          <div className="mt-3">
            {orders.length > 0 ? (
              orders.map((order) => (
                <div key={order.id} className="bg-white p-5 rounded-lg shadow-md mb-2">
                  <p><strong>Product:</strong> {order.product_name}</p>
                  <p><strong>Consumer:</strong> {order.consumer_name}</p>
                  <p><strong>Status:</strong> {order.status}</p>
                </div>
              ))
            ) : <p>No orders placed yet.</p>}
          </div>
        </section>

        {/* Products Management */}
        <section className="mt-5">
          <h2 className="text-xl font-bold">Manage Products</h2>
          <div className="mt-3 grid grid-cols-3 gap-4">

            {products.length > 0 ? (
              products.map((product) => (
                <div key={product.id} className="bg-white p-5 rounded-lg shadow-md">
                  <h3 className="text-lg font-bold">{product.name}</h3>

                  <p>Price: ${product.price}</p>
                  <p>Farmer: {product.farmer_name}</p>
                </div>
              ))
            ) : <p>No products available.</p>}

          </div>
        </section>

        {/* Chatbot */}
        <Chatbot />
      </div>
    </div>
  );
}


export default AdminDashboard;