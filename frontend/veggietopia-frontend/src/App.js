// import React from "react";
//  import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
//  import Login from "./pages/Login";
//  import Signup from "./pages/Signup";
//  import ProductDetails from "./pages/ProductDetails";
//  import Home from "./pages/Home";
//  import ConsumerDashboard from "./pages/ConsumerDashboard";
//  import FarmerDashboard from "./pages/FarmerDashboard";
//  //import AdminDashboard from "./pages/AdminDashboard";
//  import AdminDashboardLayout from "./pages/AdminDashboardLayout";
// import AdminDashboardOverview from "./pages/AdminDashboardOverview"; // Your overview page component
// import AdminFarmers from "./pages/AdminFarmers"; // Manage Farmers Page
// import AdminConsumers from "./pages/AdminConsumers"; // Manage Consumers Page
// import AdminOrders from "./pages/AdminOrders";       // Manage Orders Page
// import AdminProducts from "./pages/AdminProducts";      // Chatbot Page
// import AdminFeedback from "./pages/AdminFeedback";     // Feedback view page

//  import Header from "./components/Header";
//  import "./App.css";
 
//  function App() {
//      return (
//          <Router>
//              <div className="app-container">
//              <Header />
//                  <nav className="navbar bg-green-600 text-white p-4 flex justify-between items-center">
//                      <h1 className="text-2xl font-bold">Veggietopia</h1>
//                      <div className="space-x-4">
//                          <Link to="/" className="hover:underline">Home</Link>
//                          <Link to="/login" className="hover:underline">Login</Link>
//                          <Link to="/signup" className="hover:underline">Sign Up</Link>
//                      </div>
//                  </nav>
//                  <Routes>
//                      <Route path="/" element={<Home />} />
//                      <Route path="/login" element={<Login />} />
//                      <Route path="/signup" element={<Signup />} />
//                      <Route path="/consumer-dashboard" element={<ConsumerDashboard />} />
//                      <Route path="/product/:productId" element={<ProductDetails />} />
//                      <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
//                      <Route path="/admin" element={<AdminDashboardLayout />}>
//                     <Route path="dashboard" element={<AdminDashboardOverview />} />
//                     <Route path="farmers" element={<AdminFarmers />} />
//                     <Route path="consumers" element={<AdminConsumers />} />
//                     <Route path="orders" element={<AdminOrders />} />
//                     <Route path="products" element={<AdminProducts />} />
//                     <Route path="feedback" element={<AdminFeedback />} />
//                     </Route>
//                  </Routes>
//              </div>
//          </Router>
//      );
//  }
 
//  export default App;

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProductDetails from "./pages/ProductDetails";
import Home from "./pages/Home";
import ConsumerDashboard from "./pages/ConsumerDashboard";
import FarmerDashboard from "./pages/FarmerDashboard";
import AdminDashboardLayout from "./pages/AdminDashboardLayout";
import AdminDashboardOverview from "./pages/AdminDashboardOverview";
import AdminFarmers from "./pages/AdminFarmers";
import AdminConsumers from "./pages/AdminConsumers";
import AdminOrders from "./pages/AdminOrders";
import AdminProducts from "./pages/AdminProducts";
import AdminFeedback from "./pages/AdminFeedback";
import AdminChatbot from "./pages/AdminChatbot";
import Header from "./components/Header";
import "./App.css";
import Recommendations from './components/Recommendations';


function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
        <Route path="/products/:productId" element={<ProductDetails />} />
        <Route path="/consumer-dashboard" element={<ConsumerDashboard />} />
        <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
        
        {/* Redirect absolute /admin-dashboard to /admin/dashboard */}
        <Route path="/admin-dashboard" element={<Navigate to="/admin/dashboard" replace />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboardLayout />}>  
          <Route index element={<AdminDashboardOverview />} />
          <Route path="dashboard" element={<AdminDashboardOverview />} />
          <Route path="farmers" element={<AdminFarmers />} />
          <Route path="consumers" element={<AdminConsumers />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="feedback" element={<AdminFeedback />} />
          <Route path="chatbot" element={<AdminChatbot />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;