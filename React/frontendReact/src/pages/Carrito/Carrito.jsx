import { useCarrito } from '@/context/CarritoContext';
import { Navbar } from '@/componentes/Navbar/Navbar';
import '@/styles/Carrito.css';

export function Carrito() {
  const { carrito, eliminarProducto, vaciarCarrito, total } = useCarrito();

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h2 className="text-center mb-4">🛒 Tu Carrito</h2>

        {carrito.length === 0 ? (
          <p className="text-center text-muted">El carrito está vacío</p>
        ) : (
          <>
            <div className="list-group mb-3">
              {carrito.map((prod, index) => (
                <div
                  key={index}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div>
                    <strong>{prod.nombre}</strong> — ${prod.precio.toLocaleString('es-CL')}
                  </div>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => eliminarProducto(prod.id)}
                  >
                    Eliminar
                  </button>
                </div>
              ))}
            </div>

            <div className="d-flex justify-content-between align-items-center">
              <h5>Total: ${total.toLocaleString('es-CL')}</h5>
              <div>
                <button
                  className="btn btn-secondary me-2"
                  onClick={vaciarCarrito}
                >
                  Vaciar carrito
                </button>
                <button
                  className="btn btn-success"
                  onClick={() => {
                    alert('¡Compra realizada con éxito!');
                    vaciarCarrito();
                  }}
                >
                  Finalizar compra
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
