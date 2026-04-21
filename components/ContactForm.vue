<template>
  <div class="bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl border border-gray-200 dark:border-white/10 p-8 rounded-3xl shadow-2xl w-full max-w-lg ring-1 ring-gray-200 dark:ring-cyan-500/50">
    <h2 class="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">Ponte en contacto</h2>
    
    <div v-if="mensajeEstado" :class="['mb-4 p-3 rounded-lg text-center text-sm font-bold', esExito ? 'bg-green-500/20 text-green-400 border border-green-500/50' : 'bg-red-500/20 text-red-400 border border-red-500/50']">
      {{ mensajeEstado }}
    </div>

    <form class="space-y-4" @submit.prevent="enviarFormulario">
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nombre</label>
        <input v-model="form.nombre" type="text" id="name" class="w-full px-4 py-2 bg-gray-50 dark:bg-slate-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-cyan-500 focus:outline-none transition-colors text-gray-900 dark:text-white" placeholder="Tu nombre" required>
      </div>
      
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Correo Electrónico</label>
        <input v-model="form.correo" type="email" id="email" class="w-full px-4 py-2 bg-gray-50 dark:bg-slate-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-cyan-500 focus:outline-none transition-colors text-gray-900 dark:text-white" placeholder="correo@ejemplo.com" required>
      </div>
      
      <div>
        <label for="message" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Mensaje</label>
        <textarea v-model="form.proyecto" id="message" rows="4" class="w-full px-4 py-2 bg-gray-50 dark:bg-slate-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-cyan-500 focus:outline-none transition-colors text-gray-900 dark:text-white resize-none" placeholder="¿En qué te puedo ayudar?" required></textarea>
      </div>
      
      <button :disabled="cargando" type="submit" class="w-full mt-4 bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-cyan-500 dark:to-blue-600 hover:opacity-90 text-white font-bold py-3 px-4 rounded-xl transition duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">
        <span v-if="!cargando">
          <i class="fa-solid fa-paper-plane mr-2"></i> Enviar Mensaje
        </span>
        <span v-else class="flex items-center justify-center">
          <svg class="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Enviando...
        </span>
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Estado reactivo del formulario
const form = ref({
  nombre: '',
  correo: '',
  proyecto: '' // Se mantiene como 'proyecto' para coincidir con tu Script de Google
});

const cargando = ref(false);
const mensajeEstado = ref('');
const esExito = ref(false);

const enviarFormulario = async () => {
  cargando.value = true;
  mensajeEstado.value = '';
  
  try {
    // Realiza la petición a tu API interna en server/api/contact.post.ts
    await $fetch('/api/contact', {
      method: 'POST',
      body: form.value
    });

    mensajeEstado.value = '¡Recibido! Me pondré en contacto pronto.';
    esExito.value = true;
    
    // Limpiar el formulario tras el éxito
    form.value = {
      nombre: '',
      correo: '',
      proyecto: ''
    };
  } catch (error) {
    console.error("Error al enviar:", error);
    mensajeEstado.value = 'Error al enviar. Revisa la consola o la URL de Google.';
    esExito.value = false;
  } finally {
    cargando.value = false;
    // Ocultar el mensaje después de 5 segundos
    setTimeout(() => {
      mensajeEstado.value = '';
    }, 5000);
  }
};
</script>