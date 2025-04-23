import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

// ✅ Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../.env") });

console.log("Loaded API Key:", process.env.GOOGLE_API_KEY || "❌ NOT FOUND");
// ✅ Read project info file
const filePath = path.join(__dirname, "project_info.txt");
const projectInfo = fs.readFileSync(filePath, "utf-8");

console.log("File Loaded Successfully:\n", projectInfo);

// ✅ Fetch API key from .env
const apiKey = process.env.GOOGLE_API_KEY;
if (!apiKey) {
    throw new Error("Missing Google API Key! Set GOOGLE_API_KEY in your .env file.");
}
console.log("Using API Key:", apiKey);  // ✅ Debug API key

// ✅ Initialize GoogleGenerativeAI
const ai = new GoogleGenerativeAI(apiKey);

async function getChatbotResponse(query) {
    try {
        const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });

        // ✅ Correct input format
        const chat = await model.generateContent({
            contents: [{ role: "user", parts: [{ text: `${projectInfo}\n\nUser Query: ${query}` }] }]
        });

        // ✅ Debug API response
        console.log("Raw API Response:", JSON.stringify(chat, null, 2));

        const responseText = chat.response?.candidates?.[0]?.content?.parts?.[0]?.text;

        console.log("✅ Extracted Chatbot Response:", responseText || "❌ No response received.");
        
        return responseText || "I'm sorry, I didn't understand that.";
        

        return responseText;
    } catch (error) {
        console.error("Chatbot Error:", error);
        return "Sorry, something went wrong!";
    }
}

export { getChatbotResponse };
