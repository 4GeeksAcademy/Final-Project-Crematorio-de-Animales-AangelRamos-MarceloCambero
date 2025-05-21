import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated, logout } from "../utils/auth";

export const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
            <Link to="/" className="me-3">Home</Link>
            {!isAuthenticated() ? (
                <>
                    <Link to="/login" className="me-3">Login</Link>
                    <Link to="/signup">Signup</Link>
                </>
            ) : (
                <>
                    <Link to="/private" className="me-3">Zona Privada</Link>
                    <button onClick={handleLogout} className="btn btn-outline-danger btn-sm">Cerrar sesión</button>
                </>
            )}
        </nav>
    );
};
