const express = require('express');
const axios = require('axios');
const cors = require('cors'); 
require('dotenv').config();

const app = express();
const port = 3000;

const MOODLE_URL = process.env.MOODLE_URL;
const MOODLE_TOKEN = process.env.MOODLE_TOKEN;

app.use(cors());

// Middleware para manejar JSON
app.use(express.json());

// Ruta para obtener los cursos de un usuario
// Ruta para obtener los cursos de un usuario logueado
app.get('/courses/:userid', async (req, res) => {
  const { userid } = req.params;
  const token = req.headers.authorization?.split(' ')[1]; // Extraer el token del header Authorization

  if (!token) {
      return res.status(401).json({ error: 'Token no proporcionado' });
  }

  try {
      // Hacer la solicitud a Moodle para obtener los cursos del usuario
      const response = await axios.get(`${MOODLE_URL}/webservice/rest/server.php`, {
          params: {
              wstoken: token,
              wsfunction: 'core_enrol_get_users_courses',
              moodlewsrestformat: 'json',
              userid: userid
          }
      });

      // Verificar si se obtuvieron cursos
      if (response.data && response.data.length > 0) {
          res.json(response.data); // Devolver los cursos obtenidos
          console.log(response.data)
      } else {
          res.status(404).json({ message: 'No se encontraron cursos para este usuario' });
      }
  } catch (error) {
      // Verificar el tipo de error y manejarlo de forma adecuada
      if (error.response && error.response.status === 403) {
          res.status(403).json({ error: 'Acceso denegado. Token inválido o no autorizado.' });
      } else {
          console.error('Error al obtener los cursos:', error);
          res.status(500).json({ error: 'Error al obtener los cursos' });
      }
  }
});



/* app.get('/courses/:userid', async (req, res) => {
    const { userid } = req.params;
    try {
        const response = await axios.get(`${MOODLE_URL}/webservice/rest/server.php`, {
            params: {
                wstoken: MOODLE_TOKEN,
                wsfunction: 'core_enrol_get_users_courses',
                moodlewsrestformat: 'json',
                userid: userid
            }
        });

        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los cursos' });
    }
}); */

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Hacer una solicitud a Moodle para obtener el token de usuario
        const response = await axios.post(`${MOODLE_URL}/login/token.php`, null, {
            params: {
                username: username,
                password: password,
                service: 'moodle_mobile_app', // o el servicio que estés usando
            }
        });

        const { token } = response.data;

        if (token) {
            // Devolver el token al frontend
            res.json({ token });
        } else {
            // Si no se obtiene token, responder con error
            res.status(401).json({ error: 'Credenciales inválidas' });
        }

    } catch (error) {
        res.status(500).json({ error: 'Error al autenticarse con Moodle' });
    }
});


app.get('/user/profile', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1]; // Extraer el token del header Authorization
  
    if (!token) {
      return res.status(401).json({ error: 'Token no proporcionado' });
    }
  
    try {
      // Hacer una solicitud a Moodle para obtener la información del usuario autenticado
      const response = await axios.get(`${MOODLE_URL}/webservice/rest/server.php`, {
        params: {
          wstoken: token,
          wsfunction: 'core_webservice_get_site_info',
          moodlewsrestformat: 'json'
        }
      });
  
      /* const userData = response.data; */
      const  userid  = response.data.userid
      /* console.log("UserId: ", userid ) */

      // 2. Usar el ID del usuario para obtener más detalles con core_user_get_users_by_field
      const userProfileResponse = await axios.get(`${MOODLE_URL}/webservice/rest/server.php`, {
        params: {
          wstoken: token,
          wsfunction: 'core_user_get_users_by_field',
          moodlewsrestformat: 'json',
          field: 'id', // Puedes usar también 'username'
          values: [userid] // Pasamos el ID del usuario obtenido en el paso anterior
        }
      });
      
  
      // Verifica si la respuesta contiene un array y accede a su primer elemento
      const userData = userProfileResponse.data[0];
      /* console.log(userProfileResponse.data[0]) */
  
      // Devolver solo los datos necesarios al frontend
      res.json({
        fullname: userData.fullname,
        email: userData.email,
        profileimageurl: userData.profileimageurl,
        firstname: userData.firstname,
        id: userData.id

      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener los datos del usuario' });
    }
  });
  
  
