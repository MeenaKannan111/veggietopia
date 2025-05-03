import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const apiUrl = "http://localhost:3000/api";

function AdminConsumers() {
  const [consumers, setConsumers] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      alert("Not logged in! Redirecting...");
      navigate("/login");
      return;
    }

    const fetchConsumers = async () => {
      try {
        const response = await fetch(`${apiUrl}/admin/dashboard`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error("Failed to fetch consumers");
        const data = await response.json();
        setConsumers(data.consumers);
      } catch (error) {
        console.error("Error fetching consumers:", error);
      }
    };

    fetchConsumers();
  }, [navigate, token]);

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
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-5">Manage Consumers</h1>
      {consumers.length > 0 ? (
        consumers.map((consumer) => (
          <div key={consumer.id} className="bg-gray-100 p-3 rounded-lg flex justify-between mt-2">
            <span>{consumer.name} - {consumer.email}</span>
            <button onClick={() => handleRemoveConsumer(consumer.id)} className="bg-red-500 text-white px-3 py-1 rounded">Remove</button>
          </div>
        ))
      ) : (
        <p>No consumers registered.</p>
      )}
    </div>
  );
}

export default AdminConsumers;
