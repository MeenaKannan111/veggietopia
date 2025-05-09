
// import incrementInteraction from "../utils/incrementInteraction";
// import authFetch from "../utils/apiClient";
// // // import { useState, useEffect } from "react";
// // // import { useParams } from "react-router-dom";

// // // const apiUrl = "http://localhost:3000/api";

// // // function ProductDetails() {
// // //     const { productId } = useParams(); // Get the product ID from the URL
// // //     const [product, setProduct] = useState(null);
// // //     const [error, setError] = useState(null);

// // //     const token = localStorage.getItem("token");
// // //     const [products, setProducts] = useState([]);
// // //     const [search, setSearch] = useState("");
// // //     const [categoryFilter, setCategoryFilter] = useState("");
// // //     const [sortOption, setSortOption] = useState("");
// // // const apiUrl = "http://localhost:3000/api";

// // //     useEffect(() => {
// // //         const fetchProductDetails = async () => {
// // //             try {
// // //                 const response = await fetch(`${apiUrl}/products/${productId}`, {
// // //                     method: "GET",
// // //                     headers: { Authorization: `Bearer ${token}` },
// // //                 });
// // //                 if (!response.ok) {
// // //                     throw new Error("Failed to fetch product details");
// // //                 }
// // //                 const data = await response.json();
// // //                 console.log("Fetched product details:", data); // Debugging log
// // //               setProduct(data);
// // //             } catch (error) {
// // //                 console.error("Error loading product details:", error);
// // //                 setError("Failed to load product details. Please try again later.");
// // //             }
// // //         };

// // //         fetchProductDetails();
// // //     }, [search, categoryFilter, sortOption, token]);

// // //     const handleAddToCart = () => {
// // //         alert(`Added ${product.name} to cart`);
// // //     };

// // //     const handleBuyNow = () => {
// // //         alert(`Order placed for ${product.name}. Cash on Delivery.`);
// // //     };
// // //     if (error) {
// // //         return <p className="text-red-500">{error}</p>;
// // //     }

// // //     if (!product) {
// // //         return <p>Loading product details...</p>;
// // //     }

// // //     return (
// // //         <div>
// // //             <div className="filters">
// // //                 <input
// // //                     type="text"
// // //                     placeholder="Search products..."
// // //                     value={search}
// // //                     onChange={(e) => setSearch(e.target.value)}
// // //                     className="border p-2 rounded"
// // //                 />
// // //                 <select
// // //                     value={categoryFilter}
// // //                     onChange={(e) => setCategoryFilter(e.target.value)}
// // //                     className="border p-2 rounded"
// // //                 >
// // //                     <option value="">All Categories</option>
// // //                     <option value="Fruits">Fruits</option>
// // //                     <option value="Vegetables">Vegetables</option>
// // //                 </select>
// // //                 <select
// // //                     value={sortOption}
// // //                     onChange={(e) => setSortOption(e.target.value)}
// // //                     className="border p-2 rounded"
// // //                 >
// // //                     <option value="">Sort By</option>
// // //                     <option value="price_asc">Price: Low to High</option>
// // //                     <option value="price_desc">Price: High to Low</option>
// // //                     <option value="rating_desc">Rating: High to Low</option>
// // //                 </select>
// // //             </div>

// // //             {error && <p className="text-red-500">{error}</p>}

// // //             <div className="product-grid">
// // //                 {products.map((product) => (
// // //                     <div key={product.id} className="product-card">
// // //                         <img
// // //                         src={product.image_url || "default-image.jpg"} // Use default image if image_url is missing
// // //                         alt={product.name}
// // //                         className="w-full h-40 object-cover rounded-md mb-4"
// // //                     />
// // //                         <h3>{product.name}</h3>
// // //                         <p>Price: ₹{product.price}</p>
// // //                         <p>Category: {product.category}</p>
// // //                     </div>
// // //                 ))}
// // //             </div>
// // //         </div>
// // //     );
// // // }

// // export default ProductDetails;

// // import { useState, useEffect } from "react";
// // import { useParams } from "react-router-dom";

