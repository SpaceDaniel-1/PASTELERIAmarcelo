import { useState } from "react";
import { AdminNavbar } from "@/componentes/AdminNavbar/AdminNavbar.jsx";
import { useNavigate } from "react-router-dom";
import { crearProducto } from "@/services/productoServices";

export function NuevoProducto() {
  const navigate = useNavigate();

  const [producto, setProducto] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    stock: "",
  });

  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");
    setError("");

    if (!producto.nombre || !producto.descripcion || !producto.precio) {
      return setError("Todos los campos son obligatorios.");
    }

    try {
      await crearProducto({
        nombre: producto.nombre,
        descripcion: producto.descripcion,
        precio: Number(producto.precio),
        stock: Number(producto.stock || 0),
      });

      setMensaje("Producto creado correctamente.");
      setTimeout(() => navigate("/admin/productos"), 1000);
    } catch (err) {
      console.error(err);
      setError("Error al crear producto.");
    }
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
            />
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

          <div className="mb-3">
            <label className="form-label">Stock</label>
            <input
              type="number"
              name="stock"
              className="form-control"
              value={producto.stock}
              onChange={handleChange}
            />
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
