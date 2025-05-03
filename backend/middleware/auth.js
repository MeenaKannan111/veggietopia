// import jwt from "jsonwebtoken";

// export const verifyToken = (req, res, next) => {
//     const token = req.headers.authorization?.split(" ")[1]; // Extract token from "Bearer <token>"

//     if (!token) {
//         return res.status(401).json({ error: "Access denied. No token provided." });
//     }

//     try {
//         const decoded = jwt.verify(token, "your_jwt_secret"); // Use the same secret key as in login token signing
//         req.user = decoded; // Attach decoded token data (e.g., user ID) to the request object
//         next(); // Proceed to the next middleware or route handler
//     } catch (error) {
//         res.status(400).json({ error: "Invalid token" });
//     }
// };

import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ error: "Access denied. No token provided." });
    }

    try {
        // Use the same secret as in your login: process.env.JWT_SECRET || 'secretkey'
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secretkey');
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ error: "Invalid token" });
    }
};