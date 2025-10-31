import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import { Home } from "@/pages/Home/Home";
import { Productos } from "@/pages/Productos/Productos";
import { Carrito } from "@/pages/Carrito/Carrito";
import { Registro } from "@/pages/Registro/Registro";
import { Sesion } from "@/pages/Sesion/Sesion";
import { Contacto } from "@/pages/Contacto/Contacto";


import { AdminHome } from "@/pages/Admin/AdminHome/AdminHome";
import { AdminProductos } from "@/pages/Admin/AdminProductos/AdminProductos";
import { AdminUsuarios } from "@/pages/Admin/AdminUsuarios/AdminUsuarios";
import { NuevoProducto } from "@/pages/Admin/NuevoProducto/NuevoProducto";
import { AdminNavbar } from "@/componentes/AdminNavbar/AdminNavbar";



import "./App.css";

function App() {
  return (
    <Router>
      <Routes>

       
        <Route path="/" element={<Home/>} />
        <Route path="/productos" element={<Productos/>} />
        <Route path="/carrito" element={<Carrito/>} />
        <Route path="/registro" element={<Registro/>} />
        <Route path="/sesion" element={<Sesion/>} />
        <Route path="/contacto" element={<Contacto/>} />

      
        <Route path="/admin" element={<AdminHome/>} />
        <Route path="/admin/productos" element={<AdminProductos/>} />
        <Route path="/admin/usuarios" element={<AdminUsuarios/>} />
        <Route path="/admin/nuevo-producto" element={<NuevoProducto/>} />
        


      </Routes>
    </Router>
  );
}

export default App;
