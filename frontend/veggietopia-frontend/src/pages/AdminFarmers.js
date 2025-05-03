import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const apiUrl = "http://localhost:3000/api";

function AdminFarmers() {
  const [farmers, setFarmers] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      alert("Not logged in! Redirecting...");
      navigate("/login");
      return;
    }

    const fetchFarmers = async () => {
      try {
        const response = await fetch(`${apiUrl}/admin/dashboard`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error("Failed to fetch farmers");
        const data = await response.json();
        setFarmers(data.farmers);
      } catch (error) {
        console.error("Error fetching farmers:", error);
      }
    };

    fetchFarmers();
  }, [navigate, token]);

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

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-5">Manage Farmers</h1>
      {farmers.length > 0 ? (
        farmers.map((farmer) => (
          <div key={farmer.id} className="bg-gray-100 p-3 rounded-lg flex justify-between mt-2">
            <span>{farmer.name} - {farmer.email}</span>
            <button onClick={() => handleRemoveFarmer(farmer.id)} className="bg-red-500 text-white px-3 py-1 rounded">Remove</button>
          </div>
        ))
      ) : (
        <p>No farmers registered.</p>
      )}
    </div>
  );
}

export default AdminFarmers;
