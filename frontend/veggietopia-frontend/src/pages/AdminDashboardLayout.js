import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

function AdminDashboardLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-gradient-to-r from-blue-500 to-green-500">
      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-b from-blue-500 to-green-500 text-black flex flex-col p-5 space-y-3">
        <h2 className="text-3xl font-bold mb-6">Admin Panel</h2>
        <nav className="flex flex-col space-y-3">
          <button 
            onClick={() => navigate("/admin/dashboard")} 
            className="block w-full text-left px-4 py-2 rounded hover:bg-gray-300"
          >
            Dashboard Overview
          </button>
          <button 
            onClick={() => navigate("/admin/farmers")} 
            className="block w-full text-left px-4 py-2 rounded hover:bg-gray-300"
          >
            Manage Farmers
          </button>
          <button 
            onClick={() => navigate("/admin/consumers")} 
            className="block w-full text-left px-4 py-2 rounded hover:bg-gray-300"
          >
            Manage Consumers
          </button>
          <button 
            onClick={() => navigate("/admin/orders")} 
            className="block w-full text-left px-4 py-2 rounded hover:bg-gray-300"
          >
            Manage Orders
          </button>
          <button 
            onClick={() => navigate("/admin/products")} 
            className="block w-full text-left px-4 py-2 rounded hover:bg-gray-300"
          >
            Manage Products
          </button>
          <button 
            onClick={() => navigate("/admin/chatbot")} 
            className="block w-full text-left px-4 py-2 rounded hover:bg-gray-300"
          >
            Chatbot
          </button>
          <button 
            onClick={() => navigate("/admin/feedback")} 
            className="block w-full text-left px-4 py-2 rounded hover:bg-gray-300"
          >
            View Feedback
          </button>
          <button 
            onClick={handleLogout} 
            className="block w-full text-left px-4 py-2 rounded hover:bg-gray-300"
          >
            Logout
          </button>
        </nav>
      </div>
      {/* Main Content Area */}
      <div className="flex-1 p-5 overflow-y-auto text-black">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminDashboardLayout;