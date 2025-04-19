// // import { useState, useEffect } from "react";
// // import Chatbot from "../components/Chatbot";

// // const apiUrl = "http://localhost:3000/api";

// // function ConsumerDashboard() {
// //     const [consumer, setConsumer] = useState(null);
// //     const [orders, setOrders] = useState([]);
// //     const [search, setSearch] = useState("");
// //     const [selectedTab, setSelectedTab] = useState("home");
// //     const [topProducts, setTopProducts] = useState([]);
// //     const [products, setProducts] = useState([]);
// //     const [searchResults, setSearchResults] = useState([]);
// //     const [categoryFilter, setCategoryFilter] = useState("");
// //     const [priceRange, setPriceRange] = useState({ min: "", max: "" });

// //     const token = localStorage.getItem("token");
// //     const userId = localStorage.getItem("userId");

// //     useEffect(() => {
// //         if (!token || !userId) {
// //             alert("Not logged in! Redirecting...");
// //             window.location.href = "/";
// //             return;
// //         }

// //         const fetchProfile = async () => {
// //             try {
// //                 const response = await fetch(`${apiUrl}/consumer/dashboard/${userId}`, {
// //                     headers: { Authorization: `Bearer ${token}` },
// //                 });
// //                 const data = await response.json();
// //                 setConsumer(data);
// //             } catch (err) {
// //                 console.error("Error loading profile:", err);
// //             }
// //         };

// //         const fetchProducts = async () => {
// //             try {
// //                 const response = await fetch(`/products`, {
// //                     method: "GET",
// //                     headers: { Authorization: `Bearer ${token}` }
// //                 });
// //                 const data = await response.json();
// //                 // Ensure the data is an array before setting state
// //                 if (Array.isArray(data)) {
// //                     setProducts(data);
// //                 } else {
// //                     console.error("Fetched data is not an array", data);
// //                 }
// //             } catch (error) {
// //                 console.error("Error loading products:", error);
// //             }
// //         };

// //         const fetchOrders = async () => {
// //             try {
// //                 const response = await fetch(`${apiUrl}/consumer/orders/${userId}`, {
// //                     headers: { Authorization: `Bearer ${token}` },
// //                 });
// //                 const data = await response.json();
// //                 setOrders(data);
// //             } catch (err) {
// //                 console.error("Error loading orders:", err);
// //             }
// //         };

// //         const fetchTopProducts = async () => {
// //             try {
// //                 const res = await fetch(`${apiUrl}/farmer/products/top?limit=20`);
// //                 const data = await res.json();
// //                 setTopProducts(data);
// //             } catch (err) {
// //                 console.error("Error loading top products:", err);
// //             }
// //         };

// //         fetchProfile();
// //         fetchOrders();
// //         fetchTopProducts();
// //         fetchProducts();
// //     }, [token, userId]);

// //     const handleLogout = () => {
// //         localStorage.clear();
// //         window.location.href = "/";
// //     };

// //     const handleSearch = async (e) => {
// //         const value = e.target.value;
// //         setSearch(value);

// //         if (!value.trim()) {
// //             setSearchResults([]);
// //             return;
// //         }

// //         try {
// //             const response = await fetch(`${apiUrl}/farmer/products/search?query=${value}`);
// //             const data = await response.json();
// //             setSearchResults(data);
// //         } catch (error) {
// //             console.error("Error searching products:", error);
// //         }
// //     };

// //     const handleAddToCart = (product) => {
// //         alert(`Added ${product.name} to cart`);
// //     };

// //     const applyFilters = (products) => {
// //         if (!Array.isArray(products)) return []; // Ensure it's always an array
// //         return products.filter(product => {
// //             const matchCategory = categoryFilter ? product.category === categoryFilter : true;
// //             const matchMin = priceRange.min ? product.price >= Number(priceRange.min) : true;
// //             const matchMax = priceRange.max ? product.price <= Number(priceRange.max) : true;
// //             return matchCategory && matchMin && matchMax;
// //         });
// //     };

