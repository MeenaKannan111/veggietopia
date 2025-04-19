import express from 'express';
const router = express.Router();
import { getChatbotResponse }  from '../aiml/chatbot.js'; // ✅ Correct import

//const { getChatbotResponse } = require('../aiml/chatbot'); // ✅ Correct import

router.post('/', async (req, res) => {
    try {
        const { input } = req.body;
        console.log("📩 Received user input:", input);

        const response = await getChatbotResponse(input);
        console.log("🤖 Chatbot Response:", response);

        res.json({ response });
    } catch (error) {
        console.error('❌ Chatbot Error:', error);
        res.status(500).json({ response: "Sorry, something went wrong!" });
    }
});


export default router; 
