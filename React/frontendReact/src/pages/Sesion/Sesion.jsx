import { useState } from "react";
import { Navbar } from "@/componentes/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import "./Sesion.css";

export function Sesion() {
  const navigate = useNavigate();
  console.log('[Sesion] render');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");

    try {
      const res = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        return setMensaje("❌ Credenciales incorrectas.");
      }

      const data = await res.json();

      // Guardar token + rol
      localStorage.setItem("token", data.token);
      localStorage.setItem("rol", data.rol);
      localStorage.setItem("email", data.email);

      // Redirección según rol
      if (data.rol === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/");
      }

    } catch (error) {
      console.error("Error en login:", error);
      setMensaje("❌ Error de conexión con el servidor.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="sesion-card mt-5">
        <h2>Iniciar Sesión</h2>

        <form onSubmit={handleSubmit}>
          <label>Correo electrónico</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="btn btn-success mt-3 w-100">
            Iniciar sesión
          </button>
        </form>

        {mensaje && <p className="mt-3 text-center">{mensaje}</p>}
      </div>
    </>
  );
}
