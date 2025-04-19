import db from "../config/db.js";
export const getRecommendations = async (userId) => {
    try {
        // Fetch user-product interactions
        const [userInteractions] = await db.promise().query(
            "SELECT product_id FROM user_product_interactions WHERE user_id = ?",
            [userId]
        );

        console.log("User Interactions:", userInteractions);

        if (userInteractions.length === 0) {
            console.log(`No interactions found for user: ${userId}`);
            return []; // No interactions for this user
        }

        // Get products interacted with by similar users
        const productIds = userInteractions.map((interaction) => interaction.product_id);
        console.log("Product IDs for user:", productIds);

        const [similarUsers] = await db.promise().query(
            `SELECT DISTINCT upi2.product_id
             FROM user_product_interactions upi1
             JOIN user_product_interactions upi2
             ON upi1.user_id = upi2.user_id
             WHERE upi1.product_id IN (?) AND upi1.user_id != ?`,
            [productIds, userId]
        );

        console.log("Similar Users' Products:", similarUsers);

        return similarUsers.map((row) => row.product_id);
    } catch (error) {
        console.error("Error in getRecommendations:", error);
        throw error; // Re-throw the error to be handled by the controller
    }
};