// //     // Apply filters for all product views (top products, search results, and all products)
// //     const filteredTopProducts = applyFilters(topProducts);
// //     const filteredSearchResults = applyFilters(searchResults);
// //     const filteredProducts = applyFilters(products).filter(product =>
// //         product.name.toLowerCase().includes(search.toLowerCase())
// //     );

// //     return (
// //         <div className="min-h-screen bg-gray-100">
// //             {/* Navbar */}
// //             <nav className="flex justify-between items-center bg-blue-800 text-white p-5">
// //                 <h2 className="text-2xl font-bold">Dashboard</h2>
// //                 <div className="space-x-5">
// //                     <button onClick={() => setSelectedTab("home")} className="hover:underline">Home</button>
// //                     <button onClick={() => setSelectedTab("profile")} className="hover:underline">Profile</button>
// //                     <button onClick={() => setSelectedTab("orders")} className="hover:underline">Orders</button>
// //                     <button onClick={() => setSelectedTab("chatbot")} className="hover:underline">Chatbot</button>
// //                     <button onClick={handleLogout} className="hover:bg-red-600 px-3 py-1 rounded">Logout</button>
// //                 </div>
// //             </nav>

// //             {/* Main Content */}
// //             <div className="p-5">
// //                 {selectedTab === "home" && (
// //                     <>
// //                         <h1 className="text-3xl font-bold mb-2">Welcome back, {consumer?.name}!</h1>
// //                         <p className="text-lg">What would you like to shop today?</p>

// //                         {/* Search Input */}
// //                         <input
// //                             type="text"
// //                             placeholder="Search for products..."
// //                             value={search}
// //                             onChange={handleSearch}
// //                             className="w-full p-2 mt-4 border border-gray-300 rounded"
// //                         />

// //                         {/* Filters */}
// //                         <div className="flex flex-col sm:flex-row gap-4 mt-4">
// //                             <input
// //                                 type="text"
// //                                 placeholder="Category"
// //                                 value={categoryFilter}
// //                                 onChange={(e) => setCategoryFilter(e.target.value)}
// //                                 className="flex-1 p-2 border border-gray-300 rounded"
// //                             />
// //                             <input
// //                                 type="number"
// //                                 placeholder="Min Price"
// //                                 value={priceRange.min}
// //                                 onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
// //                                 className="flex-1 p-2 border border-gray-300 rounded"
// //                             />
// //                             <input
// //                                 type="number"
// //                                 placeholder="Max Price"
// //                                 value={priceRange.max}
// //                                 onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
// //                                 className="flex-1 p-2 border border-gray-300 rounded"
// //                             />
// //                         </div>

// //                         {/* Search Results */}
// //                         {search && (
// //                             <div className="mt-6">
// //                                 <h3 className="text-lg font-semibold mb-2">Search Results:</h3>
// //                                 {filteredSearchResults.length ? (
// //                                     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
// //                                         {filteredSearchResults.map((product) => (
// //                                             <div key={product.id} className="bg-white p-4 rounded shadow">
// //                                                 <h4 className="font-semibold text-lg">{product.name}</h4>
// //                                                 <p>Price: ₹{product.price}</p>
// //                                                 <p>Category: {product.category}</p>
// //                                                 <p>Farmer: {product.farmer_name || "N/A"}</p>
// //                                                 <button
// //                                                     className="mt-2 px-3 py-1 bg-green-600 text-white rounded"
// //                                                     onClick={() => handleAddToCart(product)}
// //                                                 >
// //                                                     Add to Cart
// //                                                 </button>
// //                                             </div>
// //                                         ))}
// //                                     </div>
// //                                 ) : (
// //                                     <p>No products found.</p>
// //                                 )}
// //                             </div>
// //                         )}

