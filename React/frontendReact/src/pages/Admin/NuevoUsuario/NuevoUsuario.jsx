import { useState } from "react";
import { AdminNavbar } from "@/componentes/AdminNavbar/AdminNavbar";
import { useNavigate } from "react-router-dom";

export function NuevoUsuario() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState({
    nombre: "",
    correo: "",
    rol: "",
  });
  const [mensaje, setMensaje] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario({ ...usuario, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!usuario.nombre || !usuario.correo || !usuario.rol) {
      return setMensaje("Todos los campos son obligatorios.");
    }

    setMensaje("Usuario creado (simulado).");
    setTimeout(() => navigate("/admin/usuarios"), 1500);
  };

  return (
    <>
      <AdminNavbar />
      <div className="container mt-4" style={{ maxWidth: "600px" }}>
        <h3 className="mb-3">Nuevo Usuario</h3>
        <form onSubmit={handleSubmit}>
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
          {mensaje && <p className="text-center mt-3">{mensaje}</p>}
        </form>
      </div>
    </>
  );
}
