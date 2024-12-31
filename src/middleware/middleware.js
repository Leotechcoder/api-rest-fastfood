
const ACCEPTED_ORIGINS = [
  'http://localhost:3000',
  'http://127.0.0.1:5500',
];

export const access = (req, res) => {
  const origin = req.header('origin'); // Obtener el origen de la solicitud
  console.log(`Origin: ${origin}`);

  // Verificar si el origen está en la lista de aceptados
  if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    res.header('Access-Control-Allow-Origin', origin); // Permitir el origen
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Métodos permitidos
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Headers permitidos
    res.header('Access-Control-Allow-Credentials', 'true'); // Permitir credenciales (si es necesario)

    // Manejo de solicitudes preflight (OPTIONS)
    if (req.method === 'OPTIONS') {
      return res.sendStatus(204); // Respuesta exitosa para solicitudes preflight
    }
  } else {
    // Si el origen no está permitido, bloquear la solicitud
    return res.status(403).send('CORS: Origin not allowed');
  }

};
