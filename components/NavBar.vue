<script setup lang="ts">
const colorMode = useColorMode()

const toggleTheme = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <nav class="fixed top-0 left-0 w-full z-50 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
    <div class="max-w-6xl mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        
        <div class="flex-shrink-0 font-bold text-xl tracking-tighter text-indigo-600 dark:text-cyan-400">
          Mila<span class="text-slate-900 dark:text-white">.Mellado</span>
        </div>

        <div class="hidden md:flex space-x-8">
          <a href="#inicio" class="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-cyan-400 transition-colors">
            <i class="fa-solid fa-house mr-1.5"></i> Inicio
          </a>
          <a href="#proyectos" class="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-cyan-400 transition-colors">
            <i class="fa-solid fa-code mr-1.5"></i> Proyectos
          </a>
          <a href="#contacto" class="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-cyan-400 transition-colors">
            <i class="fa-solid fa-envelope mr-1.5"></i> Contacto
          </a>
        </div>

        <ClientOnly>
          <button 
            @click="toggleTheme" 
            class="p-2 rounded-lg bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
            aria-label="Alternar tema"
          >
            <i v-if="colorMode.value === 'dark'" class="fa-solid fa-sun text-yellow-500"></i>
            <i v-else class="fa-solid fa-moon text-indigo-500 dark:text-cyan-400"></i>
          </button>
        </ClientOnly>

      </div>
    </div>
  </nav>
</template>