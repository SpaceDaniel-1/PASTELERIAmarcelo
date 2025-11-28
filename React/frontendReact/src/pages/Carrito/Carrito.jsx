import { useCarrito } from "@/context/CarritoContext";
import { generarBoleta } from "@/services/boletaServices";
import { Navbar } from "@/componentes/Navbar/Navbar";

export function Carrito() {
  const { carrito, total, eliminar, vaciar, loading } = useCarrito();

  if (loading) return <p>Cargando carrito...</p>;

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
              {carrito.map((item) => (
                <div
                  key={item.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div>
                    <strong>{item.producto.nombre}</strong> — $
                    {item.subtotal.toLocaleString("es-CL")}
                  </div>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => eliminar(item.id)}
                  >
                    Eliminar
                  </button>
                </div>
              ))}
            </div>

            <div className="d-flex justify-content-between align-items-center">
              <h5>Total: ${(total ?? 0).toLocaleString("es-CL")}</h5>

              <div>
                <button
                  className="btn btn-secondary me-2"
                  onClick={vaciar}
                >
                  Vaciar carrito
                </button>

                <button
                  className="btn btn-success"
                  onClick={async () => {
                    try {
                      const boleta = await generarBoleta();
                      await vaciar();            // 👈 Vacía correctamente el carrito
                      alert("Compra realizada!"); // 👌
                      console.log("Boleta generada:", boleta);
                    } catch (error) {
                      console.error("Error generando boleta:", error);
                      alert("Error generando boleta");
                    }
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