// //                         {/* Top Products */}
// //                         {!search && (
// //                             <div className="mt-8">
// //                                 <h2 className="text-xl font-bold mb-2">Top Products</h2>
// //                                 {filteredTopProducts.length > 0 ? (
// //                                     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
// //                                         {filteredTopProducts.map((product) => (
// //                                             <div key={product.id} className="bg-white p-4 rounded shadow">
// //                                                 <h4 className="font-semibold text-lg">{product.name}</h4>
// //                                                 <p>Price: ₹{product.price}</p>
// //                                                 <p>Category: {product.category}</p>
// //                                                 <p>Farmer: {product.farmer_name || "N/A"}</p>
// //                                                 <button
// //                                                     className="mt-2 px-3 py-1 bg-green-600 text-white rounded"
// //                                                     onClick={() => handleAddToCart(product)}
// //                                                 >
// //                                                     Add to Cart
// //                                                 </button>
// //                                             </div>
// //                                         ))}
// //                                     </div>
// //                                 ) : (
// //                                     <p className="text-gray-500">No top products available.</p>
// //                                 )}
// //                             </div>
// //                         )}
// //                     </>
// //                 )}

// //                 {selectedTab === "profile" && (
// //                     <div>
// //                         <h2 className="text-2xl font-bold">My Profile</h2>
// //                         {consumer ? (
// //                             <div>
// //                                 <p><strong>Name:</strong> {consumer.name}</p>
// //                                 <p><strong>Email:</strong> {consumer.email}</p>
// //                                 <p><strong>Address:</strong> {consumer.address}</p>
// //                             </div>
// //                         ) : <p>Loading profile...</p>}
// //                     </div>
// //                 )}

// //                 {selectedTab === "orders" && (
// //                     <div>
// //                         <h2 className="text-2xl font-bold">My Orders</h2>
// //                         {orders.length > 0 ? (
// //                             orders.map(order => (
// //                                 <div key={order.id} className="border p-3 mt-2 bg-white">
// //                                     <p><strong>Product:</strong> {order.product_name}</p>
// //                                     <p><strong>Farmer:</strong> {order.farmer_name}</p>
// //                                     <p><strong>Price:</strong> ₹{order.price}</p>
// //                                 </div>
// //                             ))
// //                         ) : <p>No orders yet.</p>}
// //                     </div>
// //                 )}

// //                 {selectedTab === "chatbot" && <Chatbot />}
// //             </div>
// //         </div>
// //     );
// // }

// // export default ConsumerDashboard;

// import { useState, useEffect } from "react";
// import Chatbot from "../components/Chatbot";

// const apiUrl = "http://localhost:3000/api";

// function ConsumerDashboard() {
//     const [consumer, setConsumer] = useState(null);
//     const [orders, setOrders] = useState([]);
//     const [search, setSearch] = useState("");
//     const [selectedTab, setSelectedTab] = useState("home");
//     const [topProducts, setTopProducts] = useState([]);
//     const [products, setProducts] = useState([]);
//     const [searchResults, setSearchResults] = useState([]);
//     const [categoryFilter, setCategoryFilter] = useState("");
//     const [priceRange, setPriceRange] = useState({ min: "", max: "" });

//     const token = localStorage.getItem("token");
//     const userId = localStorage.getItem("userId");

//     useEffect(() => {
//         if (!token || !userId) {
//             alert("Not logged in! Redirecting...");
//             window.location.href = "/";
//             return;
//         }

//         const fetchProfile = async () => {
//             try {
//                 const response = await fetch(`${apiUrl}/consumer/dashboard/${userId}`, {
//                     headers: { Authorization: `Bearer ${token}` },
//                 });
//                 const data = await response.json();
//                 setConsumer(data);
//             } catch (err) {
//                 console.error("Error loading profile:", err);
//             }
//         };

//         const fetchProducts = async () => {
//             try {
//                 const response = await fetch(`${apiUrl}/products?search=${encodeURIComponent(search)}`, {
//                     method: "GET",
//                     headers: { Authorization: `Bearer ${token}` }
//                 });
        
