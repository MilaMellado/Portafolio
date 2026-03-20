<script setup lang="ts">
// Definimos los datos de tus proyectos reales aquí
const misProyectos = [
  {
    title: 'Análisis de Datos con Python',
    description: 'Implementación de modelos predictivos y visualización de datos complejos utilizando Pandas, NumPy y Scikit-Learn.',
    icon: 'fa-brands fa-python',
    iconColor: 'text-yellow-500', // Python color
    tags: ['Python', 'Data Science', 'Machine Learning', 'AI'],
    githubUrl: 'https://github.com/tu-usuario/proyecto-python', // Reemplaza con tus enlaces reales
    liveUrl: 'https://tu-demo-python.com'
  },
  {
    title: 'Plataforma Web con Nuxt 3',
    description: 'Desarrollo de una interfaz de usuario moderna y reactiva, optimizada para SSR y SEO, utilizando TypeScript y Tailwind CSS.',
    icon: 'fa-brands fa-vuejs',
    iconColor: 'text-emerald-500', // Vue color
    tags: ['Nuxt 3', 'Vue.js', 'TypeScript', 'Tailwind', 'SSR'],
    githubUrl: 'https://github.com/tu-usuario/proyecto-nuxt',
    liveUrl: 'https://tu-demo-nuxt.com'
  },
  {
    title: 'API RESTful con Node.js',
    description: 'Construcción de una API escalable y segura con autenticación JWT, conectada a una base de datos NoSQL.',
    icon: 'fa-brands fa-node-js',
    iconColor: 'text-green-500', // Node color
    tags: ['Node.js', 'Express', 'API', 'Backend', 'MongoDB'],
    githubUrl: 'https://github.com/tu-usuario/proyecto-node',
    // liveUrl: 'https://tu-demo-node.com' // Si no hay demo, el botón no se mostrará
  }
];
</script>

<template>
  <div class="min-h-screen animated-bg text-slate-900 dark:text-white relative overflow-hidden transition-colors duration-500">
    
    <NavBar />
    
    <main class="relative z-10 pt-20">
      
      <section id="inicio" class="min-h-screen flex justify-center items-center p-4">
        <ProfileCard />
      </section>

      <section id="proyectos" class="min-h-screen flex flex-col justify-center items-center py-20 px-4">
        <div class="max-w-6xl w-full">
          
          <div class="text-center mb-16">
            <h2 class="text-5xl font-extrabold tracking-tighter bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-cyan-400 dark:to-blue-500 bg-clip-text text-transparent mb-4">
              Proyectos Destacados
            </h2>
            <p class="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Una selección de mis trabajos más recientes en desarrollo web, inteligencia artificial y análisis de datos.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ProjectCard 
              v-for="(proyecto, index) in misProyectos" 
              :key="index" 
              :project="proyecto" 
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
/* Mantén tu CSS existente aquí (animated-bg, smooth scroll, body) */
</style>