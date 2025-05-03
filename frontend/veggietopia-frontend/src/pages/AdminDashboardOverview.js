import React, { useState, useEffect } from "react";

const apiUrl = "http://localhost:3000/api";

function AdminDashboardOverview() {
  const [admin, setAdmin] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await fetch(`${apiUrl}/admin/dashboard`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error("Failed to fetch admin data");
        const data = await response.json();
        setAdmin(data.admin);
      } catch (error) {
        console.error("Error fetching admin data:", error);
      }
    };
    fetchAdminData();
  }, [token]);
  return (
    <div>
      <h1 className="text-3xl font-bold text-blue-900">Admin Dashboard Overview</h1>
      {admin ? (
        <div className="mt-4 bg-white p-5 rounded-lg shadow-md">
          <p><strong>Name:</strong> {admin.name}</p>
          <p><strong>Email:</strong> {admin.email}</p>
        </div>
      ) : (
        <p>Loading admin profile...</p>
      )}
    </div>
  );
}

export default AdminDashboardOverview;