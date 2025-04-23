// // import { useState, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";
// // import Chatbot from "../components/Chatbot";

// // const apiUrl = "http://localhost:3000/api";

// // function FarmerDashboard() {
// //   const [farmer, setFarmer] = useState(null);
// //   const [products, setProducts] = useState([]);
// //   const [orders, setOrders] = useState([]);
// //   const [newProduct, setNewProduct] = useState({ name: "", price: "" });
// //   const token = localStorage.getItem("token");
// //   const userId = localStorage.getItem("userId");
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     if (!token || !userId) {
// //       alert("Not logged in! Redirecting...");
// //       navigate("/");
// //       return;
// //     }

// //     const fetchProfile = async () => {
// //       try {
// //         const response = await fetch(`${apiUrl}/farmer/dashboard/${userId}`, {
// //           method: "GET",
// //           headers: { Authorization: `Bearer ${token}` },
// //         });

// //         if (!response.ok) throw new Error("Profile fetch failed");
// //         const data = await response.json();
// //         setFarmer(data);
// //       } catch (error) {
// //         console.error("Error loading profile:", error);
// //       }
// //     };

// //     const fetchProducts = async () => {
// //       try {
// //         const response = await fetch(`${apiUrl}/farmer/products/${userId}`);
// //         const data = await response.json();
// //         setProducts(data);
// //       } catch (error) {
// //         console.error("Error loading products:", error);
// //       }
// //     };

// //     const fetchOrders = async () => {
// //       try {
// //         const response = await fetch(`${apiUrl}/farmer/orders/${userId}`);
// //         const data = await response.json();
// //         setOrders(data);
// //       } catch (error) {
// //         console.error("Error loading orders:", error);
// //       }
// //     };

// //     fetchProfile();
// //     fetchProducts();
// //     fetchOrders();
// //   }, [navigate, token, userId]);

// //   const handleAddProduct = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const response = await fetch(`${apiUrl}/farmer/add-product`, {
// //         method: "POST",
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify({ ...newProduct, farmer_id: userId }),
// //       });

// //       const data = await response.json();
// //       alert(data.message);
// //       setProducts([...products, data.product]);
// //       setNewProduct({ name: "", price: "" });
// //     } catch (error) {
// //       console.error("Error adding product:", error);
// //       alert("Failed to add product.");
// //     }
// //   };

// //   const handleLogout = () => {
// //     localStorage.removeItem("token");
// //     localStorage.removeItem("userId");
// //     navigate("/login");
// //   };

// //   return (
// //     <div className="flex h-screen bg-gray-100">
// //       {/* Sidebar */}
// //       <div className="w-64 bg-green-700 text-white flex flex-col p-5">
// //         <h2 className="text-3xl font-bold">Farmer</h2>
// //         <nav className="mt-5 space-y-4">
// //           <button onClick={() => navigate("/farmer-profile")} className="block w-full text-left">Profile</button>
// //           <button onClick={() => navigate("/farmer-orders")} className="block w-full text-left">Orders</button>
// //           <button onClick={() => navigate("/farmer-add-product")} className="block w-full text-left">Add Product</button>
// //           <button onClick={() => navigate("/farmer-chatbot")} className="block w-full text-left">Chatbot</button>
// //           <button onClick={handleLogout} className="block w-full text-left">Logout</button>
// //         </nav>
// //       </div>

// //       {/* Main Content */}
// //       <div className="flex-1 p-5">
// //         {/* Header */}
// //         <h1 className="text-3xl font-bold text-green-900">Farmer Dashboard</h1>

// //         {/* Profile Section */}
// //         <section className="mt-5 bg-white p-5 rounded-lg shadow-md">
// //           <h2 className="text-xl font-bold">My Profile</h2>
// //           {farmer ? (
// //             <div>
// //               <p><strong>Name:</strong> {farmer.name}</p>
// //               <p><strong>Email:</strong> {farmer.email}</p>
// //               <p><strong>Farm Name:</strong> {farmer.farm_name}</p>
// //             </div>
// //           ) : <p>Loading profile...</p>}
// //         </section>

// //         {/* Add Product Section */}
// //         <section className="mt-5 bg-white p-5 rounded-lg shadow-md">
// //           <h2 className="text-xl font-bold">Add Product</h2>
// //           <form onSubmit={handleAddProduct} className="mt-3">
// //             <input
// //               type="text"
// //               placeholder="Product Name"
// //               value={newProduct.name}
// //               onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
// //               className="p-2 border border-gray-300 rounded-lg w-full mb-2"
// //               required
// //             />
// //             <input
// //               type="number"
// //               placeholder="Price"
// //               value={newProduct.price}
// //               onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
// //               className="p-2 border border-gray-300 rounded-lg w-full mb-2"
// //               required
// //             />
// //             <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg">Add Product</button>
// //           </form>
// //         </section>

// //         {/* Products Section */}
// //         <section className="mt-5">
// //           <h2 className="text-xl font-bold">My Products</h2>
// //           <div className="grid grid-cols-3 gap-4 mt-3">
// //             {products.length > 0 ? (
// //               products.map((product) => (
// //                 <div key={product.id} className="bg-white p-5 rounded-lg shadow-md">
// //                   <h3 className="text-lg font-bold">{product.name}</h3>
// //                   <p className="text-gray-600">${product.price}</p>
// //                 </div>
// //               ))
// //             ) : <p>No products added yet.</p>}
// //           </div>
// //         </section>

// //         {/* Orders Section */}
// //         <section className="mt-5">
// //           <h2 className="text-xl font-bold">Recent Orders</h2>
// //           <div className="mt-3">
// //             {orders.length > 0 ? (
// //               orders.map((order) => (
// //                 <div key={order.id} className="bg-white p-5 rounded-lg shadow-md mb-2">
// //                   <p><strong>Product:</strong> {order.product_name}</p>
// //                   <p><strong>Consumer:</strong> {order.consumer_name}</p>
// //                   <p><strong>Status:</strong> {order.status}</p>
// //                 </div>
// //               ))
// //             ) : <p>No orders yet.</p>}
// //           </div>
// //         </section>

// //         {/* Chatbot */}
// //         <Chatbot />
// //       </div>
// //     </div>
// //   );
// // }

// // export default FarmerDashboard;


// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Chatbot from "../components/Chatbot";
// import axios from "axios";

// const apiUrl = "http://localhost:3000/api";
// const farmerApiUrl = "http://localhost:3000/api";

// function FarmerDashboard() {
//   const [farmer, setFarmer] = useState(null);
//   const [products, setProducts] = useState([]);
//   const [orders, setOrders] = useState([]);
//   const [newProduct, setNewProduct] = useState({ name: "", price: "", quantity: "" });
//   const token = localStorage.getItem("token");
//   const userId = localStorage.getItem("userId");
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!token || !userId) {
//       alert("Not logged in! Redirecting...");
//       navigate("/");
//       return;
//     }

//     const fetchProfile = async () => {
//       try {
//         const response = await fetch(`${apiUrl}/farmer/dashboard/${userId}`, {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (!response.ok) throw new Error("Profile fetch failed");
//         const data = await response.json();
//         setFarmer(data);
//       } catch (error) {
//         console.error("Error loading profile:", error);
//       }
//     };

//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get(`${farmerApiUrl}/products`);
//         console.log("Fetched products:", response.data);
//         setProducts(response.data);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };

//     const fetchOrders = async () => {
//       try {
//         const response = await axios.get(`${farmerApiUrl}/orders`);
//         setOrders(response.data);
//       } catch (error) {
//         console.error("Error fetching orders:", error);
//       }
//     };

//     fetchProfile();
//     fetchProducts();
//     fetchOrders();
//   }, [navigate, token, userId]);
//   const handleAddProduct = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(`${farmerApiUrl}/products`, {
//       ...newProduct,

//        farmer_id: parseInt(userId)  // <-- Add this line
//     });
//       console.log("Product added:", response.data);
//       alert("Product added successfully!");
//       setProducts([...products, response.data]);
//       setNewProduct({ name: "", price: "", quantity: "" });
//     } catch (error) {
//       console.error("Error adding product:", error);
//       alert("Failed to add product.");
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("userId");
//     navigate("/login");
//   };

//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* Sidebar */}
//       <div className="w-64 bg-green-700 text-white flex flex-col p-5">
//         <h2 className="text-3xl font-bold">Farmer</h2>
//         <nav className="mt-5 space-y-4">
//           <button onClick={() => navigate("/farmer-profile")} className="block w-full text-left">Profile</button>
//           <button onClick={() => navigate("/farmer-orders")} className="block w-full text-left">Orders</button>
//           <button onClick={() => navigate("/farmer-add-product")} className="block w-full text-left">Add Product</button>
//           <button onClick={() => navigate("/farmer-chatbot")} className="block w-full text-left">Chatbot</button>
//           <button onClick={handleLogout} className="block w-full text-left">Logout</button>
//         </nav>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 p-5 overflow-y-auto">
//         {/* Header */}
//         <h1 className="text-3xl font-bold text-green-900">Farmer Dashboard</h1>

//         {/* Profile Section */}
//         <section className="mt-5 bg-white p-5 rounded-lg shadow-md">
//           <h2 className="text-xl font-bold">My Profile</h2>
//           {farmer ? (
//             <div>
//               <p><strong>Name:</strong> {farmer.name}</p>
//               <p><strong>Email:</strong> {farmer.email}</p>
//               <p><strong>Farm Name:</strong> {farmer.farm_name}</p>
//             </div>
//           ) : <p>Loading profile...</p>}
//         </section>

//         {/* Add Product Section */}
//         <section className="mt-5 bg-white p-5 rounded-lg shadow-md">
//           <h2 className="text-xl font-bold">Add Product</h2>
//           <form onSubmit={handleAddProduct} className="mt-3">
//             <input
//               type="text"
//               placeholder="Product Name"
//               value={newProduct.name}
//               onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
//               className="p-2 border border-gray-300 rounded-lg w-full mb-2"
//               required
//             />
//             <input
//               type="number"
//               placeholder="Price"
//               value={newProduct.price}
//               onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
//               className="p-2 border border-gray-300 rounded-lg w-full mb-2"
//               required
//             />
//             <input
//               type="number"
//               placeholder="Quantity"
//               value={newProduct.quantity}
//               onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
//               className="p-2 border border-gray-300 rounded-lg w-full mb-2"
//               required
//             />
//             <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg">Add Product</button>
//           </form>
//         </section>

//         {/* Products Section */}
//         <section className="mt-5">
//           <h2 className="text-xl font-bold">My Products</h2>
//           <div className="grid grid-cols-3 gap-4 mt-3">
//             {products.length > 0 ? (
//               products.map((product, index) => {
//                 // Check if the product is valid
//                 if (product && product.name && product.price && product.quantity) {
//                   return (
//                     <div key={product.id || index} className="bg-white p-5 rounded-lg shadow-md">
//                       <h3 className="text-lg font-bold">{product.name}</h3>
//                       <p className="text-gray-600">${product.price}</p>
//                       <p className="text-gray-600">Qty: {product.quantity}</p>
//                     </div>
//                   );
//                 } else {
//                   return null;
//                 }
//               })
//             ) : (
//               <p>No products added yet.</p>
//             )}
//           </div>
//         </section>

//         {/* Orders Section */}
//         <section className="mt-5">
//           <h2 className="text-xl font-bold">Recent Orders</h2>
//           <div className="mt-3">
//             {orders.length > 0 ? (
//               orders.map((order) => (
//                 <div key={order.id} className="bg-white p-5 rounded-lg shadow-md mb-2">
//                   <p><strong>Product:</strong> {order.productName}</p>
//                   <p><strong>Consumer:</strong> {order.consumerName}</p>
//                   <p><strong>Status:</strong> {order.status}</p>
//                 </div>
//               ))
//             ) : (
//               <p>No orders yet.</p>
//             )}
//           </div>
//         </section>

//         {/* Chatbot */}
//         <Chatbot />
//       </div>
//     </div>
//   );
// }

// export default FarmerDashboard;

import { useEffect, useState } from "react";
import Chatbot from "../components/Chatbot";
import { useCallback } from "react";

const apiUrl = "http://localhost:3000/api";

function FarmerDashboard() {
  const [farmer, setFarmer] = useState(null);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: "", price: "", quantity: "" });
  const [editingProductId, setEditingProductId] = useState(null);
  //const [loading, setLoading] = useState(true);
  //const [error, setError] = useState(null);
  const [selectedTab, setSelectedTab] = useState("home");

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");


  const fetchProducts = useCallback(async () => {
    try {
      const response = await fetch(`${apiUrl}/farmer/products/${userId}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      console.log("Fetched products in dashboard:", data);
      setProducts(data);
    } catch (error) {
      console.error("Error loading products:", error);
    }
  }, [userId, token]);

  useEffect(() => {
    if (!token || !userId) return;

    const fetchProfile = async () => {
      try {
        const response = await fetch(`${apiUrl}/farmer/dashboard/${userId}`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!response.ok) throw new Error("Profile fetch failed");
        const data = await response.json();


        console.log("Fetched farmer profile:", data);
        setFarmer(data);
      } catch (error) {
        console.error("Error loading profile:", error);
      }
    };

    const fetchOrders = async () => {
      try {
        const response = await fetch(`${apiUrl}/farmer/orders/${userId}`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await response.json();
        console.log("Fetched products in dashboard:", data);
        setOrders(data);
      } catch (error) {
        console.error("Error loading orders:", error);
      }
    };
    
    fetchProducts();
    fetchProfile();
    fetchOrders();
  }, [fetchProducts, token, userId]);
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };
  
  
  // const handleAddProduct = async () => {
  //   try {
  //     const res = await fetch(`${apiUrl}/farmer/products`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`
  //       },
  //       body: JSON.stringify({ ...newProduct, farmer_id: userId })
  //     });
  //     const data = await res.json();
  //     setProducts(prev => [...prev, data]);
  //     setNewProduct({ name: "", price: "", stock: "" });
  //   } catch (error) {
  //     console.error("Error adding product:", error);
  //   }
  // };
  const handleAddProduct = async () => {
    try {
      const res = await fetch(`${apiUrl}/farmer/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
              body: JSON.stringify({ ...newProduct, farmer_id: userId, image_url: "/images/default.jpg"}),
      });
  
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Server error: ${res.status} - ${errorText}`);
      }
  
      
      alert("Product added successfully!");
      fetchProducts();
    const data = await res.json();
      console.log("Product added:", data);
      //const data = await res.json();
      setProducts((prev) => [...prev, data]); // Ensure `data` includes `stock`
      setNewProduct({ name: "", price: "", stock: "" });
 
      } catch (error) {
      console.error("Error adding product:", error);
    }
  };
  
  
  const handleUpdateProduct = async (productId) => {
    try {
      await fetch(`${apiUrl}/products/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(newProduct)
      });
      alert("Product updated successfully!");
      // Refresh the product list
      fetchProducts();
      setEditingProductId(null);
      setNewProduct({ name: "", price: "", stock: "" });
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product");
    }
  };
  
  const handleDeleteProduct = async (productId) => {
    try {
      await fetch(`${apiUrl}/products/${productId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Product deleted successfully!");
      fetchProducts();
     } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
  
 return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-green-500 text-gray-800">
        {/* Navbar */}
        <nav className="flex justify-between items-center bg-blue-800 text-white p-5">
            <h2 className="text-2xl font-bold">Farmer Dashboard</h2>
            <div className="space-x-5">
                <button onClick={() => setSelectedTab("home")} className="hover:underline">Home</button>
                <button onClick={() => setSelectedTab("profile")} className="hover:underline">Profile</button>
                <button onClick={() => setSelectedTab("orders")} className="hover:underline">Orders</button>
                <button onClick={() => setSelectedTab("chatbot")} className="hover:underline">Chatbot</button>
                <button onClick={() => setSelectedTab("products")} className="hover:underline">Products</button>
                <button onClick={handleLogout} className="hover:bg-red-600 bg-red-500 px-3 py-1 rounded">
                    Logout
                </button>
            </div>
        </nav>

        {/* Main Content */}
        <div className="p-5">
            {selectedTab === "home" && (
                <div>
                    <h1 className="text-3xl font-bold text-white">Welcome back, {farmer?.name}!</h1>
                    <p className="text-lg mt-2 text-white">Manage your farm and track your sales!</p>
                </div>
            )}

            {selectedTab === "profile" && (
                <div>
                    <h2 className="text-2xl font-bold text-white">My Profile</h2>
                    {farmer ? (
                        <div className="text-white">
                            <p><strong>Name:</strong> {farmer.name}</p>
                            <p><strong>Email:</strong> {farmer.email}</p>
                            <p><strong>Farm Details:</strong> {farmer.farm_details}</p>
                            <p><strong>Phone Number:</strong> {farmer.phone_number}</p>
                        </div>
                    ) : <p className="text-white">Loading profile...</p>}
                </div>
            )}

            {selectedTab === "orders" && (
                <div>
                    <h2 className="text-2xl font-bold text-white">Product Orders</h2>
                    {orders.length > 0 ? (
                        orders.map(order => (
                            <div key={order.id} className="border p-3 mt-2 bg-white rounded shadow text-gray-800">
                                <p><strong>Product:</strong> {order.product_name}</p>
                                <p><strong>Buyer:</strong> {order.consumer_name}</p>
                                <p><strong>Quantity:</strong> {order.quantity}</p>
                                <p><strong>Total:</strong> ₹{order.total_price}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-white">No orders yet.</p>
                    )}
                </div>
            )}

            {selectedTab === "chatbot" && <Chatbot />}

            {selectedTab === "products" && (
                <div>
                    <h2 className="text-2xl font-bold text-white mb-4">My Products</h2>

                    {/* Add or Edit Form */}
                    <div className="bg-white p-4 rounded shadow mb-6 text-gray-800">
                        <h3 className="font-bold mb-2">{editingProductId ? "Edit Product" : "Add New Product"}</h3>
                        <input
                            className="border p-2 mr-2"
                            placeholder="Name"
                            value={newProduct.name}
                            onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
                        />
                        <input
                            className="border p-2 mr-2"
                            placeholder="Price"
                            type="number"
                            value={newProduct.price}
                            onChange={e => setNewProduct({ ...newProduct, price: e.target.value })}
                        />
                        <input
                            className="border p-2 mr-2"
                            placeholder="Stock"
                            type="number"
                            value={newProduct.stock}
                            onChange={e => setNewProduct({ ...newProduct, stock: e.target.value })}
                        />
                        <button
                            onClick={() =>
                                editingProductId
                                    ? handleUpdateProduct(editingProductId)
                                    : handleAddProduct()
                            }
                            className="bg-green-600 text-white px-4 py-2 rounded"
                        >
                            {editingProductId ? "Update" : "Add"}
                        </button>
                    </div>

                    {/* Product List */}
                    {products.length > 0 ? (
                        products.map((product) => (
                            <div key={product.id} className="border p-4 mb-2 bg-white rounded shadow flex items-center text-gray-800">
                                {/* Product Image */}
                                <img
                                    src={product.image_url || "/images/default.jpg"}
                                    alt={product.name}
                                    className="w-32 h-32 object-contain rounded mr-4"
                                />
                                {/* Product Details */}
                                <div>
                                    <p><strong>Name:</strong> {product.name}</p>
                                    <p><strong>Price:</strong> ₹{product.price}</p>
                                    <p><strong>Stock:</strong> {product.stock}kg</p>
                                    <div className="mt-2 space-x-2">
                                        <button
                                            onClick={() => {
                                                setEditingProductId(product.id);
                                                setNewProduct({
                                                    name: product.name,
                                                    price: product.price,
                                                    stock: product.stock,
                                                });
                                            }}
                                            className="bg-yellow-500 text-white px-2 py-1 rounded"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeleteProduct(product.id)}
                                            className="bg-red-500 text-white px-2 py-1 rounded"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-white">No products available. Add some products!</p>
                    )}
                </div>
            )}
        </div>
    </div>
);
}

export default FarmerDashboard;
