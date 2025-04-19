// // backend/server.js
// import chatbotRoutes from './routes/chatbotRoutes.js';
// import dotenv from "dotenv";
// import express from "express";
// import cors from "cors";
// import bodyParser from "body-parser";
// import db from './config/db.js';
// dotenv.config({ path: "./backend/.env" });
// console.log("API Key:", process.env.OPENAI_API_KEY); // Debugging

// const { BotFrameworkAdapter } = require('botbuilder');

// //const chatbotRoutes = require('./routes/chatbotRoutes');
// const farmerRoutes = require('./routes/farmerRoutes');
// const consumerRoutes = require('./routes/consumerRoutes');
// const adminRoutes = require('./routes/adminRoutes');

// const app = express();
// app.use(bodyParser.json());
// app.use(express.json());
// app.use(cors());

// app.use('/api/chatbot', chatbotRoutes);
// // Create the Bot Framework Adapter
// const adapter = new BotFrameworkAdapter({
//     appId: process.env.MICROSOFT_APP_ID || '',
//     appPassword: process.env.MICROSOFT_APP_PASSWORD || ''
// });


// // Other routes
// app.use('/api/farmer', farmerRoutes);
// app.use('/api/consumer', consumerRoutes);
// app.use('/api/admin', adminRoutes);

// // Test database connection
// app.get('/test-db', (req, res) => {
//     db.query('SELECT 1 + 1 AS solution', (err, results) => {
//         if (err) {
//             return res.status(500).send('Database query failed');
//         }
//         res.send(`Database connection is working! 1 + 1 = ${results[0].solution}`);
//     });
// });

// // Start the server
// const PORT = process.env.PORT || 3000;
// app.listen(3000, () => {
//     console.log("Server running on port 3000");
// });

import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import chatbotRoutes from "./routes/chatbotRoutes.js";
import farmerRoutes from "./routes/farmerRoutes.js";
import productRoutes from "./routes/products.js";
import consumerRoutes from "./routes/consumerRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import db from "./config/db.js"
import recommendationRoutes from "./routes/recommendationRoutes.js";


// Load environment variables
dotenv.config({ path: "./backend/.env" });

// Debugging API key (remove in production)
console.log("API Key:", process.env.GOOGLE_API_KEY);

// Express app
const app = express();
//app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/chatbot", chatbotRoutes);
app.use("/api/farmer", farmerRoutes);
app.use("/api/consumer", consumerRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/products", productRoutes);
app.use("/api/recommendations", recommendationRoutes);

// Test database connection
app.get("/test-db", (req, res) => {
    db.query("SELECT 1 + 1 AS solution", (err, results) => {
        if (err) {
            return res.status(500).send("Database query failed");
        }
        res.send(`Database connection is working! 1 + 1 = ${results[0].solution}`);
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