// // const apiUrl = "http://localhost:3000/api";

// // function ProductDetails() {
// //     const { productId } = useParams(); // Get the product ID from the URL
// //     const [product, setProduct] = useState(null);
// //     const [error, setError] = useState(null);

// //     const token = localStorage.getItem("token");

// //     useEffect(() => {
// //         const fetchProductDetails = async () => {
// //             try {
// //                 const response = await fetch(`${apiUrl}/products/${productId}`, {
// //                     method: "GET",
// //                     headers: { Authorization: `Bearer ${token}` },
// //                 });
// //                 if (!response.ok) {
// //                     throw new Error("Failed to fetch product details");
// //                 }
// //                 const data = await response.json();
// //                 console.log("Fetched product details:", data); // Debugging log
// //                 setProduct(data);
// //             } catch (error) {
// //                 console.error("Error loading product details:", error);
// //                 setError("Failed to load product details. Please try again later.");
// //             }
// //         };

// //         fetchProductDetails();
// //     }, [productId, token]);

// //     const handleAddToCart = () => {
// //         alert(`Added ${product.name} to cart`);
// //     };

// //     const handleBuyNow = () => {
// //         alert(`Order placed for ${product.name}. Cash on Delivery.`);
// //     };

// //     if (error) {
// //         return <p className="text-red-500">{error}</p>;
// //     }

// //     if (!product) {
// //         return <p>Loading product details...</p>;
// //     }

// //     return (
// //         <div className="min-h-screen bg-gray-100 p-5">
// //             <div className="bg-white p-6 rounded-lg shadow-lg">
// //                 <img
// //                     src={product.image_url || "default-image.jpg"} // Use default image if image_url is missing
// //                     alt={product.name}
// //                     className="w-full h-60 object-cover rounded-md mb-4"
// //                 />
// //                 <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
// //                 <p className="text-gray-700 mb-2"><strong>Price:</strong> ₹{product.price}</p>
// //                 <p className="text-gray-700 mb-2"><strong>Category:</strong> {product.category}</p>
// //                 <p className="text-gray-700 mb-2"><strong>Description:</strong> {product.description || "No description available"}</p>
// //                 <div className="flex space-x-4 mt-4">
// //                     <button
// //                         className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors duration-300"
// //                         onClick={handleAddToCart}
// //                     >
// //                         Add to Cart
// //                     </button>
// //                     <button
// //                         className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-300"
// //                         onClick={handleBuyNow}
// //                     >
// //                         Buy Now
// //                     </button>
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // }

// // export default ProductDetails;
// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";

// const apiUrl = "http://localhost:3000/api";

// function ProductDetails() {
//     const { productId } = useParams(); // Get the product ID from the URL
//     const [product, setProduct] = useState(null);
//     const [error, setError] = useState(null);

//     const token = localStorage.getItem("token");
//     const userId = localStorage.getItem("userId");

//     useEffect(() => {
//         const fetchProductDetails = async () => {
//             try {
//                 const response = await fetch(`${apiUrl}/products/${productId}`, {
//                     method: "GET",
//                     headers: { Authorization: `Bearer ${token}` },
//                 });
//                 if (!response.ok) {
//                     throw new Error("Failed to fetch product details");
//                 }
//                 const data = await response.json();
//                 console.log("Fetched product details:", data); // Debugging log
//                 setProduct(data);
//                 // Record user-product interaction on product view
//                 if (userId) {
//                     await incrementInteraction(userId, productId);
//                 }
//             } catch (error) {
//                 console.error("Error loading product details:", error);
//                 setError("Failed to load product details. Please try again later.");
//             }
//         };

//         fetchProductDetails();

//     }, [productId, token, userId]);

//     const handleAddToCart = async () => {
//         try {
//             const response = await fetch(`${apiUrl}/cart`, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                     Authorization: `Bearer ${token}`,
//                 },
//                 body: JSON.stringify({ productId: productId, quantity: 1 }),
//             });
//             if (response.ok) {
//                 alert(`Added ${product.name} to cart`);
//             } else {
//                 const errorData = await response.json();
//                 alert(`Failed to add to cart: ${errorData.error || response.statusText}`);
//             }
//         } catch (error) {
//             console.error("Error adding to cart:", error);
//             alert("Error adding to cart. Please try again later.");
//         }
//     };

