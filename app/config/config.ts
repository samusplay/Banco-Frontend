// Definimos la URL base de tu API de Laravel
// Intentará leer de la variable de entorno, si no existe, usa el localhost por defecto
export const BACKEND_URL = 
  process.env.NEXT_PUBLIC_BACKEND_URL || 
  "http://localhost:8000/api"; 

// Si vas a usar otros microservicios más adelante, puedes agregarlos aquí
export const CONFIGURATION_SERVICE_URL =
  process.env.NEXT_PUBLIC_CONFIGURATION_SERVICE_URL ||
  "";
