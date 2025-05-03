import { useEffect, useState, useCallback } from "react";
import Chatbot from "../components/Chatbot";
import authFetch from "../utils/apiClient";
const apiUrl = "http://localhost:3000/api";

function FarmerDashboard() {
  const [farmer, setFarmer] = useState(null);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: "", price: "", quantity: "" });
  const [editingProductId, setEditingProductId] = useState(null);
  const [selectedTab, setSelectedTab] = useState("home");

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    window.location.href = "/login";
  };

  const fetchProducts = useCallback(async () => {
    try {
      const response = await authFetch(`/farmer/products/${userId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      alert("Failed to fetch products");
    }
  }, [userId]);

  const fetchFarmer = useCallback(async () => {
    try {
      const response = await authFetch(`/farmer/dashboard/${userId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch farmer profile");
      }
      const data = await response.json();
      setFarmer(data);
    } catch (error) {
      console.error("Error fetching farmer profile:", error);
      alert("Failed to fetch farmer profile");
    }
  }, [userId]);

  const fetchOrders = useCallback(async () => {
    try {
      const response = await authFetch(`/farmer/${userId}/orders`);
      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      alert("Failed to fetch orders");
    }
  }, [userId]);

  useEffect(() => {
    fetchFarmer();
    fetchProducts();
    fetchOrders();
  }, [fetchFarmer, fetchProducts, fetchOrders]);

  // Add missing handlers for product management
  const handleAddProduct = async () => {
    if (!newProduct.name || !newProduct.price || !newProduct.stock) {
      alert("Please fill all product fields");
      return;
    }
    try {
      const response = await authFetch(`/farmer/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newProduct.name,
          price: parseFloat(newProduct.price),
          stock: parseInt(newProduct.stock, 10),
          farmer_id: userId
        })
      });
      if (!response.ok) {
        throw new Error("Failed to add product");
      }
      setNewProduct({ name: "", price: "", stock: "" });
      fetchProducts();
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product");
    }
  };

  const handleUpdateProduct = async (productId) => {
    if (!newProduct.name || !newProduct.price || !newProduct.stock) {
      alert("Please fill all product fields");
      return;
    }
    try {
      const response = await authFetch(`/farmer/products/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newProduct.name,
          price: parseFloat(newProduct.price),
          stock: parseInt(newProduct.stock, 10)
        })
      });
      if (!response.ok) {
        throw new Error("Failed to update product");
      }
      setEditingProductId(null);
      setNewProduct({ name: "", price: "", stock: "" });
      fetchProducts();
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product");
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      const response = await authFetch(`/farmer/products/${productId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete product");
      }
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product");
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await authFetch(`/farmer/orders/${orderId}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (!response.ok) {
        throw new Error("Failed to update order status");
      }
      // Update local orders state
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error("Error updating order status:", error);
      alert("Failed to update order status");
    }
  };

  const validStatuses = ['Pending', 'Confirmed', 'Out for Delivery', 'Cancelled', 'Delivered'];

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
                  <label className="block mt-2">
                    <span className="text-gray-700 font-semibold">Status:</span>
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      className="mt-1 block w-full rounded border-gray-300"
                    >
                      {validStatuses.map(status => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </label>
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
// import { useEffect, useState, useCallback } from "react";
// import Chatbot from "../components/Chatbot";

// const apiUrl = "http://localhost:3000/api";

// function FarmerDashboard() {
//   const [farmer, setFarmer] = useState(null);
//   const [orders, setOrders] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [newProduct, setNewProduct] = useState({ name: "", price: "", quantity: "" });
//   const [editingProductId, setEditingProductId] = useState(null);
//   const [selectedTab, setSelectedTab] = useState("home");

//   const token = localStorage.getItem("token");
//   const userId = localStorage.getItem("userId");

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("userId");
//     window.location.href = "/login";
//   };

//   const fetchProducts = async () => {
//     try {
//       const response = await fetch(`${apiUrl}/farmer/products?farmer_id=${userId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });
//       if (!response.ok) {
//         throw new Error("Failed to fetch products");
//       }
//       const data = await response.json();
//       setProducts(data);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//       alert("Failed to fetch products");
//     }
//   };

//   const fetchFarmer = async () => {
//     try {
//       const response = await fetch(`${apiUrl}/farmer/${userId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });
//       if (!response.ok) {
//         throw new Error("Failed to fetch farmer profile");
//       }
//       const data = await response.json();
//       setFarmer(data);
//     } catch (error) {
//       console.error("Error fetching farmer profile:", error);
//       alert("Failed to fetch farmer profile");
//     }
//   };

//   const fetchOrders = async () => {
//     try {
//       const response = await fetch(`${apiUrl}/farmer/${userId}/orders`, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });
//       if (!response.ok) {
//         throw new Error("Failed to fetch orders");
//       }
//       const data = await response.json();
//       setOrders(data);
//     } catch (error) {
//       console.error("Error fetching orders:", error);
//       alert("Failed to fetch orders");
//     }
//   };

//   useEffect(() => {
//     fetchFarmer();
//     fetchProducts();
//     fetchOrders();
//   }, []);

//   // Add missing handlers for product management
//   const handleAddProduct = async () => {
//     if (!newProduct.name || !newProduct.price || !newProduct.stock) {
//       alert("Please fill all product fields");
//       return;
//     }
//     try {
//       const response = await fetch(`${apiUrl}/farmer/products`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`
//         },
//         body: JSON.stringify({
//           name: newProduct.name,
//           price: parseFloat(newProduct.price),
//           stock: parseInt(newProduct.stock, 10),
//           farmer_id: userId
//         })
//       });
//       if (!response.ok) {
//         throw new Error("Failed to add product");
//       }
//       setNewProduct({ name: "", price: "", stock: "" });
//       fetchProducts();
//     } catch (error) {
//       console.error("Error adding product:", error);
//       alert("Failed to add product");
//     }
//   };

//   const handleUpdateProduct = async (productId) => {
//     if (!newProduct.name || !newProduct.price || !newProduct.stock) {
//       alert("Please fill all product fields");
//       return;
//     }
//     try {
//       const response = await fetch(`${apiUrl}/farmer/products/${productId}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`
//         },
//         body: JSON.stringify({
//           name: newProduct.name,
//           price: parseFloat(newProduct.price),
//           stock: parseInt(newProduct.stock, 10)
//         })
//       });
//       if (!response.ok) {
//         throw new Error("Failed to update product");
//       }
//       setEditingProductId(null);
//       setNewProduct({ name: "", price: "", stock: "" });
//       fetchProducts();
//     } catch (error) {
//       console.error("Error updating product:", error);
//       alert("Failed to update product");
//     }
//   };

//   const handleDeleteProduct = async (productId) => {
//     if (!window.confirm("Are you sure you want to delete this product?")) return;
//     try {
//       const response = await fetch(`${apiUrl}/farmer/products/${productId}`, {
//         method: "DELETE",
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });
//       if (!response.ok) {
//         throw new Error("Failed to delete product");
//       }
//       fetchProducts();
//     } catch (error) {
//       console.error("Error deleting product:", error);
//       alert("Failed to delete product");
//     }
//   };

