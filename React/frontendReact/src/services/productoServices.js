import { apiFetch, post } from "./api";

const BASE = "/api/productos";

export async function getProductos() {
  return apiFetch(BASE);
}

export async function getProducto(id) {
  return apiFetch(`${BASE}/${id}`);
}

export async function crearProducto(prod) {
  return post(BASE, prod);
}

export async function eliminarProducto(id) {
  return apiFetch(`${BASE}/${id}`, { method: "DELETE" });
}

export async function actualizarProducto(id, prod) {
  return apiFetch(`${BASE}/${id}`, {
    method: "PUT",
    body: JSON.stringify(prod),
  });
}
