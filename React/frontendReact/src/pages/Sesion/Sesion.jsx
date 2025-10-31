import { useState } from "react";
import { Navbar } from "@/componentes/Navbar/Navbar";
import "./Sesion.css";

export function Sesion() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const dominiosPermitidos = ["@duoc.cl", "@profesor.duoc.cl", "@gmail.com"];

    if (!email) return setMensaje(" El correo es requerido.");
    if (!dominiosPermitidos.some((d) => email.endsWith(d)))
      return setMensaje(" El correo debe ser @duoc.cl, @profesor.duoc.cl o @gmail.com.");
    if (!password) return setMensaje(" La contraseña es requerida.");
    if (password.length < 4 || password.length > 10)
      return setMensaje(" La contraseña debe tener entre 4 y 10 caracteres.");

    const usuario = JSON.parse(localStorage.getItem("usuario"));

    if (usuario && usuario.email === email && usuario.password === password) {
      setMensaje(" Inicio de sesión exitoso. ¡Bienvenido de nuevo!");
    } else {
      setMensaje(" Credenciales inválidas.");
    }

    setEmail("");
    setPassword("");
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