//   const handleStatusChange = async (orderId, newStatus) => {
//     try {
//       const response = await fetch(`${apiUrl}/orders/${orderId}/status`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`
//         },
//         body: JSON.stringify({ status: newStatus })
//       });
//       if (!response.ok) {
//         throw new Error("Failed to update order status");
//       }
//       // Update local orders state
//       setOrders(prevOrders =>
//         prevOrders.map(order =>
//           order.id === orderId ? { ...order, status: newStatus } : order
//         )
//       );
//     } catch (error) {
//       console.error("Error updating order status:", error);
//       alert("Failed to update order status");
//     }
//   };

//   const validStatuses = ['Pending', 'Confirmed', 'Out for Delivery', 'Cancelled', 'Delivered'];

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-blue-500 to-green-500 text-gray-800">
//       {/* Navbar */}
//       <nav className="flex justify-between items-center bg-blue-800 text-white p-5">
//         <h2 className="text-2xl font-bold">Farmer Dashboard</h2>
//         <div className="space-x-5">
//           <button onClick={() => setSelectedTab("home")} className="hover:underline">Home</button>
//           <button onClick={() => setSelectedTab("profile")} className="hover:underline">Profile</button>
//           <button onClick={() => setSelectedTab("orders")} className="hover:underline">Orders</button>
//           <button onClick={() => setSelectedTab("chatbot")} className="hover:underline">Chatbot</button>
//           <button onClick={() => setSelectedTab("products")} className="hover:underline">Products</button>
//           <button onClick={handleLogout} className="hover:bg-red-600 bg-red-500 px-3 py-1 rounded">
//             Logout
//           </button>
//         </div>
//       </nav>

//       {/* Main Content */}
//       <div className="p-5">
//         {selectedTab === "home" && (
//           <div>
//             <h1 className="text-3xl font-bold text-white">Welcome back, {farmer?.name}!</h1>
//             <p className="text-lg mt-2 text-white">Manage your farm and track your sales!</p>
//           </div>
//         )}

