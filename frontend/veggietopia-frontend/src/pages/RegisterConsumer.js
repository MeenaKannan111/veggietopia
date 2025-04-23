import { useState } from "react";
import { useNavigate } from "react-router-dom";

const apiUrl = "http://localhost:3000/api";

const RegisterConsumer = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${apiUrl}/consumer/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password, address }),
            });

            const data = await response.json();
            if (response.ok) {
                alert("Registration successful! Please log in.");
                navigate("/login");
            } else {
                alert(data.message || "Registration failed!");
            }
        } catch (error) {
            console.error("Error during registration:", error);
        }
    };

    return (
        <div>
            <h1>Register as Consumer</h1>
            <form onSubmit={handleRegister}>
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} required />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default RegisterConsumer;
