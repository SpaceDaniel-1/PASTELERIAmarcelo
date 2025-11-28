// src/services/boletaServices.js
import { apiFetch } from "./api";

export async function generarBoleta() {
  const userId = localStorage.getItem("idUsuario");

  if (!userId) {
    throw new Error("Usuario no autenticado");
  }

  return apiFetch(`/api/boletas/${userId}/generar`, {
    method: "POST",
  });
}
