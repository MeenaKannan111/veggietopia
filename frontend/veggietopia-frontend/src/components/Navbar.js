import { Link } from "react-router-dom";

const Navbar = () => {
<<<<<<< HEAD
    // For simplicity, show admin link always; in real app, conditionally show based on user role
=======
>>>>>>> 0c2c563e9c323979057143631318859bc55e43c5
    return (
        <nav>
            <h1>VeggieTopia</h1>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register-farmer">Register as Farmer</Link></li>
                <li><Link to="/register-consumer">Register as Consumer</Link></li>
<<<<<<< HEAD
                <li><Link to="/admin-dashboard">Admin Dashboard</Link></li>
=======
>>>>>>> 0c2c563e9c323979057143631318859bc55e43c5
            </ul>
        </nav>
    );
};

export default Navbar;
