// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const apiUrl = "http://localhost:3000/api";

// const RegisterFarmer = () => {
//     const [name, setName] = useState("");
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [farmDetails, setFarmDetails] = useState("");
//     const navigate = useNavigate();

//     const handleRegister = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await fetch(`${apiUrl}/farmer/register`, {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ name, email, password, farmDetails }),
//             });

//             const data = await response.json();
//             if (response.ok) {
//                 alert("Registration successful! Please log in.");
//                 navigate("/login");
//             } else {
//                 alert(data.message || "Registration failed!");
//             }
//         } catch (error) {
//             console.error("Error during registration:", error);
//         }
//     };

//     return (
//         <div>
//             <h1>Register as Farmer</h1>
//             <form onSubmit={handleRegister}>
//                 <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
//                 <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//                 <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
//                 <textarea placeholder="Farm Details" value={farmDetails} onChange={(e) => setFarmDetails(e.target.value)} required />
//                 <button type="submit">Register</button>
//             </form>
//         </div>
//     );
// };

// export default RegisterFarmer;



import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RegisterFarmer.css"; // Import the CSS file for styling

const apiUrl = "http://localhost:3000/api";

const RegisterFarmer = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [farmDetails, setFarmDetails] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${apiUrl}/farmer/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password, farmDetails }),
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
        <div className="register-container">
            <h1 className="register-title">Register as Farmer</h1>
            <form onSubmit={handleRegister} className="register-form">
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="register-input"
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="register-input"
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="register-input"
                    required
                />
                <textarea
                    placeholder="Farm Details"
                    value={farmDetails}
                    onChange={(e) => setFarmDetails(e.target.value)}
                    className="register-textarea"
                    required
                />
                <button type="submit" className="register-button">
                    Register
                </button>
            </form>
        </div>
    );
};

export default RegisterFarmer;