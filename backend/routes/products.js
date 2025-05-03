// //const db = require("../config/db"); // or wherever you keep your DB connection
// import db  from '../config/db.js'; // ✅ Correct import
// import express from 'express';
// //const express = require("express");
// const router = express.Router();
// //const verifyToken = require("../../middleware/verifyToken");

// // ✅ GET all products by farmer I

// // router.get("/:farmerId", async (req, res) => {
// //   const { farmerId } = req.params;
// //   try {
// //     const [products] = await db.query("SELECT * FROM products WHERE farmer_id = ?", [farmerId]);
// //     res.json(products);
// //   } catch (err) {
// //     console.error("Error fetching products:", err);
// //     res.status(500).json({ error: "Failed to fetch products" });
// //   }
// // });

// // router.get("/", async (req, res) => {
// //   const search = req.query.search || "";
// //   try {
// //     let query = "SELECT products.*, farmers.name AS farmer_name FROM products JOIN farmers ON products.farmer_id = farmers.id";
// //     let params = [];

// //     if (search) {
// //       query += " WHERE products.name LIKE ?";
// //       params.push(`%${search}%`);
// //     }

// //     // Use the promise version if needed (or simply `db.promise().query()`)
// //     const [products] = await db.promise().query(query, params);
// //     console.log(`Fetched products for id `, products);
// //     //     res.json(products);
// //     res.json(products);
// //   } catch (error) {
// //     console.error("Error fetching products for search/view:", error);
// //     res.status(500).json({ error: "Failed to fetch products" });
// //   }
// // });



// router.get("/:productId", async (req, res) => {
//   const { productId } = req.params;
//   try {
//        const [product] = await db.promise().query(
//           `SELECT 
//               products.*, 
//               farmers.name AS farmer_name, 
//               farmers.phone_number AS farmer_contact, 
//               farmers.farm_location 
//            FROM 
//               products 
//            JOIN 
//               farmers 
//            ON 
//               products.farmer_id = farmers.id 
//            WHERE 
//               products.id = ?`,
//           [productId]
//       );

//       if (product.length === 0) {
//           return res.status(404).json({ error: "Product not found" });
//       }

//       res.json(product[0]); // Include image_url in the response
//   } catch (error) {
//       console.error("Error fetching product:", error);
//       res.status(500).json({ error: "Failed to fetch product" });
//   }
// });

// router.get("/:farmerId", async (req, res) => {
//   const farmerId = parseInt(req.params.farmerId, 10); // Make sure it's an integer
//   if (isNaN(farmerId)) {
//     return res.status(400).json({ error: "Invalid farmer ID" });
//   }
//   try {
//     const [products] = await db.promise().query(
//       "SELECT id, name, price, stock, image_url FROM products WHERE farmer_id = ?",
//       [farmerId]
//     );

//     console.log(`Fetched products for farmer ${farmerId}:`, products);
//     res.json(products);
//   } catch (err) {
//     console.error("Error fetching products:", err);
//     res.status(500).json({ error: "Failed to fetch products" });
//   }
// });

// router.get("/recommendations/:userId", async (req, res) => {
//   const { userId } = req.params;

//   try {
//       // Fetch recommendations from the ML model or database
//       const recommendations = await getRecommendationsForUser(userId); // Replace with your logic
//       res.json(recommendations);
//   } catch (error) {
//       console.error("Error fetching recommendations:", error);
//       res.status(500).json({ error: "Failed to fetch recommendations" });
//   }
// });

// // ✅ ADD a new product
// // router.post("/", verifyToken, async (req, res) => {
// //   const { name, price, stock, farmer_id } = req.body;
// //   try {
// //     const [result] = await db.query(
// //       "INSERT INTO products (name, price, stock, farmer_id) VALUES (?, ?, ?, ?)",
// //       [name, price, stock, farmer_id]
// //     );
// //     const [newProduct] = await db.query("SELECT * FROM products WHERE id = ?", [result.insertId]);
// //     res.status(201).json(newProduct[0]);
// //   } catch (err) {
// //     console.error("Error adding product:", err);
// //     res.status(500).json({ error: "Failed to add product" });
// //   }
// // });
// router.get("/", async (req, res) => {
//   console.log("GET /products route hit");
   