//                 const data = await response.json();
//                 console.log("All products fetched:", data);
//                 if (Array.isArray(data)) {
//                     setProducts(data);
//                 } else {
//                     console.error("Fetched data is not an array", data);
//                 }
//             } catch (error) {
//                 console.error("Error loading products:", error);
//             }
//         };
        

//         const fetchOrders = async () => {
//             try {
//                 const response = await fetch(`${apiUrl}/consumer/orders/${userId}`, {
//                     headers: { Authorization: `Bearer ${token}` },
//                 });
//                 const data = await response.json();
//                 setOrders(data);
//             } catch (err) {
//                 console.error("Error loading orders:", err);
//             }
//         };

//         const fetchTopProducts = async () => {
//             try {
//                 const res = await fetch(`${apiUrl}/farmer/products/top?limit=20`);
//                 const data = await res.json();
//                 setTopProducts(data);
//             } catch (err) {
//                 console.error("Error loading top products:", err);
//             }
//         };

//         fetchProfile();
//         fetchOrders();
//         fetchTopProducts();
//         fetchProducts();
//     }, [token, userId,search]);

//     const handleLogout = () => {
//         localStorage.clear();
//         window.location.href = "/";
//     };

//     const handleSearch = async (e) => {
//         const value = e.target.value;
//         setSearch(value);

//         if (!value.trim()) {
//             setSearchResults([]);
//             return;
//         }

//         try {
//             // ✅ Use generic product search route
//             const response = await fetch(`${apiUrl}/products?search=${encodeURIComponent(value)}`, {
//             headers: { Authorization: `Bearer ${token}` }
//          });
  
//             const data = await response.json();
//             if (Array.isArray(data)) {
//                 setSearchResults(data); // ✅ Updated with proper result
//             } else {
//                 console.error("Unexpected search result format:", data);
//             }
//         } catch (error) {
//             console.error("Error searching products:", error);
//         }
//     };

//     const handleAddToCart = (product) => {
//         alert(`Added ${product.name} to cart`);
//     };

//     const applyFilters = (products) => {
//         if (!Array.isArray(products)) return []; // Ensure it's always an array
//         return products.filter(product => {
//             const matchCategory = categoryFilter ? product.category === categoryFilter : true;
//             const matchMin = priceRange.min ? product.price >= Number(priceRange.min) : true;
//             const matchMax = priceRange.max ? product.price <= Number(priceRange.max) : true;
//             return matchCategory && matchMin && matchMax;
//         });
//     };

//     // Apply filters for all product views (top products, search results, and all products)
//     const filteredTopProducts = applyFilters(topProducts);
//     const filteredSearchResults = applyFilters(searchResults);
//     const filteredProducts = applyFilters(products); // All products after filter

//     // const filteredProducts = applyFilters(products).filter(product =>
//     //      product.name.toLowerCase().includes(search.toLowerCase())
//     //  );

//     return (
//         <div className="min-h-screen bg-gray-100">
//             {/* Navbar */}
//             <nav className="flex justify-between items-center bg-blue-800 text-white p-5">
//                 <h2 className="text-2xl font-bold">Dashboard</h2>
//                 <div className="space-x-5">
//                     <button onClick={() => setSelectedTab("home")} className="hover:underline">Home</button>
//                     <button onClick={() => setSelectedTab("profile")} className="hover:underline">Profile</button>
//                     <button onClick={() => setSelectedTab("orders")} className="hover:underline">Orders</button>
//                     <button onClick={() => setSelectedTab("chatbot")} className="hover:underline">Chatbot</button>
//                     <button onClick={handleLogout} className="hover:bg-red-600 px-3 py-1 rounded">Logout</button>
//                 </div>
//             </nav>

//             {/* Main Content */}
//             <div className="p-5">
//                 {selectedTab === "home" && (
//                     <>
//                         <h1 className="text-3xl font-bold mb-2">Welcome back, {consumer?.name}!</h1>
//                         <p className="text-lg">What would you like to shop today?</p>

//                         {/* Search Input */}
//                         <input
//                             type="text"
//                             placeholder="Search for products..."
//                             value={search}
//                             onChange={handleSearch}
//                             className="w-full p-2 mt-4 border border-gray-300 rounded"
//                         />

