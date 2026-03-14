<template>
  <button @click="toggleColor" class="btn-theme">
    {{ colorMode.value === 'dark' ? '☀️' : '🌙' }}
  </button>
</template>

<script setup>
const colorMode = useColorMode()

const toggleColor = () => {
  // Si está en dark, cambia a light y viceversa
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>

<style scoped>
.btn-theme {
  padding: 10px 20px;
  border-radius: 20px;
  cursor: pointer;
  border: 1px solid #ccc;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(5px);
  color: inherit;
  font-weight: bold;
  transition: all 0.3s ease;
}

.btn-theme:hover {
  transform: scale(1.05);
  background: rgba(255, 255, 255, 0.4);
}
</style>