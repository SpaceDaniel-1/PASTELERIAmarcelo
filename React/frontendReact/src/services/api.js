const BASE = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export async function apiFetch(path, opts = {}) {
  const url = `${BASE}${path}`;
  const token = localStorage.getItem('token');
  const headers = Object.assign({ 'Content-Type': 'application/json' }, opts.headers || {});
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(url, Object.assign({}, opts, { headers }));
  if (!res.ok) {
    const txt = await res.text().catch(() => '');
    throw new Error(`HTTP ${res.status}: ${txt}`);
  }
  if (res.status === 204) return null;
  return res.json();
}

export function setAuthToken(token) {
  if (token) localStorage.setItem('token', token);
  else localStorage.removeItem('token');
}

export async function post(path, body) {
  return apiFetch(path, { method: 'POST', body: JSON.stringify(body) });
}

export default { apiFetch, post, setAuthToken };