//                         {/* Filters */}
//                         <div className="flex flex-col sm:flex-row gap-4 mt-4">
//                             <input
//                                 type="text"
//                                 placeholder="Category"
//                                 value={categoryFilter}
//                                 onChange={(e) => setCategoryFilter(e.target.value)}
//                                 className="flex-1 p-2 border border-gray-300 rounded"
//                             />
//                             <input
//                                 type="number"
//                                 placeholder="Min Price"
//                                 value={priceRange.min}
//                                 onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
//                                 className="flex-1 p-2 border border-gray-300 rounded"
//                             />
//                             <input
//                                 type="number"
//                                 placeholder="Max Price"
//                                 value={priceRange.max}
//                                 onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
//                                 className="flex-1 p-2 border border-gray-300 rounded"
//                             />
//                         </div>

//                         {/* Search Results */}
//                         {search && (
//                             <div className="mt-6">
//                                 <h3 className="text-lg font-semibold mb-2">Search Results:</h3>
//                                 {filteredSearchResults.length ? (
//                                     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//                                         {filteredSearchResults.map((product) => (
//                                             <div key={product.id} className="bg-white p-4 rounded shadow">
//                                                 <h4 className="font-semibold text-lg">{product.name}</h4>
//                                                 <p>Price: ₹{product.price}</p>
//                                                 <p>Category: {product.category}</p>
//                                                 <p>Farmer: {product.farmer_name || "N/A"}</p>
//                                                 <button
//                                                     className="mt-2 px-3 py-1 bg-green-600 text-white rounded"
//                                                     onClick={() => handleAddToCart(product)}
//                                                 >
//                                                     Add to Cart
//                                                 </button>
//                                             </div>
//                                         ))}
//                                     </div>
//                                 ) : (
//                                     <p>No products found.</p>
//                                 )}
//                             </div>
//                         )
                        
//                         }

//                         {/* Top Products */}
//                         {!search && (
//                             <div className="mt-8">
//                                 <h2 className="text-xl font-bold mb-2">Top Products</h2>
//                                 {filteredTopProducts.length > 0 ? (
//                                     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//                                         {filteredTopProducts.map((product) => (
//                                             <div key={product.id} className="bg-white p-4 rounded shadow">
//                                                 <h4 className="font-semibold text-lg">{product.name}</h4>
//                                                 <p>Price: ₹{product.price}</p>
//                                                 <p>Category: {product.category}</p>
//                                                 <p>Farmer: {product.farmer_name || "N/A"}</p>
//                                                 <button
//                                                     className="mt-2 px-3 py-1 bg-green-600 text-white rounded"
//                                                     onClick={() => handleAddToCart(product)}
//                                                 >
//                                                     Add to Cart
//                                                 </button>
//                                             </div>
//                                         ))}
//                                     </div>
//                                 ) : (
//                                     <p className="text-gray-500">No top products available.</p>
//                                 )}
//                             </div>
//                         )
                        
//                         }
//                         {/* All Products Section */}
//                         <div className="mt-8">
//                             <h2 className="text-xl font-bold mb-2">All Products</h2>
//                             {filteredProducts.length > 0 ? (
//                             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//                                 {filteredProducts.map((product) => (
//                                      <div key={product.id} className="bg-white p-4 rounded shadow">
//                                         <h4 className="font-semibold text-lg">{product.name}</h4>
//                                          <p>Price: ₹{product.price}</p>
//                                          <p>Category: {product.category}</p>
//                                          <p>Farmer: {product.farmer_name || "N/A"}</p>
//                                          <button
//                                         className="mt-2 px-3 py-1 bg-green-600 text-white rounded"
//                                         onClick={() => handleAddToCart(product)}
//                                 >
//                                 Add to Cart
//                             </button>
//                         </div>
//                     ))}
//                 </div>
//             ) : (
//         <p className="text-gray-500">No products found.</p>
//         )}
//         </div>

