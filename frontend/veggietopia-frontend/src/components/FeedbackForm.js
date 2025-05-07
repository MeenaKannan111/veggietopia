import React, { useState } from "react";

const apiUrl = "http://localhost:3000/api";

function FeedbackForm({ userId, role, onClose }) {
  const [rating, setRating] = useState("");
  const [experience, setExperience] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/feedback`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          user_id: userId,
          role,
          rating: parseInt(rating, 10),
          experience_choice: experience,
          comment,
        }),
      });
      if (response.ok) {
        alert("Feedback submitted successfully");
        onClose();
      } else {
        const errData = await response.json();
        alert(`Failed: ${errData.error || response.statusText}`);
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("Error submitting feedback");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-start overflow-auto pt-10">
  <div className="bg-white text-black w-full max-w-md mx-auto p-6 rounded-lg shadow-lg">
    <form onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-4">Feedback Form</h2>
      <label className="block mb-2">Rating (1-5):</label>
      <input
        type="number"
        min="1"
        max="5"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-4"
        required
      />

      <label className="block mb-2">How was your experience?</label>
      <select
        value={experience}
        onChange={(e) => setExperience(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-4"
        required
      >
        <option value="">Select an option</option>
        <option value="Excellent">Excellent</option>
        <option value="Good">Good</option>
        <option value="Average">Average</option>
        <option value="Poor">Poor</option>
        <option value="Very Poor">Very Poor</option>
      </select>

      <label className="block mb-2">Additional Comments:</label>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-4"
        rows="4"
        placeholder="Enter any additional feedback"
      ></textarea>

      <div className="flex justify-end space-x-4">
        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
          Cancel
        </button>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
          Submit
        </button>
      </div>
    </form>
  </div>
</div>


  );
}

export default FeedbackForm;