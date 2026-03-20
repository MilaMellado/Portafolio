<script setup lang="ts">
// Paso 1: Definimos los datos de tus proyectos REALES aquí en app.vue
const misProyectos = [
  {
    title: 'Analizador de Datos AI',
    description: 'Implementación de modelos predictivos y visualización de datos complejos utilizando Python y Scikit-Learn.',
    icon: 'fa-brands fa-python',
    iconColor: 'text-yellow-500', // Python color
    tags: ['Python', 'AI', 'Machine Learning', 'Data Science'],
    githubUrl: 'https://github.com/tu-usuario/proyecto-python', // Reemplaza con tus enlaces
    liveUrl: 'https://tu-demo-python.com'
  },
  {
    title: 'Frontend Portafolio Moderno',
    description: 'Desarrollo de una interfaz de usuario reactiva y optimizada con Nuxt 3, Vue 3 y Tailwind CSS.',
    icon: 'fa-brands fa-vuejs',
    iconColor: 'text-emerald-500', // Vue color
    tags: ['Nuxt 3', 'Vue.js', 'TypeScript', 'Tailwind', 'SSR'],
    githubUrl: 'https://github.com/tu-usuario/proyecto-nuxt',
    liveUrl: 'https://tu-demo-nuxt.com'
  },
  {
    title: 'API Backend Escalable',
    description: 'Construcción de una API segura con Node.js, Express, autenticación JWT y conexión a MongoDB.',
    icon: 'fa-brands fa-node-js',
    iconColor: 'text-green-500', // Node color
    tags: ['Node.js', 'Express', 'Backend', 'API', 'MongoDB'],
    githubUrl: 'https://github.com/tu-usuario/proyecto-node'
    // liveUrl no se define aquí, el botón Demo no aparecerá
  }
];
</script>

<template>
  <div class="min-h-screen animated-creative-bg text-slate-900 dark:text-white relative overflow-hidden transition-colors duration-500">
    
    <NavBar />
    
    <main class="relative z-10 pt-16">
      
      <section id="inicio" class="min-h-screen flex justify-center items-center p-4">
        <ProfileCard />
      </section>

      <section id="proyectos" class="min-h-screen py-20 px-4 flex flex-col items-center">
        <div class="max-w-6xl w-full">
          
          <div class="text-center mb-16">
            <h2 class="text-5xl font-extrabold tracking-tighter bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-cyan-400 dark:to-blue-500 bg-clip-text text-transparent mb-4">
              Proyectos Destacados
            </h2>
            <p class="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Una selección de mis trabajos recientes en desarrollo web, IA y análisis de datos.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            <ProjectCard 
              v-for="(p, index) in misProyectos" 
              :key="index" 
              :project="p" 
            />
          </div>

        </div>
      </section>

      <section id="contacto" class="min-h-screen flex justify-center items-center p-4">
        <ContactForm />
      </section>

    </main>
  </div>
</template>

<style>
/* Fondo animado técnico e isométrico
   (Reacciona automáticamente a la clase .dark de Nuxt)
*/
.animated-creative-bg {
  background-color: #f1f5f9; /* Color claro por defecto */
  background-image: 
    linear-gradient(30deg, #d1d5db 12%, transparent 12.5%, transparent 87%, #d1d5db 87.5%, #d1d5db),
    linear-gradient(150deg, #d1d5db 12%, transparent 12.5%, transparent 87%, #d1d5db 87.5%, #d1d5db),
    linear-gradient(30deg, #d1d5db 12%, transparent 12.5%, transparent 87%, #d1d5db 87.5%, #d1d5db),
    linear-gradient(150deg, #d1d5db 12%, transparent 12.5%, transparent 87%, #d1d5db 87.5%, #d1d5db),
    linear-gradient(60deg, #d1d5db77 25%, transparent 25.5%, transparent 75%, #d1d5db77 75.5%, #d1d5db77),
    linear-gradient(60deg, #d1d5db77 25%, transparent 25.5%, transparent 75%, #d1d5db77 75.5%, #d1d5db77);
  background-size: 60px 105px;
  background-position: 0 0, 0 0, 30px 53px, 30px 53px, 0 0, 30px 53px;
  animation: move-bg 30s linear infinite;
}

/* Modificadores cuando el modo oscuro está activo */
html.dark .animated-creative-bg {
  background-color: #0f172a; /* Fondo oscuro */
  background-image: 
    linear-gradient(30deg, #334155 12%, transparent 12.5%, transparent 87%, #334155 87.5%, #334155),
    linear-gradient(150deg, #334155 12%, transparent 12.5%, transparent 87%, #334155 87.5%, #334155),
    linear-gradient(30deg, #334155 12%, transparent 12.5%, transparent 87%, #334155 87.5%, #334155),
    linear-gradient(150deg, #334155 12%, transparent 12.5%, transparent 87%, #334155 87.5%, #334155),
    linear-gradient(60deg, #33415577 25%, transparent 25.5%, transparent 75%, #33415577 75.5%, #33415577),
    linear-gradient(60deg, #33415577 25%, transparent 25.5%, transparent 75%, #33415577 75.5%, #33415577);
}

@keyframes move-bg {
  0% { background-position: 0 0, 0 0, 30px 53px, 30px 53px, 0 0, 30px 53px; }
  100% { background-position: 60px 105px, 60px 105px, 90px 158px, 90px 158px, 60px 105px, 90px 158px; }
}

/* Comportamiento de scroll suave para toda la página */
html {
  scroll-behavior: smooth;
}

body {
  @apply transition-colors duration-300;
  margin: 0;
  padding: 0;
}
</style>