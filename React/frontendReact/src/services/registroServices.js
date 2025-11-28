import { apiFetch } from "./api";

export const registrarUsuario = async (usuario) => {
  return apiFetch("/api/usuarios", {
    method: "POST",
    body: JSON.stringify(usuario),
  });
};

// Also provide a default export for compatibility
export default { registrarUsuario };

