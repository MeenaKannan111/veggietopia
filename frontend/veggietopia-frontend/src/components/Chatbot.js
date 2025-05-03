

// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";

// const Chatbot = () => {
//     const [messages, setMessages] = useState([]);
//     const [input, setInput] = useState("");
//     const chatBoxRef = useRef(null);

//     useEffect(() => {
//         // Auto-scroll to the latest message
//         if (chatBoxRef.current) {
//             chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
//         }
//     }, [messages]);

//     const sendMessage = async () => {
//         if (!input.trim()) return;

//         const userMessage = { sender: "user", text: input };
//         setMessages((prevMessages) => [...prevMessages, userMessage]); // Functional update

//         try {
//             const response = await axios.post("http://localhost:3000/api/chatbot", { input });
//             const botMessage = { sender: "bot", text: response.data.response };

//             setMessages((prevMessages) => [...prevMessages, botMessage]);
//         } catch (error) {
//             setMessages((prevMessages) => [
//                 ...prevMessages,
//                 { sender: "bot", text: "Error connecting to chatbot. Please try again." }
//             ]);
//         }

//         setInput("");
//     };

//     return (
//         <div style={styles.container}>
//             <div style={styles.chatBox} ref={chatBoxRef}>
//                 {messages.map((msg, index) => (
//                     <div key={index} style={msg.sender === "user" ? styles.userMessage : styles.botMessage}>
//                         {msg.text}
//                     </div>
//                 ))}
//             </div>
//             <div style={styles.inputContainer}>
//                 <input
//                     type="text"
//                     value={input}
//                     onChange={(e) => setInput(e.target.value)}
//                     placeholder="Ask me anything..."
//                     style={styles.input}
//                 />
//                 <button onClick={sendMessage} style={styles.button}>Send</button>
//             </div>
//         </div>
//     );
// };

// // Styles
// const styles = {
//     container: { 
//         width: "350px", margin: "20px auto", padding: "10px", 
//         border: "1px solid #ccc", borderRadius: "10px", backgroundColor: "#f9f9f9" 
//     },
//     chatBox: { 
//         height: "300px", overflowY: "auto", padding: "10px", 
//         borderBottom: "1px solid #ccc", backgroundColor: "#fff"
//     },
//     userMessage: { 
//         textAlign: "right", background: "#d1e7dd", padding: "8px", 
//         borderRadius: "10px", marginBottom: "5px", maxWidth: "80%", marginLeft: "auto"
//     },
//     botMessage: { 
//         textAlign: "left", background: "#f8d7da", padding: "8px", 
//         borderRadius: "10px", marginBottom: "5px", maxWidth: "80%"
//     },
//     inputContainer: { 
//         display: "flex", alignItems: "center", paddingTop: "10px" 
//     },
//     input: { 
//         flex: 1, padding: "8px", borderRadius: "5px", border: "1px solid #ccc", marginRight: "5px" 
//     },
//     button: { 
//         padding: "8px 10px", borderRadius: "5px", border: "none", 
//         background: "#28a745", color: "white", cursor: "pointer"
//     },
// };

// export default Chatbot;

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const Chatbot = ({ userType }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false); // Loading state
    const chatBoxRef = useRef(null);

    useEffect(() => {
        // Auto-scroll to the latest message
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    }, [messages]);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = { sender: "user", text: input };
        setMessages((prevMessages) => [...prevMessages, userMessage]);
        setInput("");
        setLoading(true); // Show loading indicator

        try {
            const response = await axios.post("http://localhost:3000/api/chatbot", {
                input,
                userType, // Send user type (farmer/consumer)
            });

            const botMessage = { sender: "bot", text: response.data.response };
            setMessages((prevMessages) => [...prevMessages, botMessage]);
        } catch (error) {
            setMessages((prevMessages) => [
                ...prevMessages,
                { sender: "bot", text: "Sorry, I couldn't process your request. Please try again later." },
            ]);
        } finally {
            setLoading(false); // Hide loading indicator
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>Chat with Veggietopia Bot</h2>
            <div style={styles.chatBox} ref={chatBoxRef}>
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        style={msg.sender === "user" ? styles.userMessage : styles.botMessage}
                        aria-label={msg.sender === "user" ? "User message" : "Bot message"}
                    >
                        {msg.text}
                    </div>
                ))}
                {loading && <div style={styles.loading}>Bot is typing...</div>}
            </div>
            <div style={styles.inputContainer}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    style={styles.input}
                    aria-label="Chat input"
                />
                <button onClick={sendMessage} style={styles.button} aria-label="Send message">
                    Send
                </button>
            </div>
        </div>
    );
};

// Chatbot Styles
const styles = {
    container: {
        width: "100%",
        maxWidth: "400px",
        margin: "20px auto",
        padding: "15px",
        border: "1px solid #ccc",
        borderRadius: "10px",
        backgroundColor: "#f9f9f9",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    },
    header: {
        textAlign: "center",
        fontSize: "18px",
        fontWeight: "bold",
        marginBottom: "10px",
        color: "#333",
    },
    chatBox: {
        height: "300px",
        overflowY: "auto",
        padding: "10px",
        borderBottom: "1px solid #ccc",
        backgroundColor: "#fff",
        borderRadius: "5px",
    },
    userMessage: {
        textAlign: "right",
        background: "#d1e7dd",
        padding: "10px",
        borderRadius: "10px",
        marginBottom: "5px",
        maxWidth: "80%",
        marginLeft: "auto",
        color: "#155724",
    },
    botMessage: {
        textAlign: "left",
        background: "#f8d7da",
        padding: "10px",
        borderRadius: "10px",
        marginBottom: "5px",
        maxWidth: "80%",
        color: "#721c24",
    },
    loading: {
        textAlign: "center",
        fontStyle: "italic",
        color: "#888",
        marginTop: "10px",
    },
    inputContainer: {
        display: "flex",
        alignItems: "center",
        marginTop: "10px",
    },
    input: {
        flex: 1,
        padding: "10px",
        borderRadius: "5px",
        border: "1px solid #ccc",
        marginRight: "5px",
        color: "black",
    },
    button: {
        padding: "10px 15px",
        borderRadius: "5px",
        border: "none",
        background: "#28a745",
        color: "white",
        cursor: "pointer",
        fontWeight: "bold",
    },
};

export default Chatbot;