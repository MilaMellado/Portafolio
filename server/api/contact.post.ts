export default defineEventHandler(async (event) => {
  const body = await readBody(event);
<<<<<<< HEAD
  const GOOGLE_URL = 'https://script.google.com/macros/s/AKfycbwXorgwYX_T9p1uHShxIXhUfBZK8YRgjWPHGnAcslSYFCHy9nsydff6nLr1oqVkCQQj/exec';

  try {
    // Usamos fetch nativo o una configuración más simple para evitar bloqueos de CORS
    const response = await $fetch(GOOGLE_URL, {
      method: 'POST',
      mode: 'no-cors', // Esto evita muchos problemas de permisos
      body: body,
      headers: {
        'Content-Type': 'application/json',
      }
    });
    return response;
  } catch (error: any) {
    // Esto imprimirá el error real en tu terminal de VS Code
    console.error("Fallo en la API de Nuxt:", error.data || error.message);
    throw createError({
      statusCode: 500,
      statusMessage: 'Error interno al conectar con Google',
=======
  
  // REEMPLAZA ESTO CON TU NUEVA URL DE /exec
  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx46g0_lKX12A7c4w621WfcQ1gOlf0_Wg0TGJkAP_geB8eXnokVb_nj7TiWIIXIJkvg/exec';

  try {
    const data = await $fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'text/plain;charset=utf-8', 
      },
    });

    return data;
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Fallo al conectar con Google Script: ' + error.message,
>>>>>>> 540d16c5fd0836aee7cf68b5621ab4f6b53e9afb
    });
  }
});