// const handleBuyNow = async () => {
//         const quantityStr = prompt("Enter the quantity in kgs:");
//         const quantity = parseInt(quantityStr, 10);
//         if (isNaN(quantity) || quantity <= 0) {
//             alert("Invalid quantity entered.");
//             return;
//         }
//         const totalAmount = quantity * product.price;
//         try {
//             const response = await authFetch(`/orders`, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({
//                     product_id: productId,
//                     quantity: quantity,
//                 }),
//             });
//             if (!response.ok) {
//                 const errorData = await response.json();
//                 alert(`Failed to place order: ${errorData.error || response.statusText}`);
//                 return;
//             }
//             alert(`Order placed successfully for ${quantity} kgs of ${product.name}. Total amount: ₹${totalAmount}. Cash on Delivery.`);
//         } catch (error) {
//             console.log("Error placing order:", error);
//             alert("Failed to order. Please try again later.");
//         }
//     };
    
//     }, [productId, token]);

//     const handleAddToCart = () => {
//         alert(`Added ${product.name} to cart`);
//     };

//     const handleBuyNow = () => {
//         alert(`Order placed for ${product.name}. Cash on Delivery.`);
//     };

//     if (error) {
//         return <p className="text-red-500">{error}</p>;
//     }

//     if (!product) {
//         return <p>Loading product details...</p>;
//     }

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-blue-500 to-green-500 p-5">
//         {/* Parent Container */}
//         <div className="bg-white p-6 rounded-lg shadow-lg max-w-6xl mx-auto flex flex-col md:flex-row">
//             {/* Left Column: Product Images */}
//             <div className="md:w-1/2 flex flex-col items-center">
//                 {/* Main Image */}
//                 <img
//                     src={product.image_url || "default-image.jpg"}
//                     alt={product.name}
//                     className="w-full h-96 object-contain rounded-md mb-4"
//                 />
//                 {/* Thumbnails */}
//                 <div className="flex space-x-2 mt-4">
//                     <img
//                         src={product.image_url || "default-image.jpg"}
//                         alt="Thumbnail"
//                         className="w-20 h-20 object-cover rounded-md border border-gray-300 cursor-pointer hover:border-blue-500"
//                     />
//                     <img
//                         src={product.image_url || "default-image.jpg"}
//                         alt="Thumbnail"
//                         className="w-20 h-20 object-cover rounded-md border border-gray-300 cursor-pointer hover:border-blue-500"
//                     />
//                 </div>
//             </div>

//             {/* Right Column: Product Details */}
//             <div className="md:w-1/2 md:pl-8 flex flex-col">
//                 {/* Product Name */}
//                 <h1 className="text-4xl font-bold mb-4">{product.name}</h1>

//                 {/* Price */}
//                 <p className="text-3xl font-semibold text-green-600 mb-4">₹{product.price}</p>

//                 {/* Offers */}
//                 <div className="bg-green-100 text-green-800 p-3 rounded-md mb-4">
//                     <p className="font-semibold">Special Offer: Get 10% off on orders above ₹500!</p>
//                 </div>

//                 {/* Product Details */}
//                 <p className="text-lg text-gray-700 mb-2"><strong>Farmer:</strong> {product.farmer_name}</p>
//                 <p className="text-lg text-gray-700 mb-2"><strong>Contact:</strong> {product.farmer_contact || "N/A"}</p>
//                 <p className="text-lg text-gray-700 mb-2"><strong>Farm Location:</strong> {product.farm_location || "Not Available"}</p>
//                 <p className="text-lg text-gray-700 mb-4"><strong>Description:</strong> {product.description || "No description available"}</p>

