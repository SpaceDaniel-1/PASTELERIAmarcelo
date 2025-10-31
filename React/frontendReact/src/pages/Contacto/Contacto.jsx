import { Navbar } from "../../componentes/Navbar/Navbar";
import { Footer } from "../../componentes/Footer/Footer";
import { useState } from "react";
import "./Contacto.css";

export function Contacto() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [alerta, setAlerta] = useState("");

  const dominiosPermitidos = ["@duoc.cl", "@profesor.duoc.cl", "@gmail.com"];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nombre.trim()) return setAlerta(" El nombre es obligatorio.");
    if (nombre.length > 100) return setAlerta(" El nombre no puede superar los 100 caracteres.");
    if (!email) return setAlerta(" El correo es obligatorio.");
    if (!dominiosPermitidos.some((d) => email.endsWith(d)))
      return setAlerta("Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com.");
    if (!mensaje.trim()) return setAlerta("El mensaje no puede estar vacío.");
    if (mensaje.length > 500) return setAlerta(" El mensaje no puede superar los 500 caracteres.");

    setAlerta("¡Mensaje enviado correctamente!");
    setNombre("");
    setEmail("");
    setMensaje("");
  };

  return (
    <>
      <Navbar />
      <div className="container py-5">
        <h2 className="text-center mb-4">Contáctanos 📩</h2>

        <form
          onSubmit={handleSubmit}
          className="mx-auto p-4 border rounded bg-light"
          style={{ maxWidth: "600px" }}
        >
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input
              type="text"
              className="form-control"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Correo electrónico</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Mensaje</label>
            <textarea
              className="form-control"
              rows="4"
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              required
            ></textarea>
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Enviar Mensaje
          </button>

          {alerta && <p className="text-center mt-3">{alerta}</p>}
        </form>
      </div>
      <Footer />
    </>
  );
}
