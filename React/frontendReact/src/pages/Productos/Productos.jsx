import { useEffect, useState } from 'react';
import { getProductos } from '@/services/productoServices';
import { ProductoCard } from '@/componentes/ProductoCard/ProductoCard';
import { Navbar } from '@/componentes/Navbar/Navbar'; // 🔹 Agregamos el Navbar
import './Productos.css';

export function Productos() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const data = await getProductos();
        setProductos(data);
      } catch (err) {
        console.error('Error al cargar productos:', err);
        setError('No se pudieron cargar los productos');
      } finally {
        setLoading(false);
      }
    };

    cargarProductos();
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />
        <p className="text-center mt-5">Cargando productos...</p>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <p className="text-center text-danger mt-5">{error}</p>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container text-center mt-5">
        <h2 className="mb-4">Nuestros Productos 🍰</h2>
        <div className="d-flex flex-wrap justify-content-center">
          {productos.map((prod) => (
            <ProductoCard key={prod.id} producto={prod} />
          ))}
        </div>
      </div>
    </>
  );
}
