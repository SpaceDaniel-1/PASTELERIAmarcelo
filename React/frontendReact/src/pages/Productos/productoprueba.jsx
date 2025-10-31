import { ProductoCard } from "../../componentes/ProductoCard/ProductoCard";



export function Productos() {
  const productos = [
    { id: 1, nombre: "Torta Tres Leches", precio: 12000, imagen: "/img/tresleches.jpg" },
    { id: 2, nombre: "Cheesecake Frutilla", precio: 10000, imagen: "/img/cheesecake.jpg" },
    { id: 3, nombre: "Brownie Clásico", precio: 9000, imagen: "/img/brownie.jpg" },
  ];

  return (
    <div className="container text-center mt-4">
      <h2>Productos</h2>
      <div className="row justify-content-center">
        {productos.map((p) => (
          <ProductoCard key={p.id} {...p} />
        ))}
      </div>
    </div>
  );
}
