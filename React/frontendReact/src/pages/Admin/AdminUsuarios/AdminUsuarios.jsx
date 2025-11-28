import { useEffect, useState } from "react";
import { AdminNavbar } from "@/componentes/AdminNavbar/AdminNavbar.jsx";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { getUsuarios } from "@/services/usuarioServices";

export function AdminUsuarios() {
  const { token } = useAuth();
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargar = async () => {
      try {
        if (!token) {
          setError("No autorizado. Inicia sesión en el sistema.");
          return;
        }

        const data = await getUsuarios(token);
        setUsuarios(data);
      } catch (err) {
        setError("Error al cargar usuarios del backend");
      } finally {
        setLoading(false);
      }
    };
    cargar();
  }, [token]);

  if (loading) return <p className="text-center mt-5">Cargando usuarios...</p>;
  if (error) return <p className="text-center text-danger mt-5">{error}</p>;

  return (
    <>
      <AdminNavbar />
      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3>Gestión de Usuarios</h3>
          <Link to="/admin/nuevo-usuario" className="btn btn-success">
            + Nuevo Usuario
          </Link>
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
                <td>{u.email}</td>
                <td>{u.rol}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
