import { createContext, useContext, useState, useEffect } from "react";
import { obtenerCarrito, agregarProducto, actualizarCantidad, eliminarItem, vaciarCarritoApi } from "@/services/carritoServices";

// alias the exported API name to the local name used in this context
const vaciarCarrito = vaciarCarritoApi;

const CarritoContext = createContext();
export const useCarrito = () => useContext(CarritoContext);

export function CarritoProvider({ children }) {
  const [carrito, setCarrito] = useState({ items: [], total: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargar = async () => {
      try {
        const data = await obtenerCarrito();
        setCarrito(data);
      } catch (e) {
        console.error("Error cargando carrito:", e);
      } finally {
        setLoading(false);
      }
    };
    cargar();
  }, []);

  const agregar = async (productoId, cantidad = 1) => {
    const userId = localStorage.getItem('idUsuario');
    if (!userId) {
      // UX: ask user to login before adding to cart
      alert('Debes iniciar sesión para agregar productos al carrito.');
      return;
    }
    const data = await agregarProducto(productoId, cantidad);
    setCarrito(data);
  };

  const actualizar = async (itemId, cantidad) => {
    const userId = localStorage.getItem('idUsuario');
    if (!userId) {
      alert('Debes iniciar sesión para modificar el carrito.');
      return;
    }
    const data = await actualizarCantidad(itemId, cantidad);
    setCarrito(data);
  };

  const eliminar = async (itemId) => {
    const userId = localStorage.getItem('idUsuario');
    if (!userId) {
      alert('Debes iniciar sesión para modificar el carrito.');
      return;
    }
    const data = await eliminarItem(itemId);
    setCarrito(data);
  };

  const vaciar = async () => {
    const userId = localStorage.getItem('idUsuario');
    if (!userId) {
      alert('Debes iniciar sesión para modificar el carrito.');
      return;
    }
    const data = await vaciarCarrito();
    setCarrito(data || { items: [], total: 0 });
  };

  return (
    <CarritoContext.Provider
      value={{
        // `carrito` for backwards compatibility is the items array when available
        carrito: carrito?.items ?? (Array.isArray(carrito) ? carrito : []),
        // expose full object and total separately
        carritoObj: carrito,
        total: carrito?.total ?? 0,
        agregar,
        agregarProducto: agregar,
        actualizar,
        eliminar,
        vaciar,
        loading,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
}
