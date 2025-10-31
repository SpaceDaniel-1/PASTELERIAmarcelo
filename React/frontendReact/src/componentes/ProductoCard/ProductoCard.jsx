import { useCarrito } from '@/context/CarritoContext';

export function ProductoCard({ producto }) {
  const { agregarProducto } = useCarrito();

  return (
    <div className="card m-2" style={{ width: '18rem' }}>
      <img
        src={producto.imagen}
        className="card-img-top"
        alt={producto.nombre}
      />
      <div className="card-body">
        <h5 className="card-title">{producto.nombre}</h5>
        <p className="card-text">{producto.descripcion}</p>
        <p className="fw-bold">${producto.precio.toLocaleString('es-CL')}</p>
        <button
          className="btn btn-primary"
          onClick={() => agregarProducto(producto)}
        >
          Añadir al carrito
        </button>
      </div>
    </div>
  );
}
