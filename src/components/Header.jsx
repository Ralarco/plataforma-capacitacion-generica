import React from 'react';
import { useUser } from '../contexts/UserDataContext';
import { FaSun, FaMoon } from 'react-icons/fa';
import logo from '../images/logo.svg'

function Header({darkMode, setDarkMode }) {
  const { user } = useUser();

  const firstName = user ? user.fullname.split(" ")[0] : "";
  
  return (
    <header className="flex items-center justify-between bg-gray-500 dark:bg-gray-900 text-white p-4">
      <div className="flex items-center space-x-2">
        <img src={logo} alt="Logo" className="h-12 w-12" />
        <h1 className="text-xl font-bold">IntegraIdeas</h1>
      </div>

      <div className="flex items-center space-x-4 text-sm">
        {user ? (
          <span>Bienvenido, {firstName}</span>
        ) : (
          ''
        )}


        <button
          onClick={() => setDarkMode(!darkMode)}
          className="bg-gray-600 hover:bg-gray-700 text-white p-2 rounded-full"
        >
          {darkMode ? <FaSun size={18} /> : <FaMoon size={18} />}
        </button>
      </div>
    </header>
  );
}

export default Header;
