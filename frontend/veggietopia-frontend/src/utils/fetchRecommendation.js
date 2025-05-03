<<<<<<< HEAD
=======


>>>>>>> 0c2c563e9c323979057143631318859bc55e43c5
import axios from "axios";

const fetchRecommendations = async (userId) => {
    try {
<<<<<<< HEAD
        const response = await axios.get(`http://localhost:3000/api/recommendations/${userId}`);
=======
        const response = await axios.get(`http://localhost:5000/recommendations/${userId}`);
>>>>>>> 0c2c563e9c323979057143631318859bc55e43c5
        return response.data.recommendations; // Return the list of recommended product IDs
    } catch (error) {
        console.error("Error fetching recommendations:", error);
        return [];
    }
};

<<<<<<< HEAD
export default fetchRecommendations;
=======
export default fetchRecommendations;
>>>>>>> 0c2c563e9c323979057143631318859bc55e43c5