//   const search = req.query.search || "";
//   const category = req.query.category || "";
//   const sort = req.query.sort || "";

//   try {
//       let query = "SELECT products.*, farmers.name AS farmer_name FROM products JOIN farmers ON products.farmer_id = farmers.id";
//       let params = [];

//       if (search) {
//           query += " WHERE products.name LIKE ?";
//           params.push(`%${search}%`);
//       }

//       if (category) {
//           query += search ? " AND" : " WHERE";
//           query += " products.category = ?";
//           params.push(category);
//       }

//       if (sort === "price_asc") {
//           query += " ORDER BY products.price ASC";
//       } else if (sort === "price_desc") {
//           query += " ORDER BY products.price DESC";
//       } else if (sort === "rating_desc") {
//           query += " ORDER BY products.rating DESC";
//       }

//       const [products] = await db.promise().query(query, params);
//       console.log("Fetched products:", products); // Debugging log
//       res.json(products);

//   } catch (error) {
//       console.error("Error fetching products:", error);
//       res.status(500).json({ error: "Failed to fetch products" });
//   }
// });

// router.post("/", async (req, res) => {
//     try {
//       const { name, price, stock, farmer_id } = req.body;
//       console.log("Received POST:", req.body);
      
//       if (!farmer_id) {
//         return res.status(400).json({ error: "Farmer ID is required" });
//       }

//       const result = await db.promise().query(
//         "INSERT INTO products (name, price, quantity, farmer_id) VALUES (?, ?, ?, ?)",
//         [name, price, stock, farmer_id]
//       );
  
//       res.json({ id: result[0].insertId, name, price, stock, farmer_id });
//     } catch (error) {
//       console.error("Add product error:", error);
//       res.status(500).json({ error: "Failed to add product" });
//     }
//   });
// // ✅ UPDATE a product
// router.put("/:productId", async (req, res) => {
//   const { productId } = req.params;
//   const { name, price, quantity } = req.body;

//   console.log("Request Body:", req.body);
//   console.log("Product ID:", req.params.productId);

//   const sql = "UPDATE products SET name = ?, price = ?, quantity = ? WHERE id = ?";

//   try {
//     // Perform the update
//     const [result] = await db.promise().query(sql, [name, price, quantity, productId]);

//     if (result.affectedRows === 0) {
//       return res.status(404).json({ error: "Product not found" });
//     }

//     // Fetch the updated product
//     const [updatedProduct] = await db.promise().query("SELECT * FROM products WHERE id = ?", [productId]);

//     res.status(200).json(updatedProduct[0]); // Return the updated product
//   } catch (err) {
//     console.error("Error updating product:", err);
//     res.status(500).json({ error: "Failed to update product" });
//   }
// });
// // ✅ DELETE a product
// router.delete("/:productId", async (req, res) => {
//   const { productId } = req.params;
//   try {
//     await db.promise().query("DELETE FROM products WHERE id = ?", [productId]);
//     res.json({ message: "Product deleted" });
//   } catch (err) {

//     console.error("Error deleting product:", err);
//     res.status(500).json({ error: "Failed to delete product" });
//   }
// });

// // ✅ View all products (for consumers/search) with optional search query
// // router.get("/", async (req, res) => {
// //   const search = req.query.search || "";

// //   try {
// //     let query = "SELECT * FROM products";
// //     let params = [];

// //     if (search) {
// //       query += " WHERE name LIKE ?";
// //       params.push(`%${search}%`);
// //     }

// //     const [products] = await db.query(query, params);
// //     res.json(products);
// //   } catch (error) {
// //     console.error("Error fetching products for search/view:", error);
// //     res.status(500).json({ error: "Failed to fetch products" });
// //   }
// // });


// // module.exports = router;
// // In backend/routes/products.js

// // View all products (for consumers/search) with optional search query


// export default router;


import db from '../config/db.js';
import express from 'express';
const router = express.Router();

