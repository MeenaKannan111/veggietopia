import axios from "axios";

const incrementInteraction = async (userId, productId) => {
    try {
        const response = await axios.post("http://localhost:3000/api/recommendations/increment-interaction", {
            userId,
            productId,
        });
        return response.data;
    } catch (error) {
        console.error("Error incrementing interaction count:", error);
        return null;
    }
};

export default incrementInteraction;
