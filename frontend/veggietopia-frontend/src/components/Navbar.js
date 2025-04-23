import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav>
            <h1>VeggieTopia</h1>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register-farmer">Register as Farmer</Link></li>
                <li><Link to="/register-consumer">Register as Consumer</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
