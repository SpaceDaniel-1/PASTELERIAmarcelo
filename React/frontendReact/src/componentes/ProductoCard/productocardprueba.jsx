export function ProductoCard({ nombre, precio, imagen }) {
  return (
    <div className="col-md-4 col-sm-6 mb-4">
      <div className="card h-100 shadow-sm">
        <img src={imagen} className="card-img-top" alt={nombre} />
        <div className="card-body">
          <h5 className="card-title">{nombre}</h5>
          <p className="card-text">${precio.toLocaleString()}</p>
          <button className="btn btn-outline-primary btn-sm">Agregar al carrito</button>
        </div>
      </div>
    </div>
  );
}
