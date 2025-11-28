import { createContext, useContext, useState, useEffect } from 'react';
import { login as apiLogin, saveSession, clearSession } from '../services/authService';
import { setAuthToken } from '../services/api';
import { getUsuarioByEmail } from '../services/usuarioServices';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      setAuthToken(token);
      const username = localStorage.getItem('username');
      const rol = localStorage.getItem('rol');
      setUser({ username, rol });
      // If we don't have idUsuario persisted, try to retrieve it from backend
      (async () => {
        try {
          const existingId = localStorage.getItem('idUsuario');
          if (!existingId) {
            const email = localStorage.getItem('username') || localStorage.getItem('email');
            if (email) {
              const usuario = await getUsuarioByEmail(email);
              if (usuario?.id) {
                localStorage.setItem('idUsuario', String(usuario.id));
                setUser((u) => ({ ...(u || {}), id: usuario.id }));
              }
            }
          }
        } catch (e) {
          // ignore
        }
      })();
    }
  }, [token]);

  const login = async (email, password) => {
    const data = await apiLogin(email, password);
    // Persist token and basic session
    saveSession(data);
    setToken(data.token);
    setAuthToken(data.token); // ensure Authorization header available immediately
    // Try to fetch full user record (to obtain id) and store it
    try {
      const usuario = await getUsuarioByEmail(data.email);
      if (usuario?.id) {
        localStorage.setItem('idUsuario', String(usuario.id));
      }
      setUser({ email: data.email, rol: data.rol, id: usuario?.id });
    } catch (err) {
      // If fetching user fails, still set basic session
      setUser({ email: data.email, rol: data.rol });
    }
    return data;
  };

  const logout = () => {
    clearSession();
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
