import axios from "axios";

const fetchRecommendations = async (userId) => {
    try {
        //const response = await axios.get(`http://localhost:3000/api/recommendations/${userId}`);
        const response = await axios.get(`http://localhost:5000/recommendations/${userId}`);

        return response.data.recommendations; // Return the list of recommended product IDs
    } catch (error) {
        console.error("Error fetching recommendations:", error);
        return [];
    }
};

export default fetchRecommendations;
