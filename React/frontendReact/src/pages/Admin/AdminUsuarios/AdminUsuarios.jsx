import { useEffect, useState } from "react";
import { AdminNavbar } from "@/componentes/AdminNavbar/AdminNavbar";
import { Link } from "react-router-dom";

export function AdminUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargar = async () => {
      try {
        const res = await fetch("/data/usuarios.json");
        const data = await res.json();
        setUsuarios(data.usuarios || []);
      } catch (err) {
        console.error("Error al cargar usuarios:", err);
        setError("Error al cargar usuarios");
      } finally {
        setLoading(false);
      }
    };
    cargar();
  }, []);

  if (loading) return <p className="text-center mt-5">Cargando usuarios...</p>;
  if (error) return <p className="text-center text-danger mt-5">{error}</p>;

  return (
    <>
      <AdminNavbar />
      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3>Gestión de Usuarios</h3>
          <Link to="/admin/nuevo-usuario" className="btn btn-success">+ Nuevo Usuario</Link>
        </div>

        <table className="table table-striped align-middle">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Rol</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.nombre}</td>
                <td>{u.correo}</td>
                <td>{u.rol}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
