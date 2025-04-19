// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// function Login() {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [role, setRole] = useState("consumer"); // Default role
//     const navigate = useNavigate();

//     const handleLogin = async (e) => {
//         e.preventDefault();
//         console.log("📡 Sending login request...", { email, password, role });

//         try {
//             const response = await fetch(`${apiUrl}/${role}/login`, {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ email, password }),
//             });

//             const data = await response.json();
//             console.log("✅ API Response Data:", data);

//             if (response.ok && data.token && data.user?.id) {
//                 alert("Login Successful!");
//                 localStorage.setItem("token", data.token);
//                 localStorage.setItem("userId", data.user.id);
//                 localStorage.setItem("role", role);

//                 // Redirect based on role
//                 if (role === "consumer") {
//                     navigate("/consumer-dashboard");
//                 } else if (role === "farmer") {
//                     navigate("/farmer-dashboard");
//                 } else {
//                     navigate("/admin-dashboard");
//                 }
//             } else {
//                 console.error("❌ Login failed:", data);
//                 alert(data.message || "Login failed!");
//             }
//         } catch (error) {
//             console.error("❌ Network Error:", error);
//             alert("Something went wrong. Please try again.");
//         }
//     };

//     return (
//         <div className="login-container">
//             <h1>Login</h1>
//             <form onSubmit={handleLogin}>
//                 <select value={role} onChange={(e) => setRole(e.target.value)}>
//                     <option value="consumer">Consumer</option>
//                     <option value="farmer">Farmer</option>
//                     <option value="admin">Admin</option>
//                 </select>

//                 <input 
//                     type="email" 
//                     placeholder="Email" 
//                     value={email} 
//                     onChange={(e) => setEmail(e.target.value)} 
//                     required 
//                 />
//                 <input 
//                     type="password" 
//                     placeholder="Password" 
//                     value={password} 
//                     onChange={(e) => setPassword(e.target.value)} 
//                     required 
//                 />
//                 <button type="submit">Login</button>
//             </form>
//         </div>
//     );
// }

// export default Login;

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const apiUrl = "http://127.0.0.1:3000/api"; // Adjust based on your backend setup

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("consumer"); // Default role
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        
        console.log(`📡 Logging in as ${role}...`);

        try {
            const response = await fetch(`${apiUrl}/${role}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            console.log("✅ API Response:", data);

            if (!response.ok) {
                console.error("❌ Full API Error:", data);
                setError(data.message || `API Error: ${JSON.stringify(data)}`);
                return;
            }
            

            if (data.token && data.user?.id) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("userId", data.user.id);
                localStorage.setItem("role", role);

                // Redirect based on role
                navigate(`/${role}-dashboard`);
            } else {
                throw new Error("Unexpected API response!");
            }
        } catch (err) {
            console.error("❌ Login Error:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-green-500 to-blue-600">
            <div className="bg-white p-8 rounded-xl shadow-lg w-96">
                <h1 className="text-3xl font-bold text-green-700 text-center">Login</h1>

                {error && <p className="text-red-600 text-center mt-2">{error}</p>}

                <form onSubmit={handleLogin} className="mt-5 space-y-4">
                    {/* Role Selection */}
                    <select 
                        value={role} 
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full p-2 border rounded-lg text-gray-700"
                        required
                    >
                        <option value="consumer">Consumer</option>
                        <option value="farmer">Farmer</option>
                        <option value="admin">Admin</option>
                    </select>

                    {/* Email Input */}
                    <input 
                        type="email" 
                        placeholder="Email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        className="w-full p-2 border rounded-lg"
                        required 
                    />

                    {/* Password Input */}
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        className="w-full p-2 border rounded-lg"
                        required 
                    />
                    
                    {/* Submit Button */}
                    <button 
                        type="submit"
                        className={`w-full py-2 text-white font-bold rounded-lg ${
                            loading ? "bg-gray-400" : "bg-green-700 hover:bg-green-800"
                        }`}
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;

