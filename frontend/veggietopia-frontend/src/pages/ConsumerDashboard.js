
import React, { useState, useEffect } from "react";
import Chatbot from "../components/Chatbot";
import { useNavigate } from "react-router-dom";
import Recommendations from "../components/Recommendations";

import FeedbackForm from "../components/FeedbackForm";



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

    const [cart, setCart] = useState([]); // Cart items state
    const [locationFilter, setLocationFilter] = useState(""); // For location-based filtering
    const [showFeedbackForm, setShowFeedbackForm] = useState(false);

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
        const fetchCart = async () => {
            try {
                const response = await fetch(`${apiUrl}/cart`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (response.ok) {
                    const data = await response.json();
                    setCart(data);
                } else {
                    console.error("Failed to fetch cart from database");
                }
            } catch (error) {
                console.error("Error fetching cart:", error);
            }
        };
        fetchCart();

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

                const response = await fetch(`${apiUrl}/orders`, {
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

    const handleAddToCart = async (product) => {
        // Update local state first
        setCart((prevCart) => {
            const existing = prevCart.find((p) => p.id === product.id);
            if (existing) {
                return prevCart.map((p) =>
                    p.id === product.id
                        ? { ...p, quantity: (p.quantity || 1) + 1 }
                        : p
                );
            }
            return [...prevCart, { ...product, quantity: 1 }];
        });
    
        // Then send update to the backend to persist the cart
        try {
            const response = await fetch(`${apiUrl}/cart`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ productId: product.id, quantity: 1 }),
        });
        if (response.ok) {
            alert("Added to cart");
            // Optionally update local state or refresh cart here if needed.
        } else {
            console.error("Failed to save cart item to the database");
        }
      } catch (error) {
        console.error("Error saving cart item:", error);
      }
    };
                                 // Add this function inside your ConsumerDashboard component:
                const handleRemoveFromCart = async (product) => {
                    // Update local state by filtering out the removed item
                    setCart((prevCart) => prevCart.filter((item) => item.id !== product.id));
                
                    // Send DELETE request to the backend to remove item
                    try {
                        const response = await fetch(`${apiUrl}/cart`, {
                            method: "DELETE",
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${token}`,
                            },
                            body: JSON.stringify({ productId: product.id }),
                        });
                        if (!response.ok) {
                            console.error("Failed to remove cart item from the database");
                        }
                    } catch (error) {
                        console.error("Error removing cart item:", error);
                    }
                };
                
                // Then, modify your cart tab content to include a "Remove" button:

    const applyFilters = (products) => {
        return products.filter((product) => {
            const matchCategory = categoryFilter ? product.category === categoryFilter : true;
            const matchMin = priceRange.min ? product.price >= Number(priceRange.min) : true;
            const matchMax = priceRange.max ? product.price <= Number(priceRange.max) : true;
            const matchSearch = product.name.toLowerCase().includes(search.toLowerCase());

            const matchLocation = locationFilter 
                ? product.farmer_location && product.farmer_location.toLowerCase().includes(locationFilter.toLowerCase())
                : true;
            return matchCategory && matchMin && matchMax && matchSearch && matchLocation;

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

    }

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-500 to-green-500">
            {/* Navbar */}
            <nav className="flex justify-between items-center bg-blue-800 text-white p-5">
                <h2 className="text-2xl font-bold">Consumer Dashboard</h2>
                <div className="space-x-5">
                    <button onClick={() => setSelectedTab("home")} className="hover:underline">Home</button>
                    <button onClick={() => setSelectedTab("profile")} className="hover:underline">Profile</button>
                    <button onClick={() => setSelectedTab("orders")} className="hover:underline">Orders</button>
                    <button onClick={() => setSelectedTab("chatbot")} className="hover:underline">Chatbot</button>

                    <button onClick={() => setSelectedTab("cart")} className="hover:underline">Cart</button>
                    <button onClick={() => setShowFeedbackForm(true)}>Feedback</button>
                    <button onClick={handleLogout} className="hover:bg-red-600 bg-red-500 px-3 py-1 rounded">
                        Logout
                    </button>
                    {showFeedbackForm && (
                    <FeedbackForm
                    userId={localStorage.getItem("userId")}
                   role="consumer"
                   onClose={() => setShowFeedbackForm(false)}
                   />
                   )}
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

                                 {/* <input
                                    type="text"
                                    placeholder="Farmer Location"
                                    value={locationFilter}
                                    onChange={(e) => setLocationFilter(e.target.value)}
                                    className="w-full p-2 mb-4 text-black border border-gray-300 rounded"
                                /> */}
                            </div>

                            {/* Product Grid */}
                            <div className="w-3/4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
                                {filteredProducts.map((product) => (
                                    <div
                                        key={product.id}
                                        className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"

                                        onClick={() => navigate(`/products/${product.id}`)}

                                    >
                                        <img
                                            src={product.image_url || "default-image.jpg"}
                                            alt={product.name}
                                            className="w-full h-40 object-cover rounded-md mb-4"
                                        />
                                        <h4 className="font-semibold text-lg">{product.name}</h4>
                                        <p className="text-gray-700"><strong>Price:</strong> ₹{product.price}</p>

                                        <p className="text-gray-700">
                                        <strong>Farmer:</strong> {product.farmer_name || "Unknown"} {product.farmer_location && `(${product.farmer_location})`}
                                        </p>
                                        <button 
                                        onClick={(e) => {
                                             e.stopPropagation();
                                             handleAddToCart(product);
                                    }}
                                    className="mt-2 bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600 transition"
                                    >
                                    Add to Cart
                                    </button>
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

                
                {selectedTab === "cart" && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">My Cart</h2>
                    {cart.length > 0 ? (
                      cart.map((item) => (
                        <div key={item.id} className="border p-3 mt-2 bg-black-100">
                          <p><strong>{item.name}</strong></p>
                          <p>Price: ₹{item.price} x {item.quantity}</p>
                          <p>Total: ₹{item.price * item.quantity}</p>
                          <button 
                            onClick={() => handleRemoveFromCart(item)}
                            className="mt-2 bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition"
                          >
                            Remove from Cart
                          </button>
                        </div>
                      ))
                    ) : <p className="text-gray-600">Your cart is empty.</p>}
                  </div>
                )}
                {selectedTab === "recommendations" && (
                    <Recommendations userId={userId} products={products} />

                )}
                {selectedTab === "orders" && (
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">My Orders</h2>
                        {orders.length > 0 ? (
                            orders.map((order) => (

                                <div key={order.id} className="border p-3 mt-2 bg-black-100">
                                    <p><strong>Product:</strong> {order.product_name}</p>
                                    <p><strong>Farmer:</strong> {order.farmer_name}</p>
                                    <p><strong>Price:</strong> ₹{order.price}</p>
                                    <p><strong>Quantity:</strong> {order.quantity}</p>
                                    <p><strong>Status:</strong> {order.status}</p>
                                    <p><strong>Amount:</strong> ₹{order.amount}</p>
                                </div>
                            ))
                        ) : <p className="text-black-600">No orders yet.</p>}
                    </div>
                )}

                {selectedTab === "chatbot" && <Chatbot />}
            </div>
        </div>
    );
}

export default ConsumerDashboard;