<template>
  <div class="w-full h-full p-6 bg-white dark:bg-neutral-900 rounded-3xl overflow-y-auto">
    <h2 class="text-3xl font-black mb-8 text-gray-900 dark:text-white text-center">Galería de Arte</h2>
    
    <div v-if="cargando" class="flex justify-center items-center h-64">
      <div class="text-purple-600 font-bold animate-pulse text-xl">Cargando magia visual...</div>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div v-for="obra in obras" :key="obra.id" 
           class="group bg-gray-50 dark:bg-neutral-800 rounded-2xl p-4 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-neutral-700">
        
        <div class="overflow-hidden rounded-xl mb-4 bg-gray-200">
          <img :src="obra.url" 
               class="w-full h-56 object-cover transform group-hover:scale-110 transition-transform duration-500" 
               alt="Obra de arte" />
        </div>
        
        <h3 class="font-bold text-sm text-gray-900 dark:text-white line-clamp-1">{{ obra.title }}</h3>
        <p class="text-xs text-purple-500 font-semibold mt-1">Chicago Art Institute</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const obras = ref([])
const cargando = ref(true)

onMounted(async () => {
  try {
    // Usamos una API de prueba super estable para asegurar que las imágenes carguen
    // Si ves que esto funciona, luego solo cambiamos el endpoint por el de Chicago
    const res = await fetch('https://jsonplaceholder.typicode.com/photos?_limit=6')
    const data = await res.json()
    
    // Mapeamos los datos para que coincidan con nuestra estructura
    obras.value = data.map(item => ({
      id: item.id,
      title: item.title,
      url: item.url // URL de imagen directa
    }))
  } catch (e) {
    console.error("Error cargando API:", e)
  } finally {
    cargando.value = false
  }
})
</script>