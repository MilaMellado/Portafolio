<template>
  <div class="bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl border border-gray-200 dark:border-white/10 p-8 rounded-3xl shadow-2xl w-full max-w-md transform transition-all hover:scale-105 duration-300 ring-1 ring-gray-200 dark:ring-cyan-500/50">
    
    <div class="flex justify-center mb-6">
      <div class="relative p-1 rounded-full bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 dark:from-cyan-400 dark:via-pink-500 dark:to-yellow-500 animate-pulse">
        <img 
          src="/img/Perfil.jpeg" 
          alt="Foto de perfil" 
          class="rounded-full w-32 h-32 object-cover border-4 border-white dark:border-slate-900"
        />
      </div>
    </div>

    <div class="text-center mb-8">
      <h1 class="text-4xl font-bold tracking-tight text-gray-800 dark:text-white">Camila Arellano</h1>
      <p class="text-xl text-indigo-600 dark:text-cyan-300 font-medium mt-1">Ingeniera en TIC</p>
      <p class="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed px-4">
        Especializado en desarrollo web, análisis de datos y creación de soluciones eficientes e innovadoras.
      </p>
    </div>

    <div class="mb-8">
      <h2 class="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 text-center">Habilidades</h2>
      <div class="flex flex-wrap gap-2 justify-center">
        <span class="flex items-center gap-1.5 bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-sm border border-blue-200 dark:border-blue-700">
          <Icon name="logos:python" /> Python
        </span>
        <span class="flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 px-3 py-1 rounded-full text-sm border border-emerald-200 dark:border-emerald-700">
          <Icon name="logos:vue" /> Web Dev
        </span>
        <span class="flex items-center gap-1.5 bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300 px-3 py-1 rounded-full text-sm border border-purple-200 dark:border-purple-700">
          <Icon name="carbon:machine-learning-model" class="text-purple-600 dark:text-purple-300" /> IA & ML
        </span>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-4">
      <a 
        href="https://github.com/MilaMellado" 
        target="_blank"
        class="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-white font-semibold py-3 px-4 rounded-xl transition duration-200 border border-gray-200 dark:border-gray-700"
      >
        <Icon name="mdi:github" class="text-xl" />
        GitHub
      </a>
      <a 
        href="mailto:mila_odallem@hotmail.com" 
        class="flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-cyan-500 dark:to-blue-600 hover:opacity-90 text-white font-semibold py-3 px-4 rounded-xl transition duration-200 shadow-lg"
      >
        <Icon name="mdi:email-outline" class="text-xl" />
        Contacto
      </a>
    </div>
  </div>
</template>