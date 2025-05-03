// import React, { useEffect, useState } from "react";
//     import fetchRecommendations from "../utils/fetchRecommendation";
    
//     const Recommendations = ({ userId, products }) => {
//         const [recommendations, setRecommendations] = useState([]);
//         const [error, setError] = useState(null);
    
//         useEffect(() => {
//             const fetchData = async () => {
//                 try {
//                     const recommendedProductIds = await fetchRecommendations(userId);
//                     setRecommendations(recommendedProductIds);
//                 } catch (err) {
//                     console.error("Error fetching recommendations:", err);
//                     setError("Failed to fetch recommendations.");
//                 }
//             };
    
//             fetchData();
//         }, [userId]);
    
//         if (error) {
//             return <p className="text-red-500">{error}</p>;
//         }
    
//         // Map recommended product IDs to product details
//         const recommendedProducts = recommendations
//             .map((id) => products.find((product) => product.id === id))
//             .filter((product) => product !== undefined);
    
//         return (
//             <div className="recommendations">
//                 <h3 className="text-xl font-bold mb-4">Recommended Products</h3>
//                 {recommendedProducts.length > 0 ? (
//                     <ul>
//                         {recommendedProducts.map((product) => (
//                             <li key={product.id} className="mb-2">
//                                 <div className="flex items-center space-x-4">
//                                     <img
//                                         src={product.image_url || "default-image.jpg"}
//                                         alt={product.name}
//                                         className="w-16 h-16 object-cover rounded"
//                                     />
//                                     <div>
//                                         <p className="font-semibold">{product.name}</p>
//                                         <p>Price: ₹{product.price}</p>
//                                     </div>
//                                 </div>
//                             </li>
//                         ))}
//                     </ul>
//                 ) : (
//                     <p>No recommendations available.</p>
//                 )}
//             </div>
//         );
//     };
    
//     export default Recommendations;
    

import React, { useState, useEffect } from 'react';

function Recommendations() {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    // Fetch your recommendations data
    fetch('/api/recommendations')
      .then(response => response.json())
      .then(data => setRecommendations(data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      {recommendations.map(item => (
        <div key={item.id}>{item.title}</div>
      ))}
    </div>
  );
}

export default Recommendations;