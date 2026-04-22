export default defineEventHandler(async (event) => {
  const body = await readBody(event);
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
    });
  }
});