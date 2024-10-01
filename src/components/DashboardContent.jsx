import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '../contexts/UserDataContext';
import { useNavigate } from 'react-router-dom';
import config from '../utils/config';


function DashboardContent() {
  const { user, setUser } = useUser(); // Extrae y actualiza los datos del usuario desde el contexto
  const [loading, setLoading] = useState(true); // Estado para manejar la carga de los datos
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setError('No se encontró token. Redirigiendo al login...');
        setTimeout(() => navigate('/'), 2000); // Redirigir al login si no hay token
        return;
      }

      try {
        const response = await axios.get(`${config.URL_HOST}/user/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data) {
          setUser(response.data); // Actualiza el contexto con los datos del usuario
          setLoading(false);
        }
      } catch (error) {
        setError('Error al obtener los datos del usuario');
        setLoading(false);
      }
    };

    fetchUserData();
  }, [setUser, navigate]);

  if (loading) {
    return <p>Cargando datos...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <main className="flex-1 bg-gray-100 p-6">
      <h1 className="text-xl font-bold">Bienvenido, {user.fullname}</h1>
      <p>Email: {user.email}</p>
      {user.userpictureurl && <img src={user.userpictureurl} alt="Foto de perfil" className="rounded-full w-24 h-24 mt-4" />}
    </main>
  );
}

export default DashboardContent;
