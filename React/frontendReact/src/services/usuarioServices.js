import { apiFetch, post } from "./api";

const BASE = "/api/usuarios";

export async function getUsuarios() {
  return apiFetch(BASE);
}

export async function crearUsuario(usuario) {
  return post(BASE, usuario);
}

export async function getUsuarioByEmail(email) {
  return apiFetch(`${BASE}/email/${encodeURIComponent(email)}`);
}
