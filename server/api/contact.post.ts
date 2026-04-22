export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  
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
    });
  }
});