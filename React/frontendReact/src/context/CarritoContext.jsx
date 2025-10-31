import { createContext, useContext, useState, useEffect } from 'react';

const CarritoContext = createContext();
export const useCarrito = () => useContext(CarritoContext);

export function CarritoProvider({ children }) {
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem('carrito');
    if (data) setCarrito(JSON.parse(data));
  }, []);

  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

  const agregarProducto = (prod) => setCarrito([...carrito, prod]);
  const eliminarProducto = (id) => setCarrito(carrito.filter(p => p.id !== id));
  const vaciarCarrito = () => setCarrito([]);
  const total = carrito.reduce((acc, p) => acc + p.precio, 0);

  return (
    <CarritoContext.Provider value={{ carrito, agregarProducto, eliminarProducto, vaciarCarrito, total }}>
      {children}
    </CarritoContext.Provider>
  );
}
