import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserDataContext'; 
import config from "../utils/config";
import toast, { Toaster } from 'react-hot-toast';

function LoginForm() {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { loginUser } = useUser(); // Obtén el método para actualizar el contexto

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${config.URL_HOST}/login`, {
        username: user,
        password: password,
      });

      // Si el login es exitoso
      if (response.data.token) {
        // Guarda el token en el localStorage
        localStorage.setItem('token', response.data.token);
        try {
          const respUserData = await axios.get(`${config.URL_HOST}/user/profile`, {
            headers: {
              Authorization: `Bearer ${response.data.token}`,
            },
          });
  
          if (respUserData.data) {
            loginUser(respUserData.data); // Actualiza el contexto con los datos del usuario
            /* console.log(respUserData.data) */
            //setLoading(false);
          }
        } catch (error) {
          toast.error('Error al obtener los datos del usuario');
          //setLoading(false);
        }
        navigate('/dashboard');
      }
    } catch (error) {
      // Si hay un error, muestra un toast de error
      toast.error('Credenciales incorrectas o error en el servidor');
    }
  };

  return (
    <>
      <Toaster /> {/* Esto muestra los toasts */}
      <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
        <div>
          <label htmlFor="usuario" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Usuario
          </label>
          <input
            type="text"
            name="usuario"
            id="usuario"
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@company.com"
            required
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Contraseña
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="••••••••"
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          Ingresar
        </button>
      </form>
    </>
  );
}

export default LoginForm;
