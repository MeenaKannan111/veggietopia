
import db from '../config/db.js';
import { exec } from "child_process";

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const recommendProducts = (req, res) => {
    const { userId } = req.params;

    // Construct absolute path to the Python script
    const scriptPath = path.join(__dirname, '../pickle/generate_recommendations.py');

    // Call the Python script to get recommendations
    exec(`python "${scriptPath}" ${userId}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing Python script: ${error.message}`);
            return res.status(500).json({ error: "Failed to fetch recommendations." });
        }
        if (stderr) {
            console.error(`Python script stderr: ${stderr}`);
        }
        // The Python script prints logs, so filter out non-JSON lines
        const lines = stdout.split('\n');
        const jsonLine = lines.find(line => line.trim().startsWith('[') || line.trim().startsWith('{'));
        if (!jsonLine) {
            console.error("No JSON output found in Python script stdout");
            return res.status(500).json({ error: "No recommendations returned." });
        }
        try {
            const recommendations = JSON.parse(jsonLine);
            if (!recommendations || recommendations.length === 0) {
                return res.status(200).json({ message: "No recommendations available." });
            }
            res.status(200).json({ recommendations });
        } catch (parseError) {
            console.error("Error parsing recommendations JSON:", parseError);
            res.status(500).json({ error: "Failed to parse recommendations." });
        }
    });
};

export const incrementInteractionCount = (req, res) => {
    const { userId, productId } = req.body;

    if (!userId || !productId) {
        return res.status(400).json({ error: "userId and productId are required." });
    }

    const sql = `
        INSERT INTO user_product_interactions (user_id, product_id, interaction_count)
        VALUES (?, ?, 1)
        ON DUPLICATE KEY UPDATE interaction_count = interaction_count + 1
    `;

    db.query(sql, [userId, productId], (err, result) => {
        if (err) {
            console.error("Error updating interaction count:", err);
            return res.status(500).json({ error: "Failed to update interaction count." });
        }
        res.status(200).json({ message: "Interaction count incremented successfully." });
    });
};