//         {selectedTab === "profile" && (
//           <div>
//             <h2 className="text-2xl font-bold text-white">My Profile</h2>
//             {farmer ? (
//               <div className="text-white">
//                 <p><strong>Name:</strong> {farmer.name}</p>
//                 <p><strong>Email:</strong> {farmer.email}</p>
//                 <p><strong>Farm Details:</strong> {farmer.farm_details}</p>
//                 <p><strong>Phone Number:</strong> {farmer.phone_number}</p>
//               </div>
//             ) : <p className="text-white">Loading profile...</p>}
//           </div>
//         )}

//         {selectedTab === "orders" && (
//           <div>
//             <h2 className="text-2xl font-bold text-white">Product Orders</h2>
//             {orders.length > 0 ? (
//               orders.map(order => (
//                 <div key={order.id} className="border p-3 mt-2 bg-white rounded shadow text-gray-800">
//                   <p><strong>Product:</strong> {order.product_name}</p>
//                   <p><strong>Buyer:</strong> {order.consumer_name}</p>
//                   <p><strong>Quantity:</strong> {order.quantity}</p>
//                   <p><strong>Total:</strong> ₹{order.total_price}</p>
//                   <label className="block mt-2">
//                     <span className="text-gray-700 font-semibold">Status:</span>
//                     <select
//                       value={order.status}
//                       onChange={(e) => handleStatusChange(order.id, e.target.value)}
//                       className="mt-1 block w-full rounded border-gray-300"
//                     >
//                       {validStatuses.map(status => (
//                         <option key={status} value={status}>{status}</option>
//                       ))}
//                     </select>
//                   </label>
//                 </div>
//               ))
//             ) : (
//               <p className="text-white">No orders yet.</p>
//             )}
//           </div>
//         )}

//         {selectedTab === "chatbot" && <Chatbot />}

//         {selectedTab === "products" && (
//           <div>
//             <h2 className="text-2xl font-bold text-white mb-4">My Products</h2>

//             {/* Add or Edit Form */}
//             <div className="bg-white p-4 rounded shadow mb-6 text-gray-800">
//               <h3 className="font-bold mb-2">{editingProductId ? "Edit Product" : "Add New Product"}</h3>
//               <input
//                 className="border p-2 mr-2"
//                 placeholder="Name"
//                 value={newProduct.name}
//                 onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
//               />
//               <input
//                 className="border p-2 mr-2"
//                 placeholder="Price"
//                 type="number"
//                 value={newProduct.price}
//                 onChange={e => setNewProduct({ ...newProduct, price: e.target.value })}
//               />
//               <input
//                 className="border p-2 mr-2"
//                 placeholder="Stock"
//                 type="number"
//                 value={newProduct.stock}
//                 onChange={e => setNewProduct({ ...newProduct, stock: e.target.value })}
//               />
//               <button
//                 onClick={() =>
//                   editingProductId
//                     ? handleUpdateProduct(editingProductId)
//                     : handleAddProduct()
//                 }
//                 className="bg-green-600 text-white px-4 py-2 rounded"
//               >
//                 {editingProductId ? "Update" : "Add"}
//               </button>
//             </div>

//             {/* Product List */}
//             {products.length > 0 ? (
//               products.map((product) => (
//                 <div key={product.id} className="border p-4 mb-2 bg-white rounded shadow flex items-center text-gray-800">
//                   {/* Product Image */}
//                   <img
//                     src={product.image_url || "/images/default.jpg"}
//                     alt={product.name}
//                     className="w-32 h-32 object-contain rounded mr-4"
//                   />
//                   {/* Product Details */}
//                   <div>
//                     <p><strong>Name:</strong> {product.name}</p>
//                     <p><strong>Price:</strong> ₹{product.price}</p>
//                     <p><strong>Stock:</strong> {product.stock}kg</p>
//                     <div className="mt-2 space-x-2">
//                       <button
//                         onClick={() => {
//                           setEditingProductId(product.id);
//                           setNewProduct({
//                             name: product.name,
//                             price: product.price,
//                             stock: product.stock,
//                           });
//                         }}
//                         className="bg-yellow-500 text-white px-2 py-1 rounded"
//                       >
//                         Edit
//                       </button>
//                       <button
//                         onClick={() => handleDeleteProduct(product.id)}
//                         className="bg-red-500 text-white px-2 py-1 rounded"
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p className="text-center text-white">No products available. Add some products!</p>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default FarmerDashboard;
