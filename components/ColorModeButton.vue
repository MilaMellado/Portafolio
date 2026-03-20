<script setup lang="ts">
const colorMode = useColorMode()

const toggleTheme = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <ClientOnly>
    <button 
      @click="toggleTheme" 
      class="fixed top-6 right-6 z-50 flex items-center justify-center w-12 h-12 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-gray-200 dark:border-gray-700 shadow-lg hover:scale-110 transition-transform duration-300"
      aria-label="Alternar tema"
    >
      <i v-if="colorMode.value === 'dark'" class="fa-solid fa-sun text-xl text-yellow-500"></i>
      <i v-else class="fa-solid fa-moon text-xl text-indigo-500 dark:text-cyan-400"></i>
    </button>
    
    <template #fallback>
      <div class="fixed top-6 right-6 z-50 w-12 h-12 rounded-full bg-white/80 dark:bg-slate-800/80 border border-gray-200 dark:border-gray-700"></div>
    </template>
  </ClientOnly>
</template>