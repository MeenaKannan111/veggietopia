import logo from "../assets/logo.png";

const Header = () => {
    return (
        <header style={{ display: "flex", alignItems: "center", padding: "10px" }}>
            <img src={logo} alt="Veggietopia Logo" style={{ height: "50px", marginRight: "10px" }} />
            <h1>Welcome to Veggietopia</h1>
        </header>
    );
};

export default Header;