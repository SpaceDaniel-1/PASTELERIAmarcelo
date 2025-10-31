import { useEffect, useState } from "react";

export function Productos() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/productos")
      .then((res) => res.json())
      .then((data) => setProductos(data))
      .catch((error) => console.error("Error al cargar productos:", error));
  }, []);

  return (
    <div className="container">
      <h3 className="text-center mb-4">🍰 Nuestros Productos</h3>
      <div className="row">
        {productos.map((prod) => (
          <div className="col-md-4 mb-4" key={prod.id}>
            <div className="card h-100 shadow-sm">
              <img
                src={`/img/${prod.imagen}`}
                alt={prod.nombre}
                className="card-img-top"
              />
              <div className="card-body text-center">
                <h5 className="card-title">{prod.nombre}</h5>
                <p className="card-text">{prod.descripcion}</p>
                <p className="fw-bold">${prod.precio}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
