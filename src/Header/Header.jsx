import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <Navbar
            style={{
                backgroundColor: "#007bff", // Primary blue background
                padding: "15px 20px",
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.15)",
            }}
        >
            <Container
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                {/* Title */}
                <Nav>
                    <h2
                        className="ms-2"
                        style={{
                            color: "#ffffff", // White text for contrast
                            fontWeight: "bold",
                            fontSize: "24px",
                            fontFamily: "Arial, sans-serif",
                        }}
                    >
                        RBAC
                    </h2>
                </Nav>

                {/* Navigation Links */}
                <Nav>
                    <Link
                        className="text-decoration-none me-3"
                        to="/"
                        style={{
                            color: "#ffffff", // White text
                            fontWeight: "500",
                            padding: "8px 15px",
                            borderRadius: "5px",
                            transition: "background-color 0.3s ease",
                        }}
                        onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")} // Darker blue on hover
                        onMouseOut={(e) => (e.target.style.backgroundColor = "transparent")}
                    >
                        User Management
                    </Link>
                    <Link
                        className="text-decoration-none me-3"
                        to="/roles"
                        style={{
                            color: "#ffffff", // White text
                            fontWeight: "500",
                            padding: "8px 15px",
                            borderRadius: "5px",
                            transition: "background-color 0.3s ease",
                        }}
                        onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")} // Darker blue on hover
                        onMouseOut={(e) => (e.target.style.backgroundColor = "transparent")}
                    >
                        Role Management
                    </Link>
                    <Link
                        className="text-decoration-none"
                        to="/permissions"
                        style={{
                            color: "#ffffff", // White text
                            fontWeight: "500",
                            padding: "8px 15px",
                            borderRadius: "5px",
                            transition: "background-color 0.3s ease",
                        }}
                        onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")} // Darker blue on hover
                        onMouseOut={(e) => (e.target.style.backgroundColor = "transparent")}
                    >
                        Permissions Management
                    </Link>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default Header;
