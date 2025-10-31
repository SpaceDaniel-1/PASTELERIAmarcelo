import { useState } from "react";
import { Navbar } from "@/componentes/Navbar/Navbar";
import "./Registro.css";

export function Registro() {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    confirmarEmail: "",
    password: "",
    confirmarPassword: "",
    telefono: ""
  });

  const [mensaje, setMensaje] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dominiosPermitidos = ["@duoc.cl", "@profesor.duoc.cl", "@gmail.com"];

    if (!form.nombre.trim()) return setMensaje(" El nombre es requerido.");
    if (form.nombre.length > 50) return setMensaje(" Máximo 50 caracteres en el nombre.");

    if (!form.email || !form.confirmarEmail)
      return setMensaje("Debes ingresar y confirmar el correo.");
    if (!dominiosPermitidos.some((d) => form.email.endsWith(d)))
      return setMensaje("El correo debe ser @duoc.cl, @profesor.duoc.cl o @gmail.com.");
    if (form.email !== form.confirmarEmail)
      return setMensaje("Los correos no coinciden.");

    if (!form.password || !form.confirmarPassword)
      return setMensaje(" Debes ingresar y confirmar la contraseña.");
    if (form.password.length < 4 || form.password.length > 10)
      return setMensaje(" La contraseña debe tener entre 4 y 10 caracteres.");
    if (form.password !== form.confirmarPassword)
      return setMensaje(" Las contraseñas no coinciden.");

    if (form.telefono && !/^[0-9]{9}$/.test(form.telefono))
      return setMensaje(" El teléfono debe tener 9 dígitos.");

    localStorage.setItem("usuario", JSON.stringify(form));
    setMensaje(" Registro exitoso. ¡Bienvenido a Marcelo Pastelería!");
    setForm({
      nombre: "",
      email: "",
      confirmarEmail: "",
      password: "",
      confirmarPassword: "",
      telefono: ""
    });
  };

  return (
    <>
      <Navbar />
      <div className="registro-card mt-5">
        <h2>Registro de Usuario</h2>
        <form onSubmit={handleSubmit}>
          <label>Nombre</label>
          <input name="nombre" value={form.nombre} onChange={handleChange} required />

          <label>Correo electrónico</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} required />

          <label>Confirmar correo</label>
          <input
            type="email"
            name="confirmarEmail"
            value={form.confirmarEmail}
            onChange={handleChange}
            required
          />

          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <label>Confirmar contraseña</label>
          <input
            type="password"
            name="confirmarPassword"
            value={form.confirmarPassword}
            onChange={handleChange}
            required
          />

          <label>Teléfono (opcional)</label>
          <input
            type="text"
            name="telefono"
            value={form.telefono}
            onChange={handleChange}
          />

          <button type="submit" className="btn btn-primary mt-3 w-100">
            Crear cuenta
          </button>
        </form>
        {mensaje && <p className="mt-3 text-center">{mensaje}</p>}
      </div>
    </>
  );
}
