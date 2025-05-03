import db from "../config/db.js";

// Submit feedback endpoint (for consumers or farmers)
export const submitFeedback = async (req, res) => {
    const { user_id, role, rating, experience_choice, comment } = req.body;
    if (!user_id || !role) {
        return res.status(400).json({ error: "Missing required fields" });
    }
    try {
        await db.promise().query(
            "INSERT INTO feedbacks (user_id, role, rating, experience_choice, comment) VALUES (?, ?, ?, ?, ?)",
            [user_id, role, rating || null, experience_choice || null, comment || null]
        );
        res.status(201).json({ message: "Feedback submitted successfully" });
    } catch (error) {
        console.error("Error submitting feedback:", error);
        res.status(500).json({ error: "Failed to submit feedback" });
    }
};

// Admin endpoint to get all feedbacks (or you can filter by role)
export const getFeedbacks = async (req, res) => {
    try {
        const [rows] = await db.promise().query(
            "SELECT * FROM feedbacks ORDER BY created_at DESC"
        );
        res.status(200).json(rows);
    } catch (error) {
        console.error("Error fetching feedbacks:", error);
        res.status(500).json({ error: "Failed to fetch feedbacks" });
    }
};