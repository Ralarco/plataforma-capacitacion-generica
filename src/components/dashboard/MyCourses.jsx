import axios from "axios";
import React, { useEffect, useState } from "react";
import config from "../../utils/config";


function MyCourses( { id, token } ) {
  const [courses, setCourses] = useState([]); // Para almacenar los cursos
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado de error

  // Función para obtener los cursos del usuario
  const fetchCourses = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/courses/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Enviar el token en el header
        },
      });
      setCourses(response.data); // Guardar los cursos en el estado
      setLoading(false); // Desactivar el estado de carga
    } catch (error) {
      setError('Error al obtener los cursos'); // Manejar el error
      setLoading(false);
    }
  };

  // useEffect para ejecutar la solicitud cuando el componente se monta
  useEffect(() => {
    fetchCourses();
  }, [id, token]); // Ejecuta cuando el userId o token cambian

  // Mostrar estado de carga
  if (loading) {
    return <div>Cargando cursos...</div>;
  }

  // Mostrar error en caso de que ocurra
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <section class="bg-white dark:bg-gray-900">
      <div class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6">
        <div class="grid gap-8 lg:gap-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

        {courses.length > 0 ? (
          courses.map((course) => (
            <div class="text-center text-gray-500 dark:text-gray-400">
            { course.imgurl ? <img
              class="mx-auto mb-4 w-36 h-36 rounded-full"
              src={course.imgurl}
              alt="Bonnie Avatar"
            /> : ''}
            <h3 class="mb-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              <a href="#">{course.fullname}</a>
            </h3>
            <p>{course.summary}</p>
            
          </div>
          ))
        ) : (
          <p>No hay cursos disponibles.</p>
        )}


          
        </div>
      </div>
    </section>
  );
}

export default MyCourses;
