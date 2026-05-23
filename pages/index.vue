<template>
  <div class="min-h-screen pb-10 pt-12">
    
    <h1 class="text-4xl md:text-5xl font-black text-center text-gray-800 mb-10 tracking-tight">
      Portafolio de Proyectos
    </h1>

    <div class="flex flex-wrap justify-center gap-4 mb-10 px-4">
      <button 
        @click="proyectoActivo = 'ajedrez'" 
        :class="claseBoton(proyectoActivo === 'ajedrez')">
        Ajedrez 3D
      </button>
      
      <button 
        @click="proyectoActivo = 'figura'" 
        :class="claseBoton(proyectoActivo === 'figura')">
        Figura 3D STL
      </button>
      
      <button 
        @click="proyectoActivo = 'api'" 
        :class="claseBoton(proyectoActivo === 'api')">
        Página API
      </button>
      
      <button 
        @click="proyectoActivo = 'desintegrador'" 
        :class="claseBoton(proyectoActivo === 'desintegrador')">
        Desintegrador de Partículas
      </button>
    </div>

    <div class="max-w-5xl mx-auto w-full px-4">
      <div class="bg-white/40 backdrop-blur-md rounded-3xl shadow-xl border border-gray-100 p-6 min-h-[500px] flex flex-col items-center justify-center overflow-hidden">
        
        <ClientOnly>
          <Ajedrez3D v-if="proyectoActivo === 'ajedrez'" class="w-full min-h-[500px] flex justify-center items-center" />
          <StlViewer v-if="proyectoActivo === 'figura'" class="w-full h-[400px] md:h-[500px] flex justify-center items-center" />
          <ApiMuseo v-if="proyectoActivo === 'api'" class="w-full h-full" />
          <Desintegrador v-if="proyectoActivo === 'desintegrador'" class="w-full h-full" />
          
          <template #fallback>
            <div class="flex flex-col items-center justify-center text-purple-600 animate-pulse">
              <span class="text-4xl mb-4">⚙️</span>
              <p class="font-bold tracking-widest uppercase">Cargando entorno seguro...</p>
            </div>
          </template>
        </ClientOnly>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineAsyncComponent } from 'vue'

const proyectoActivo = ref('figura')

// LA MAGIA ESTÁ AQUÍ: Le decimos a Nuxt que estos componentes se cargan "perezosamente"
// Esto evita el 100% de los errores de "document is not defined"
const Ajedrez3D = defineAsyncComponent(() => import('~/components/Ajedrez3D.vue'))
const StlViewer = defineAsyncComponent(() => import('~/components/StlViewer.vue'))
const ApiMuseo = defineAsyncComponent(() => import('~/components/ApiMuseo.vue'))
const Desintegrador = defineAsyncComponent(() => import('~/components/Desintegrador.vue'))

const claseBoton = (activo) => {
  return activo
    ? 'px-6 py-2 bg-purple-600 text-white rounded-full font-bold shadow-lg transition-all duration-300 transform scale-105'
    : 'px-6 py-2 bg-white text-gray-700 hover:bg-purple-100 rounded-full font-semibold shadow transition-all duration-300'
}
</script>