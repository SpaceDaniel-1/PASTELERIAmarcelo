import { useState } from "react";
import { AdminNavbar } from "@/componentes/AdminNavbar/AdminNavbar.jsx";
import { useNavigate } from "react-router-dom";

export function NuevoProducto() {
  const navigate = useNavigate();
  const [producto, setProducto] = useState({ nombre: "", descripcion: "", precio: "", stock: "" });
  const [mensaje, setMensaje] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!producto.nombre || !producto.descripcion || !producto.precio) {
      return setMensaje("Todos los campos son obligatorios.");
    }

    setMensaje("Producto creado (simulado).");
    setTimeout(() => navigate("/admin/productos"), 1500);
  };

  return (
    <>
      <AdminNavbar />
      <div className="container mt-4" style={{ maxWidth: "600px" }}>
        <h3 className="mb-3">Nuevo Producto</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input
              name="nombre"
              className="form-control"
              value={producto.nombre}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Descripción</label>
            <textarea
              name="descripcion"
              className="form-control"
              value={producto.descripcion}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="mb-3">
            <label className="form-label">Precio</label>
            <input
              type="number"
              name="precio"
              className="form-control"
              value={producto.precio}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">Guardar</button>
          {mensaje && <p className="text-center mt-3">{mensaje}</p>}
        </form>
      </div>
    </>
  );
}
