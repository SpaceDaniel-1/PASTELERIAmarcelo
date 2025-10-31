import { AdminNavbar } from "@/componentes/AdminNavbar/AdminNavbar.jsx";
import "./Admin.css";

export function AdminHome() {
  return (
    <>
      <AdminNavbar />
      <div className="container text-center mt-5">
        <h2>Bienvenido, Administrador </h2>
        <p className="text-muted">
          Desde aquí puedes gestionar los productos y usuarios de Marcelo Pastelería.
        </p>
        <div className="d-flex justify-content-center gap-3 mt-4">
          <a href="/admin/productos" className="btn btn-primary">Gestionar Productos</a>
          <a href="/admin/usuarios" className="btn btn-secondary"> Gestionar Usuarios</a>
        </div>
      </div>
    </>
  );
}
