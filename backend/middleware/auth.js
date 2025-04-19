import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; // Extract token from "Bearer <token>"

    if (!token) {
        return res.status(401).json({ error: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, "your_secret_key"); // Replace "your_secret_key" with your actual secret key
        req.user = decoded; // Attach decoded token data (e.g., user ID) to the request object
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        res.status(400).json({ error: "Invalid token" });
    }
};