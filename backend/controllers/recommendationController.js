import { getRecommendations } from "../models/recommendationModel.js";

export const recommendProducts = async (req, res) => {
    const { userId } = req.params;

    try {
        const recommendations = await getRecommendations(userId);

        if (recommendations.length === 0) {
            return res.status(200).json({ message: "No recommendations available." });
        }

        res.status(200).json({ recommendations });
    } catch (error) {
        console.error("Error fetching recommendations:", error);
        res.status(500).json({ error: "Failed to fetch recommendations." });
    }
};