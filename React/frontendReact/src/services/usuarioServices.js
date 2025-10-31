export const getUsuarios = async () => {
  const res = await fetch("/data/usuarios.json");
  const data = await res.json();
  return data.usuarios;
};
