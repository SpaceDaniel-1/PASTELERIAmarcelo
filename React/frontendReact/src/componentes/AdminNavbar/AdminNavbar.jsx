import { Link } from "react-router-dom";


export function AdminNavbar() {
  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg px-3">
      <Link className="navbar-brand text-light fw-bold" to="/admin">Admin Panel</Link>

      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <Link className="nav-link text-light" to="/admin/productos">Productos</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-light" to="/admin/usuarios">Usuarios</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
