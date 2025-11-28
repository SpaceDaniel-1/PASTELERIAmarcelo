import { apiFetch } from "./api";

export async function obtenerCarrito() {
  const userId = localStorage.getItem("idUsuario");
  // If there's no logged user, return an empty cart locally to avoid 403 from backend
  if (!userId) return { items: [], total: 0 };
  return apiFetch(`/api/carrito/${userId}`);
}

export async function agregarProducto(productoId, cantidad = 1) {
  const userId = localStorage.getItem("idUsuario");
  if (!userId) return Promise.reject(new Error('Usuario no autenticado'));
  return apiFetch(`/api/carrito/${userId}/agregar?productoId=${productoId}&cantidad=${cantidad}`, {
    method: "POST"
  });
}

export async function actualizarCantidad(itemId, cantidad) {
  const userId = localStorage.getItem("idUsuario");
  if (!userId) return Promise.reject(new Error('Usuario no autenticado'));
  return apiFetch(`/api/carrito/${userId}/item/${itemId}?cantidad=${cantidad}`, {
    method: "PUT"
  });
}

export async function eliminarItem(itemId) {
  const userId = localStorage.getItem("idUsuario");
  if (!userId) return Promise.reject(new Error('Usuario no autenticado'));
  return apiFetch(`/api/carrito/${userId}/item/${itemId}`, {
    method: "DELETE"
  });
}

export async function vaciarCarritoApi() {
  const userId = localStorage.getItem("idUsuario");
  return apiFetch(`/api/carrito/${userId}/vaciar`, { method: "DELETE" });
}