//                     </>
//         )}

//                 {selectedTab === "profile" && (
//                     <div>
//                         <h2 className="text-2xl font-bold">My Profile</h2>
//                         {consumer ? (
//                             <div>
//                                 <p><strong>Name:</strong> {consumer.name}</p>
//                                 <p><strong>Email:</strong> {consumer.email}</p>
//                                 <p><strong>Address:</strong> {consumer.address}</p>
//                             </div>
//                         ) : <p>Loading profile...</p>}
//                     </div>
//                 )}

//                 {selectedTab === "orders" && (
//                     <div>
//                         <h2 className="text-2xl font-bold">My Orders</h2>
//                         {orders.length > 0 ? (
//                             orders.map(order => (
//                                 <div key={order.id} className="border p-3 mt-2 bg-white">
//                                     <p><strong>Product:</strong> {order.product_name}</p>
//                                     <p><strong>Farmer:</strong> {order.farmer_name}</p>
//                                     <p><strong>Price:</strong> ₹{order.price}</p>
//                                 </div>
//                             ))
//                         ) : <p>No orders yet.</p>}
//                     </div>
//                 )}

//                 {selectedTab === "chatbot" && <Chatbot />}
//             </div>
//         </div>
//     );
// }

// export default ConsumerDashboard;
import React, { useState, useEffect } from "react";
import Chatbot from "../components/Chatbot";
import { useNavigate } from "react-router-dom";
import Recommendations from "../components/Recommendations";


const apiUrl = "http://localhost:3000/api";

