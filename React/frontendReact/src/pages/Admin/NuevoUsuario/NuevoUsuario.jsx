import { useState } from "react";
import { AdminNavbar } from "@/componentes/AdminNavbar/AdminNavbar.jsx";
import { useNavigate } from "react-router-dom";
import { crearUsuario } from "@/services/usuarioServices";

export function NuevoUsuario() {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState({
    nombre: "",
    username: "",
    correo: "",
    password: "",
    rol: "",
  });

  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario({ ...usuario, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");
    setError("");

    if (!usuario.nombre || !usuario.username || !usuario.correo || !usuario.password || !usuario.rol) {
      return setError("Todos los campos son obligatorios.");
    }

    // Mapear al formato que espera el backend
    const payload = {
      nombre: usuario.nombre,
      username: usuario.username,
      email: usuario.correo,
      password: usuario.password,
      rol: usuario.rol === "Admin" ? "ADMIN" : "CLIENTE",
    };

    try {
      await crearUsuario(payload);
      setMensaje("Usuario creado correctamente.");
      setTimeout(() => navigate("/admin/usuarios"), 1500);
    } catch (err) {
      console.error(err);
      setError("Error al crear usuario en el backend.");
    }
  };

  return (
    <>
      <AdminNavbar />
      <div className="container mt-4" style={{ maxWidth: "600px" }}>
        <h3 className="mb-3">Nuevo Usuario</h3>
        <form onSubmit={handleSubmit}>
          {/* Nombre */}
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input
              name="nombre"
              className="form-control"
              value={usuario.nombre}
              onChange={handleChange}
              placeholder="Ej: Juan Pérez"
            />
          </div>

          {/* Username */}
          <div className="mb-3">
            <label className="form-label">Nombre de usuario</label>
            <input
              name="username"
              className="form-control"
              value={usuario.username}
              onChange={handleChange}
              placeholder="Ej: juanperez07"
            />
          </div>

          {/* Correo */}
          <div className="mb-3">
            <label className="form-label">Correo</label>
            <input
              type="email"
              name="correo"
              className="form-control"
              value={usuario.correo}
              onChange={handleChange}
              placeholder="Ej: juanperez@mail.com"
            />
          </div>

          {/* Contraseña */}
          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={usuario.password}
              onChange={handleChange}
              placeholder="Contraseña inicial"
            />
          </div>

          {/* Rol */}
          <div className="mb-3">
            <label className="form-label">Rol</label>
            <select
              name="rol"
              className="form-select"
              value={usuario.rol}
              onChange={handleChange}
            >
              <option value="">Selecciona un rol</option>
              <option value="Cliente">Cliente</option>
              <option value="Admin">Administrador</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Guardar
          </button>

          {mensaje && <p className="text-center mt-3 text-success">{mensaje}</p>}
          {error && <p className="text-center mt-3 text-danger">{error}</p>}
        </form>
      </div>
    </>
  );
}
