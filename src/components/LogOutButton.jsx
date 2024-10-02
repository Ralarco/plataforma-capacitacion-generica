import React from 'react';
import { useUser } from '../contexts/UserDataContext';
import { useNavigate } from 'react-router-dom';
import { RiLogoutCircleRLine } from "react-icons/ri";

function LogoutButton({ isOpen }) {
  const { logoutUser } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser(); // Limpia los datos del usuario del contexto y localStorage
    navigate('/'); // Redirige al login
  };

  return (
    <button onClick={handleLogout} className='flex items-center justify-self-end space-x-4 p-2 border border-gray-800  hover:bg-slate-500 rounded'>
        <div><RiLogoutCircleRLine /></div>
      {isOpen && <span>Cerrar sesión</span>}
    </button>
  );
}

export default LogoutButton;
