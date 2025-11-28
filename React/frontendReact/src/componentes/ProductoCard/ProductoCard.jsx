import { useCarrito } from '@/context/CarritoContext';

export function ProductoCard({ producto }) {
  const { agregar } = useCarrito();

  const handleAdd = async () => {
    try {
      await agregar(producto.id, 1);
      alert("Producto añadido al carrito ✔");
    } catch (err) {
      console.error("Error al agregar al carrito:", err);
      alert("❌ Error al agregar el producto");
    }
  };

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
          onClick={handleAdd}
        >
          Añadir al carrito
        </button>
      </div>
    </div>
  );
}
