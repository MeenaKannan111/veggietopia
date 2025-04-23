// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const apiUrl = "http://localhost:3000/api";

// function SignUp() {
//     const [name, setName] = useState("");
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [role, setRole] = useState("consumer"); // Default role
//     const navigate = useNavigate();

//     const handleSignUp = async (e) => {
//         e.preventDefault();
//         console.log("📡 Sending signup request...", { name, email, password, role });

//         try {
//             const response = await fetch(`${apiUrl}/${role}/register`, {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ name, email, password }),
//             });

//             const data = await response.json();
//             console.log("✅ API Response Data:", data);

//             if (response.ok) {
//                 alert("Signup Successful! Please log in.");
//                 navigate("/login");
//             } else {
//                 console.error("❌ Signup failed:", data);
//                 alert(data.message || "Signup failed!");
//             }
//         } catch (error) {
//             console.error("❌ Network Error:", error);
//             alert("Something went wrong. Please try again.");
//         }
//     };

//     return (
//         <div className="signup-container">
//             <h1>Sign Up</h1>
//             <form onSubmit={handleSignUp}>
//                 <select value={role} onChange={(e) => setRole(e.target.value)}>
//                     <option value="consumer">Consumer</option>
//                     <option value="farmer">Farmer</option>
//                 </select>

//                 <input 
//                     type="text" 
//                     placeholder="Full Name" 
//                     value={name} 
//                     onChange={(e) => setName(e.target.value)} 
//                     required 
//                 />
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
//                 <button type="submit">Sign Up</button>
//             </form>
//         </div>
//     );
// }

// export default SignUp;


import { useState } from "react";
import { useNavigate } from "react-router-dom";

const apiUrl = "http://localhost:3000/api";

function SignUp() {
    const [role, setRole] = useState("consumer"); // Default role
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState(""); // For consumers
    const [farmDetails, setFarmDetails] = useState(""); // For farmers
    const [phoneNumber, setPhoneNumber] = useState(""); // For farmers
    const [farmLocation, setFarmLocation] = useState(""); // For farmers

    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        console.log("📡 Sending signup request...", { name, email, password, role, address, farmDetails, phoneNumber, farmLocation });

        try {
            const payload = {
                name,
                email,
                password,
                ...(role === "consumer" && { address }),
                ...(role === "farmer" && { farm_details: farmDetails, phone_number: phoneNumber, farm_location: farmLocation }),
            };

            const response = await fetch(`${apiUrl}/${role}/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await response.json();
            console.log("✅ API Response Data:", data);

            if (response.ok) {
                alert("Signup Successful! Please log in.");
                navigate("/login");
            } else {
                console.error("❌ Signup failed:", data);
                alert(data.message || "Signup failed!");
            }
        } catch (error) {
            console.error("❌ Network Error:", error);
            alert("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-500 to-blue-600 flex items-center justify-center text-gray-800">
            <div className="bg-white p-10 rounded-lg shadow-lg max-w-lg w-full">
                <h1 className="text-3xl font-bold text-center mb-6">Sign Up</h1>
                <form onSubmit={handleSignUp} className="space-y-4">
                    {/* Role Selection */}
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Sign Up As</label>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg"
                        >
                            <option value="consumer">Consumer</option>
                            <option value="farmer">Farmer</option>
                        </select>
                    </div>

                    {/* Name */}
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Full Name</label>
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Email</label>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Password</label>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg"
                        />
                    </div>

                    {/* Consumer-Specific Field */}
                    {role === "consumer" && (
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">Address</label>
                            <textarea
                                placeholder="Address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg"
                            />
                        </div>
                    )}

                    {/* Farmer-Specific Fields */}
                    {role === "farmer" && (
                        <>
                            <div>
                                <label className="block text-gray-700 font-semibold mb-2">Farm Details</label>
                                <textarea
                                    placeholder="Farm Details"
                                    value={farmDetails}
                                    onChange={(e) => setFarmDetails(e.target.value)}
                                    required
                                    className="w-full p-3 border border-gray-300 rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-semibold mb-2">Phone Number</label>
                                <input
                                    type="text"
                                    placeholder="Phone Number"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    required
                                    className="w-full p-3 border border-gray-300 rounded-lg"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-semibold mb-2">Farm Location</label>
                                <input
                                    type="text"
                                    placeholder="Farm Location"
                                    value={farmLocation}
                                    onChange={(e) => setFarmLocation(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg"
                                />
                            </div>
                        </>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
                    >
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
}

export default SignUp;