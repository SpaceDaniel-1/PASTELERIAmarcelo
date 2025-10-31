import { useEffect, useState } from "react";
import { AdminNavbar } from "@/componentes/AdminNavbar/AdminNavbar.jsx";
import { Link } from "react-router-dom";

export function AdminProductos() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargar = async () => {
      try {
        const res = await fetch("/data/productos.json");
        const data = await res.json();
        setProductos(data.productos || []);
      } catch (err) {
        setError("Error al cargar productos");
      } finally {
        setLoading(false);
      }
    };
    cargar();
  }, []);

  const handleEliminar = (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este producto?")) {
      setProductos(productos.filter((p) => p.id !== id));
      alert("Producto eliminado (solo visual).");
    }
  };

  if (loading) return <p className="text-center mt-5">Cargando productos...</p>;
  if (error) return <p className="text-center text-danger mt-5">{error}</p>;

  return (
    <>
      <AdminNavbar />
      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3>Gestión de Productos</h3>
          <Link to="/admin/nuevo-producto" className="btn btn-success">+ Nuevo Producto</Link>
        </div>

        <table className="table table-striped align-middle">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.nombre}</td>
                <td>${p.precio.toLocaleString("es-CL")}</td>
                <td>
                  <Link to={`/admin/editar/${p.id}`} className="btn btn-warning btn-sm me-2">
                    Editar
                  </Link>
                  <button
                    onClick={() => handleEliminar(p.id)}
                    className="btn btn-danger btn-sm"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
