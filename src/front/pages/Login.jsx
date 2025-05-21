import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const resp = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            const data = await resp.json();

            if (resp.ok) {
                localStorage.setItem("token", data.token);
                setMsg("Inicio de sesión exitoso");
                setTimeout(() => navigate("/private"), 1000);
            } else {
                setMsg(data.msg || "Credenciales inválidas");
            }
        } catch (error) {
            console.error("Error:", error);
            setMsg("Error al iniciar sesión");
        }
    };

    return (
        <div className="container mt-5">
            <h2>Iniciar sesión</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        className="form-control"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label>Contraseña</label>
                    <input
                        type="password"
                        name="password"
                        className="form-control"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-success">Ingresar</button>
            </form>
            {msg && <div className="alert alert-info mt-3">{msg}</div>}
        </div>
    );
};

export default Login;
