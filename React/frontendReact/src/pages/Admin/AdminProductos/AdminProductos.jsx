import { useEffect, useState } from "react";
import { AdminNavbar } from "@/componentes/AdminNavbar/AdminNavbar.jsx";
import { Link } from "react-router-dom";
import { getProductos, eliminarProducto } from "@/services/productoServices";

export function AdminProductos() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cargarDatos = async () => {
    try {
      const data = await getProductos();
      setProductos(data);
    } catch (err) {
      console.error(err);
      setError("Error al cargar productos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const handleEliminar = async (id) => {
    if (!window.confirm("¿Eliminar este producto?")) return;

    try {
      await eliminarProducto(id);
      alert("Producto eliminado con éxito");
      cargarDatos();
    } catch (err) {
      alert("Error al eliminar producto");
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
          <Link to="/admin/nuevo-producto" className="btn btn-success">
            + Nuevo Producto
          </Link>
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
