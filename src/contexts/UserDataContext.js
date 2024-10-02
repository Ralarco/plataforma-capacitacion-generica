import { createContext, useContext, useState } from 'react';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Intenta cargar el usuario desde el localStorage al iniciar la app
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const loginUser = (userData) => {
    setUser(userData); // Actualiza el contexto con los datos del usuario
    localStorage.setItem('user', JSON.stringify(userData)); // Guarda en localStorage
  };

  const logoutUser = () => {
    setUser(null); // Limpia el estado del usuario
    localStorage.removeItem('user'); // Elimina los datos del usuario de localStorage
    localStorage.removeItem('token'); // También elimina el token si es necesario
  };

  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

