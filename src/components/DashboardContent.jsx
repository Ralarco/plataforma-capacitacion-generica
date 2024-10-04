import React, { useEffect, useState } from 'react';
import { useUser } from '../contexts/UserDataContext';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';
import MyProfile from './dashboard/MyProfile';
import MyCourses from './dashboard/MyCourses';

function DashboardContent() {
  const { user, setUser } = useUser(); // Extrae y actualiza los datos del usuario desde el contexto
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const storedUser = localStorage.getItem('user'); // Verifica si hay un usuario en localStorage
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/'); // Si no hay token, redirige al login
    } else if (!user && storedUser) {
      setUser(JSON.parse(storedUser)); // Restaura los datos del usuario en el contexto
    }

    setLoading(false); // Ya se han cargado los datos
  }, [user, setUser, navigate]);

  if (loading) {
    return <p><Loader /></p>;
  }

  return (
    <div className=' gap-5 w-full pr-10'>
      <MyProfile user={ user } />
      <MyCourses id={ user.id } token={ token } />
    </div>
  );
}

export default DashboardContent;
