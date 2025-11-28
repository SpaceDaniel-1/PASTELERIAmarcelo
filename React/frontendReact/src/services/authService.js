import { post, setAuthToken } from './api';

export async function login(email, password) {
  // post returns parsed JSON or throws
  const data = await post('/auth/login', { email, password });
  return data;
}

export function saveSession(data) {
  if (data?.token) {
    localStorage.setItem('token', data.token);
    setAuthToken(data.token);
  }
  if (data?.rol) localStorage.setItem('rol', data.rol);
  if (data?.username) localStorage.setItem('username', data.username);
  // Persist user id for APIs that expect it (handle several possible response keys)
  const id = data?.id || data?.userId || data?.usuarioId || data?.idUsuario || data?.usuario?.id;
  if (id) localStorage.setItem('idUsuario', String(id));
}

export function clearSession() {
  localStorage.removeItem('token');
  localStorage.removeItem('rol');
  localStorage.removeItem('username');
  localStorage.removeItem('idUsuario');
  setAuthToken(null);
}
