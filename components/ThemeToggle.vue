<template>
  <button 
    @click="toggleTheme" 
    class="fixed top-6 right-6 z-50 p-3 rounded-full bg-gray-200 dark:bg-gray-800 transition-all duration-300 shadow-lg"
  >
    <span v-if="isDark">☀️</span>
    <span v-else>🌙</span>
  </button>
</template>

<script setup>
const isDark = ref(false)

const toggleTheme = () => {
  isDark.value = !isDark.value
  
  // Forzamos el cambio en el elemento raíz <html>
  if (isDark.value) {
    document.documentElement.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }
}

// Al cargar la página, recuperar el tema guardado
onMounted(() => {
  if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    isDark.value = true
    document.documentElement.classList.add('dark')
  }
})
</script>