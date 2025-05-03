<<<<<<< HEAD
import logo from "../assets/logo.png";

function Home() {
  console.log("Home component is rendering"); // Debugging log

=======
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";

// function Home() {
//   return (
//     <div className="min-h-screen bg-gradient-to-b from-green-500 to-blue-600 text-white">
//       {/* Navbar */}
//       <nav className="flex justify-between items-center p-5 bg-opacity-20 bg-white">
//         <h1 className="text-3xl font-bold text-green-900">Veggietopia</h1>
//         <div className="space-x-5">
//           <Link to="/about" className="hover:underline">About Us</Link>
//           <Link to="/login" className="hover:underline">Log In</Link>
//           <Link to="/signup" className="px-4 py-2 bg-green-700 rounded-lg">Sign Up</Link>
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <div className="flex flex-col items-center text-center mt-20 px-5">
//         <motion.h1 
//           className="text-5xl font-extrabold"
//           initial={{ opacity: 0, y: -30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1 }}
//         >
//           Connecting Farmers & Consumers
//         </motion.h1>
//         <p className="text-xl mt-3 max-w-2xl">
//           Veggietopia is a platform where farmers can showcase their fresh produce, 
//           and consumers can buy directly from them with ease.
//         </p>

//         {/* Buttons */}
//         <div className="flex space-x-5 mt-6">
//           <Link to="/signup" className="px-6 py-3 bg-blue-700 rounded-xl text-lg">Join as Consumer</Link>
//           <Link to="/signup" className="px-6 py-3 bg-green-700 rounded-xl text-lg">Join as Farmer</Link>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Home;


import { Link } from "react-router-dom";
import logo from "../assets/logo.png"
function Home() {
  console.log("Home component is rendering"); // Debugging log
   
>>>>>>> 0c2c563e9c323979057143631318859bc55e43c5
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-500 to-blue-600 text-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-5 bg-opacity-20 bg-white">
        <h1 className="text-3xl font-bold text-green-900">Veggietopia</h1>
        <div className="space-x-5">
<<<<<<< HEAD
          <a href="/about" className="hover:underline">About Us</a>
          <a href="/login" className="hover:underline">Log In</a>
          <a href="/signup" className="px-4 py-2 bg-green-700 rounded-lg">Sign Up</a>
=======
          <Link to="/about" className="hover:underline">About Us</Link>
          <Link to="/login" className="hover:underline">Log In</Link>
          <Link to="/signup" className="px-4 py-2 bg-green-700 rounded-lg">Sign Up</Link>
>>>>>>> 0c2c563e9c323979057143631318859bc55e43c5
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-col items-center text-center mt-20 px-5">
<<<<<<< HEAD
        <h1 className="text-6xl font-extrabold">
=======
        <h1
          className="text-6xl font-extrabold"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
>>>>>>> 0c2c563e9c323979057143631318859bc55e43c5
          Welcome to Veggietopia
        </h1>
        <p className="text-xl mt-3 max-w-3xl">
          A platform connecting farmers and consumers directly. Buy fresh, organic produce straight from the source and support local farmers.
        </p>

        {/* Buttons */}
        <div className="flex space-x-5 mt-6">
<<<<<<< HEAD
          <a href="/signup" className="px-6 py-3 bg-blue-700 rounded-xl text-lg hover:bg-blue-800">
            Join as Consumer
          </a>
          <a href="/signup" className="px-6 py-3 bg-green-700 rounded-xl text-lg hover:bg-green-800">
            Join as Farmer
          </a>
=======
          <Link to="/signup" className="px-6 py-3 bg-blue-700 rounded-xl text-lg hover:bg-blue-800">
            Join as Consumer
          </Link>
          <Link to="/signup" className="px-6 py-3 bg-green-700 rounded-xl text-lg hover:bg-green-800">
            Join as Farmer
          </Link>
>>>>>>> 0c2c563e9c323979057143631318859bc55e43c5
        </div>
      </div>

      {/* Large Image Section */}
      <div className="mt-20">
        <img
          src={logo} // Replace with your image URL
          alt="Fresh Products"
          className="w-full h-96 object-cover"
        />
        <div className="text-center mt-10 px-5">
          <h2 className="text-4xl font-bold">Why Choose Veggietopia?</h2>
          <p className="text-lg mt-4 max-w-4xl mx-auto">
            Veggietopia is your one-stop destination for fresh, organic produce directly from local farmers. 
            We aim to bridge the gap between farmers and consumers, ensuring fair prices and quality products. 
            Join us today and be a part of the sustainable food revolution!
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;