<template>
  <div class="bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl border border-gray-200 dark:border-white/10 p-8 rounded-3xl shadow-2xl w-full max-w-lg ring-1 ring-gray-200 dark:ring-cyan-500/50">
    <h2 class="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">Ponte en contacto</h2>
    
    <form class="space-y-4" @submit.prevent>
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nombre</label>
        <input type="text" id="name" class="w-full px-4 py-2 bg-gray-50 dark:bg-slate-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-cyan-500 focus:outline-none transition-colors text-gray-900 dark:text-white" placeholder="Tu nombre">
      </div>
      
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Correo Electrónico</label>
        <input type="email" id="email" class="w-full px-4 py-2 bg-gray-50 dark:bg-slate-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-cyan-500 focus:outline-none transition-colors text-gray-900 dark:text-white" placeholder="correo@ejemplo.com">
      </div>
      
      <div>
        <label for="message" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Mensaje</label>
        <textarea id="message" rows="4" class="w-full px-4 py-2 bg-gray-50 dark:bg-slate-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-cyan-500 focus:outline-none transition-colors text-gray-900 dark:text-white resize-none" placeholder="¿En qué te puedo ayudar?"></textarea>
      </div>
      
      <button type="submit" class="w-full mt-4 bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-cyan-500 dark:to-blue-600 hover:opacity-90 text-white font-bold py-3 px-4 rounded-xl transition duration-200 shadow-lg">
        <i class="fa-solid fa-paper-plane mr-2"></i> Enviar Mensaje
      </button>
    </form>
  </div>
</template>