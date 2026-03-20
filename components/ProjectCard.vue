<script setup lang="ts">
// Definimos la interfaz para los datos del proyecto
interface Project {
  title: string;
  description: string;
  icon: string; // Clase de FontAwesome, ej: 'fa-brands fa-python'
  iconColor: string; // Clase de Tailwind para el color, ej: 'text-yellow-500'
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
}

// Definimos la prop que recibirá el componente
defineProps<{
  project: Project;
}>();
</script>

<template>
  <div class="flex flex-col bg-white/50 dark:bg-slate-900/40 backdrop-blur-lg border border-gray-200 dark:border-white/10 rounded-3xl p-6 shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-cyan-500/10 dark:hover:shadow-cyan-500/20 hover:border-indigo-300 dark:hover:border-cyan-500/50 ring-1 ring-gray-100 dark:ring-transparent h-full">
    
    <div class="flex items-center gap-4 mb-5">
      <div class="p-3 rounded-xl bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center w-14 h-14">
        <i :class="[project.icon, project.iconColor, 'text-3xl']"></i>
      </div>
      <h3 class="text-2xl font-semibold text-gray-800 dark:text-white tracking-tight">
        {{ project.title }}
      </h3>
    </div>

    <p class="text-gray-600 dark:text-gray-300 mb-6 text-sm leading-relaxed flex-grow">
      {{ project.description }}
    </p>

    <div class="flex flex-wrap gap-2 mb-6">
      <span 
        v-for="tag in project.tags" 
        :key="tag"
        class="text-xs font-medium px-3 py-1 rounded-full bg-indigo-50 dark:bg-slate-800 text-indigo-700 dark:text-cyan-300 border border-indigo-100 dark:border-slate-700"
      >
        {{ tag }}
      </span>
    </div>

    <div class="grid grid-cols-2 gap-3 mt-auto border-t border-gray-200 dark:border-gray-800 pt-5">
      <a 
        v-if="project.githubUrl"
        :href="project.githubUrl" 
        target="_blank"
        class="flex items-center justify-center gap-2 text-sm font-medium py-2.5 px-4 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-white transition-colors border border-gray-200 dark:border-gray-700"
      >
        <i class="fa-brands fa-github text-base"></i>
        Código
      </a>
      <a 
        v-if="project.liveUrl"
        :href="project.liveUrl" 
        target="_blank"
        class="flex items-center justify-center gap-2 text-sm font-medium py-2.5 px-4 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-cyan-500 dark:to-blue-600 hover:opacity-90 text-white transition-opacity shadow"
      >
        <i class="fa-solid fa-rocket text-base"></i>
        Demo
      </a>
    </div>
  </div>
</template>