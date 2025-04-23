import React, { useEffect, useState } from "react";
import fetchRecommendations from "../utils/fetchRecommendation";

const Recommendations = ({ userId }) => {
    const [recommendations, setRecommendations] = useState([]);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const recommendedProducts = await fetchRecommendations(userId);
                console.log("Fetched Recommendations:", recommendedProducts); // Debugging log
                setRecommendations(recommendedProducts);
            } catch (err) {
                console.error("Error fetching recommendations:", err);
                setError("Failed to fetch recommendations.");
            }
        };

        fetchData();
    }, [userId]);

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }
    return (
        <div className="recommendations">
            <h3 className="text-xl font-bold mb-4">Recommended Products</h3>
            {recommendations.length > 0 ? (
                <ul>
                    {recommendations.map((productId, index) => (
                        <li key={index}>Product ID: {productId}</li>
                    ))}
                </ul>
            ) : (
                <p>No recommendations available.</p>
            )}
        </div>
    );
};

export default Recommendations;