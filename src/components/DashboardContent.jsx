import React, { useEffect, useState } from 'react';
import { useUser } from '../contexts/UserDataContext';
import { useNavigate } from 'react-router-dom';

function DashboardContent() {
  const { user, setUser } = useUser(); // Extrae y actualiza los datos del usuario desde el contexto
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
    return <p>Cargando datos...</p>;
  }

  return (
    <main className="flex flex-row bg-slate-50 p-6 rounded-md shadow-md m-3 h-fit w-full">
      <div>
        {user?.profileimageurl && <img src={user.profileimageurl} alt="Foto de perfil" className="rounded-full w-24 h-24 mt-4" />}
      </div>

      <div className='my-auto ml-5'>
        <h1 className="text-xl font-bold">Bienvenido, {user?.fullname}</h1>
        <p>Email: {user?.email}</p>
        <p>Id: {user?.userid}</p>
      </div>
    </main>
  );
}

export default DashboardContent;
