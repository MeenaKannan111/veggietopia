import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const apiUrl = "http://localhost:3000/api";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      alert("Not logged in! Redirecting...");
      navigate("/login");
      return;
    }

    const fetchProducts = async () => {
      try {
        const response = await fetch(`${apiUrl}/admin/dashboard`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [navigate, token]);

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-5">Manage Products</h1>
      {products.length > 0 ? (
        <div className="grid grid-cols-3 gap-4">
          {products.map((product) => (
            <div key={product.id} className="bg-white p-5 rounded-lg shadow-md">
              <h3 className="text-lg font-bold">{product.name}</h3>
              <p>Price: ${product.price}</p>
              <p>Farmer: {product.farmer_name}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No products available.</p>
      )}
    </div>
  );
}

export default AdminProducts;