//                 {/* Action Buttons */}
//                 <div className="flex space-x-4 mt-6">
//                     <button
//                         className="bg-green-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors duration-300"
//                         onClick={handleAddToCart}
//                     >
//                         Add to Cart
//                     </button>
//                     <button
//                         className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
//                         onClick={handleBuyNow}
//                     >
//                         Buy Now
//                     </button>
//                 </div>
//             </div>
//         </div>
//     </div>
// );
// }

// export default ProductDetails;


import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import incrementInteraction from "../utils/incrementInteraction";

const apiUrl = "http://localhost:3000/api";

function ProductDetails() {
  const { productId } = useParams(); // Get product ID from URL
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`${apiUrl}/products/${productId}`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch product details");
        }
        const data = await response.json();
        console.log("Fetched product details:", data);
        setProduct(data);
        // Record interaction if user is logged in
        if (userId) {
          await incrementInteraction(userId, productId);
        }
      } catch (error) {
        console.error("Error loading product details:", error);
        setError("Failed to load product details. Please try again later.");
      }
    };

    fetchProductDetails();
  }, [productId, token, userId]);

  const handleAddToCart = async () => {
    try {
      const response = await fetch(`${apiUrl}/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, quantity: 1 }),
      });
      if (response.ok) {
        alert(`Added ${product.name} to cart`);
      } else {
        const errorData = await response.json();
        alert(`Failed to add to cart: ${errorData.error || response.statusText}`);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Error adding to cart. Please try again later.");
    }
  };

  const handleBuyNow = async () => {
    const quantityStr = prompt("Enter the quantity in kgs:");
    const quantity = parseInt(quantityStr, 10);
    if (isNaN(quantity) || quantity <= 0) {
      alert("Invalid quantity entered.");
      return;
    }
    const totalAmount = quantity * product.price;
    try {
      const response = await fetch(`${apiUrl}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          product_id: productId,
          quantity: quantity,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        alert(`Failed to place order: ${errorData.error || response.statusText}`);
        return;
      }
      alert(
        `Order placed successfully for ${quantity} kgs of ${product.name}. Total amount: ₹${totalAmount}. Cash on Delivery.`
      );
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to order. Please try again later.");
    }
  };

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!product) {
    return <p>Loading product details...</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-green-500 p-5">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-6xl mx-auto flex flex-col md:flex-row">
        {/* Left Column: Product Images */}
        <div className="md:w-1/2 flex flex-col items-center">
          <img
            src={product.image_url || "default-image.jpg"}
            alt={product.name}
            className="w-full h-96 object-contain rounded-md mb-4"
          />
          <div className="flex space-x-2 mt-4">
            <img
              src={product.image_url || "default-image.jpg"}
              alt="Thumbnail"
              className="w-20 h-20 object-cover rounded-md border border-gray-300 cursor-pointer hover:border-blue-500"
            />
            <img
              src={product.image_url || "default-image.jpg"}
              alt="Thumbnail"
              className="w-20 h-20 object-cover rounded-md border border-gray-300 cursor-pointer hover:border-blue-500"
            />
          </div>
        </div>

        {/* Right Column: Product Details */}
        <div className="md:w-1/2 md:pl-8 flex flex-col">
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          <p className="text-3xl font-semibold text-green-600 mb-4">₹{product.price}</p>
          <div className="bg-green-100 text-green-800 p-3 rounded-md mb-4">
            <p className="font-semibold">Special Offer: Get 10% off on orders above ₹500!</p>
          </div>
          <p className="text-lg text-gray-700 mb-2"><strong>Farmer:</strong> {product.farmer_name}</p>
          <p className="text-lg text-gray-700 mb-2"><strong>Contact:</strong> {product.farmer_contact || "N/A"}</p>
          <p className="text-lg text-gray-700 mb-2"><strong>Farm Location:</strong> {product.farm_location || "Not Available"}</p>
          <p className="text-lg text-gray-700 mb-4"><strong>Description:</strong> {product.description || "No description available"}</p>
          <div className="flex space-x-4 mt-6">
            <button
              onClick={handleAddToCart}
              className="bg-green-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition"
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;