// GET single product details
router.get("/product/:productId", async (req, res) => {
  const { productId } = req.params;
  try {
       const [product] = await db.promise().query(
          `SELECT 
              products.*, 
              farmers.name AS farmer_name, 
              farmers.phone_number AS farmer_contact, 
              farmers.farm_location 
           FROM products 
           JOIN farmers ON products.farmer_id = farmers.id 
           WHERE products.id = ?`,
          [productId]
      );
      if (product.length === 0) {
          return res.status(404).json({ error: "Product not found" });
      }
      res.json(product[0]);
  } catch (error) {
      console.error("Error fetching product:", error);
      res.status(500).json({ error: "Failed to fetch product" });
  }
});

// GET products by farmer id
router.get("/farmer-products/:farmerId", async (req, res) => {
  const farmerId = parseInt(req.params.farmerId, 10);
  if (isNaN(farmerId)) {
    return res.status(400).json({ error: "Invalid farmer ID" });
  }
  try {
    const [products] = await db.promise().query(
      "SELECT id, name, price, stock, image_url FROM products WHERE farmer_id = ?",
      [farmerId]
    );
    console.log(`Fetched products for farmer ${farmerId}:`, products);
    res.json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// GET recommendations for user
router.get("/recommendations/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
      // Replace with your actual recommendation logic
      const recommendations = await getRecommendationsForUser(userId);
      res.json(recommendations);
  } catch (error) {
      console.error("Error fetching recommendations:", error);
      res.status(500).json({ error: "Failed to fetch recommendations" });
  }
});

// GET all products with optional search query
router.get("/", async (req, res) => {
  console.log("GET /products route hit");
   
  const search = req.query.search || "";
  const category = req.query.category || "";
  const sort = req.query.sort || "";

  try {
      let query = "SELECT products.*, farmers.name AS farmer_name FROM products JOIN farmers ON products.farmer_id = farmers.id";
      let params = [];

      if (search) {
          query += " WHERE products.name LIKE ?";
          params.push(`%${search}%`);
      }

      if (category) {
          query += search ? " AND" : " WHERE";
          query += " products.category = ?";
          params.push(category);
      }

      if (sort === "price_asc") {
          query += " ORDER BY products.price ASC";
      } else if (sort === "price_desc") {
          query += " ORDER BY products.price DESC";
      } else if (sort === "rating_desc") {
          query += " ORDER BY products.rating DESC";
      }

      const [products] = await db.promise().query(query, params);
      console.log("Fetched products:", products);
      res.json(products);
  } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ error: "Failed to fetch products" });
  }
});

// ADD a new product
router.post("/", async (req, res) => {
    try {
      const { name, price, stock, farmer_id } = req.body;
      console.log("Received POST:", req.body);
      
      if (!farmer_id) {
        return res.status(400).json({ error: "Farmer ID is required" });
      }

      const result = await db.promise().query(
        "INSERT INTO products (name, price, quantity, farmer_id) VALUES (?, ?, ?, ?)",
        [name, price, stock, farmer_id]
      );
  
      res.json({ id: result[0].insertId, name, price, stock, farmer_id });
    } catch (error) {
      console.error("Add product error:", error);
      res.status(500).json({ error: "Failed to add product" });
    }
});

// UPDATE a product
router.put("/:productId", async (req, res) => {
  const { productId } = req.params;
  const { name, price, quantity } = req.body;

  console.log("Request Body:", req.body);
  console.log("Product ID:", req.params.productId);

  const sql = "UPDATE products SET name = ?, price = ?, quantity = ? WHERE id = ?";

  try {
    const [result] = await db.promise().query(sql, [name, price, quantity, productId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    const [updatedProduct] = await db.promise().query("SELECT * FROM products WHERE id = ?", [productId]);
    res.status(200).json(updatedProduct[0]);
  } catch (err) {
    console.error("Error updating product:", err);
    res.status(500).json({ error: "Failed to update product" });
  }
});

// DELETE a product
router.delete("/:productId", async (req, res) => {
  const { productId } = req.params;
  try {
    await db.promise().query("DELETE FROM products WHERE id = ?", [productId]);
    res.json({ message: "Product deleted" });
  } catch (err) {
    console.error("Error deleting product:", err);
    res.status(500).json({ error: "Failed to delete product" });
  }
});

export default router;