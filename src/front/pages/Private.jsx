import React, { useEffect, useState } from "react";

const Private = () => {
    const [msg, setMsg] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPrivate = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                setMsg("No autorizado. Inicia sesión.");
                setLoading(false);
                return;
            }

            try {
                const resp = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/private", {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                });

                const data = await resp.json();

                if (resp.ok) {
                    setMsg(data.msg);
                } else {
                    setMsg(data.msg || "Acceso denegado");
                }
            } catch (error) {
                console.error("Error:", error);
                setMsg("Error al cargar contenido privado");
            } finally {
                setLoading(false);
            }
        };

        fetchPrivate();
    }, []);

    return (
        <div className="container mt-5">
            <h2>Zona Privada</h2>
            {loading ? (
                <p>Cargando...</p>
            ) : (
                <div className="alert alert-info mt-3">{msg}</div>
            )}
        </div>
    );
};

export default Private;
