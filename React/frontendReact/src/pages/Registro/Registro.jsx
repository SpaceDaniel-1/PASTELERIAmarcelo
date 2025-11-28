import { useState } from "react";
import { Navbar } from "@/componentes/Navbar/Navbar";
import { registrarUsuario } from "@/services/registroServices";
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
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");
    setError("");

    const dominiosPermitidos = ["@duoc.cl", "@profesor.duoc.cl", "@gmail.com"];

    // VALIDACIONES
    if (!form.nombre.trim()) return setError("El nombre es requerido.");
    if (form.nombre.length > 50) return setError("Máximo 50 caracteres en el nombre.");

    if (!form.email || !form.confirmarEmail)
      return setError("Debes ingresar y confirmar el correo.");

    if (!dominiosPermitidos.some((d) => form.email.endsWith(d)))
      return setError("Correo debe ser @duoc.cl, @profesor.duoc.cl o @gmail.com.");

    if (form.email !== form.confirmarEmail)
      return setError("Los correos no coinciden.");

    if (!form.password || !form.confirmarPassword)
      return setError("Debes ingresar y confirmar la contraseña.");

    if (form.password !== form.confirmarPassword)
      return setError("Las contraseñas no coinciden.");

    // 🔥 Crear payload real del backend
    const usuario = {
      nombre: form.nombre,
      username: form.email.split("@")[0], // opcional: generar username automático
      email: form.email,
      password: form.password,
      rol: "CLIENTE",
    };

    try {
      await registrarUsuario(usuario);

      setMensaje("Registro exitoso. ¡Bienvenido a Marcelo Pastelería!");

      // limpiar formulario
      setForm({
        nombre: "",
        email: "",
        confirmarEmail: "",
        password: "",
        confirmarPassword: "",
        telefono: ""
      });
    } catch (err) {
      console.error(err);
      setError("Error al registrar usuario en el servidor.");
    }
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
          <input type="email" name="confirmarEmail" value={form.confirmarEmail} onChange={handleChange} required />

          <label>Contraseña</label>
          <input type="password" name="password" value={form.password} onChange={handleChange} required />

          <label>Confirmar contraseña</label>
          <input type="password" name="confirmarPassword" value={form.confirmarPassword} onChange={handleChange} required />

          <button type="submit" className="btn btn-primary mt-3 w-100">
            Crear cuenta
          </button>
        </form>

        {mensaje && <p className="mt-3 text-center text-success">{mensaje}</p>}
        {error && <p className="mt-3 text-center text-danger">{error}</p>}
      </div>
    </>
  );
}
