<<<<<<< HEAD
import pickle
import numpy as np
import pandas as pd
import os

def load_model():
    model_dir = os.path.join(os.path.dirname(__file__), '../pickle/model')
    with open(os.path.join(model_dir, 'U.pkl'), 'rb') as f:
        U = pickle.load(f)
    with open(os.path.join(model_dir, 'sigma.pkl'), 'rb') as f:
        sigma = pickle.load(f)
    with open(os.path.join(model_dir, 'Vt.pkl'), 'rb') as f:
        Vt = pickle.load(f)
    with open(os.path.join(model_dir, 'interaction_matrix.pkl'), 'rb') as f:
        interaction_matrix = pickle.load(f)
    return U, sigma, Vt, interaction_matrix

def getRecommendationsFromModel(userId):
    try:
        U, sigma, Vt, interaction_matrix = load_model()
    except Exception as e:
        print("Error loading model:", e)
        return []

    if userId not in interaction_matrix.index:
        print(f"User {userId} not found in interaction matrix.")
        return []

    user_idx = interaction_matrix.index.get_loc(userId)
    user_pred = np.dot(np.dot(U[user_idx, :], sigma), Vt)
    sorted_product_indices = np.argsort(user_pred)[::-1]

    recommended_products = []
    for idx in sorted_product_indices:
        product_id = interaction_matrix.columns[idx]
        if interaction_matrix.iloc[user_idx, idx] == 0:  # Recommend only products not interacted with
            recommended_products.append(product_id)
        if len(recommended_products) >= 10:
            break

    return recommended_products
=======
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
>>>>>>> 0c2c563e9c323979057143631318859bc55e43c5