function ConsumerDashboard() {
    const [products, setProducts] = useState([]); // State to store products
    const [search, setSearch] = useState(""); // State for search input
    const [categoryFilter, setCategoryFilter] = useState(""); // State for category filter
    const [priceRange, setPriceRange] = useState({ min: "", max: "" }); // State for price range filter
    const [selectedTab, setSelectedTab] = useState("home"); // State for selected tab
    const [consumer, setConsumer] = useState(null); // State for consumer profile
    const [orders, setOrders] = useState([]); // State for orders
    const [loading, setLoading] = useState(true); // State for loading
    const [error, setError] = useState(null); // State for errors

    const navigate = useNavigate();
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token || !userId) {
            alert("Not logged in! Redirecting...");
            window.location.href = "/";
            return;
        }

        const fetchProfile = async () => {
            try {
                const response = await fetch(`${apiUrl}/consumer/dashboard/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await response.json();
                setConsumer(data);
            } catch (err) {
                console.error("Error loading profile:", err);
            }
        };

        const fetchProducts = async () => {
            try {
                const response = await fetch(`${apiUrl}/products`, {
                    method: "GET",
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch products");
                }

                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error("Error loading products:", error);
                setError("Failed to load products. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        const fetchOrders = async () => {
            try {
                const response = await fetch(`${apiUrl}/consumer/orders/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await response.json();
                setOrders(data);
            } catch (err) {
                console.error("Error loading orders:", err);
            }
        };

        fetchProfile();
        fetchProducts();
        fetchOrders();
    }, [userId, token]);

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const applyFilters = (products) => {
        return products.filter((product) => {
            const matchCategory = categoryFilter ? product.category === categoryFilter : true;
            const matchMin = priceRange.min ? product.price >= Number(priceRange.min) : true;
            const matchMax = priceRange.max ? product.price <= Number(priceRange.max) : true;
            const matchSearch = product.name.toLowerCase().includes(search.toLowerCase());
            return matchCategory && matchMin && matchMax && matchSearch;
        });
    };

    const filteredProducts = applyFilters(products);

    const handleLogout = () => {
        localStorage.clear();
        window.location.href = "/";
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }return (
        <div className="min-h-screen bg-gradient-to-r from-blue-500 to-green-500">
            {/* Navbar */}
            <nav className="flex justify-between items-center bg-blue-800 text-white p-5">
                <h2 className="text-2xl font-bold">Consumer Dashboard</h2>
                <div className="space-x-5">
                    <button onClick={() => setSelectedTab("home")} className="hover:underline">Home</button>
                    <button onClick={() => setSelectedTab("profile")} className="hover:underline">Profile</button>
                    <button onClick={() => setSelectedTab("orders")} className="hover:underline">Orders</button>
                    <button onClick={() => setSelectedTab("chatbot")} className="hover:underline">Chatbot</button>
                    <button onClick={() => setSelectedTab("recommendations")} className="hover:underline">Recommendations</button>
                    <button onClick={handleLogout} className="hover:bg-red-600 bg-red-500 px-3 py-1 rounded">
                        Logout
                    </button>
                </div>
            </nav>
    
            {/* Main Content */}
            <div className="p-5">
                {selectedTab === "home" && (
                    <>
                        {/* Search Bar */}
                        <div className="flex justify-center mb-6">
                            <input
                                type="text"
                                placeholder="Search for products..."
                                value={search}
                                onChange={handleSearch}
                                className="w-full p-5 text-xl text-black border border-gray-300 rounded-lg shadow-md"
                            />
                        </div>
    
                        {/* Filters and Products */}
                        <div className="flex">
                            {/* Filters */}
                            <div className="w-1/4 p-4 bg-white rounded-lg shadow-md">
                                <h3 className="text-lg font-bold mb-4">Filters</h3>
                                <input
                                    type="text"
                                    placeholder="Category"
                                    value={categoryFilter}
                                    onChange={(e) => setCategoryFilter(e.target.value)}
                                    className="w-full p-2 mb-4 text-black border border-gray-300 rounded"
                                />
                                <input
                                    type="number"
                                    placeholder="Min Price"
                                    value={priceRange.min}
                                    onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                                    className="w-full p-2 mb-4 text-black border border-gray-300 rounded"
                                />
                                <input
                                    type="number"
                                    placeholder="Max Price"
                                    value={priceRange.max}
                                    onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                                    className="w-full p-2 mb-4 text-black border border-gray-300 rounded"
                                />
                            </div>
    
                            {/* Product Grid */}
                            <div className="w-3/4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
                                {filteredProducts.map((product) => (
                                    <div
                                        key={product.id}
                                        className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                                        onClick={() => navigate(`/product/${product.id}`)}
                                    >
                                        <img
                                            src={product.image_url || "default-image.jpg"}
                                            alt={product.name}
                                            className="w-full h-40 object-cover rounded-md mb-4"
                                        />
                                        <h4 className="font-semibold text-lg">{product.name}</h4>
                                        <p className="text-gray-700"><strong>Price:</strong> ₹{product.price}</p>
                                        <p className="text-gray-700"><strong>Farmer:</strong> {product.farmer_name || "Unknown"}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}
    
                {selectedTab === "profile" && (
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">My Profile</h2>
                        {consumer ? (
                            <div className="text-gray-700">
                                <p><strong>Name:</strong> {consumer.name}</p>
                                <p><strong>Email:</strong> {consumer.email}</p>
                                <p><strong>Address:</strong> {consumer.address}</p>
                            </div>
                        ) : <p className="text-gray-600">Loading profile...</p>}
                    </div>
                )}
                 {selectedTab === "recommendations" && (

                    <Recommendations userId={userId} />
                )}
                {selectedTab === "orders" && (
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">My Orders</h2>
                        {orders.length > 0 ? (
                            orders.map((order) => (
                                <div key={order.id} className="border p-3 mt-2 bg-white">
                                    <p><strong>Product:</strong> {order.product_name}</p>
                                    <p><strong>Farmer:</strong> {order.farmer_name}</p>
                                    <p><strong>Price:</strong> ₹{order.price}</p>
                                </div>
                            ))
                        ) : <p className="text-gray-600">No orders yet.</p>}
                    </div>
                )}
    
                {selectedTab === "chatbot" && <Chatbot />}
            </div>
        </div>
    );
}

export default ConsumerDashboard;