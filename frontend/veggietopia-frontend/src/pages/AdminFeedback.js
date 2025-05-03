import React, { useState, useEffect } from "react";

const apiUrl = "http://localhost:3000/api";

function AdminFeedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await fetch(`${apiUrl}/feedback`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            
          },
        });
        console.log(localStorage.getItem("token"));
        if (response.ok) {
          const data = await response.json();
          console.log("Fetched feedback:", data); // Debug log
          setFeedbacks(data);
        } else {
          console.error("Failed to fetch feedbacks");
          const errorData = await response.json();
          console.error("Error data:", errorData);
        }
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  if(loading) {
    return <p>Loading feedback...</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-green-500 p-5 text-black">
      <h2 className="text-2xl font-bold mb-4">User Feedback</h2>
      {feedbacks.length > 0 ? (
        feedbacks.map((fb) => (
          <div key={fb.id} className="border p-3 mb-3 bg-white">
            <p><strong>User ID:</strong> {fb.user_id}</p>
            <p><strong>Role:</strong> {fb.role}</p>
            <p><strong>Rating:</strong> {fb.rating}</p>
            <p><strong>Experience:</strong> {fb.experience_choice}</p>
            <p><strong>Comment:</strong> {fb.comment}</p>
            <p><em>{new Date(fb.created_at).toLocaleString()}</em></p>
          </div>
        ))
      ) : (
        <p>No feedbacks available.</p>
      )}
    </div>
  );
}

export default AdminFeedback;