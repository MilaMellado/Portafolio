<script setup lang="ts">
// Definimos la estructura que debe recibir el componente
defineProps<{
  project: {
    title: string;
    description: string;
    icon: string;
    iconColor: string;
    tags: string[];
    github?: string;
  }
}>();
</script>

<template>
  <div v-if="project" class="flex flex-col bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-3xl p-6 shadow-2xl transform transition-all hover:scale-105 duration-300 h-full">
    
    <div class="flex items-center gap-4 mb-4">
      <div class="p-3 rounded-full bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-gray-700">
        <i :class="[project.icon, project.iconColor, 'text-xl']"></i>
      </div>
      <h3 class="text-2xl font-bold tracking-tight text-gray-800 dark:text-white">{{ project.title }}</h3>
    </div>

    <p class="text-gray-600 dark:text-gray-300 flex-grow mb-6 text-sm">{{ project.description }}</p>

    <div class="flex flex-wrap gap-2 mb-6">
      <span v-for="tag in project.tags" :key="tag" class="px-3 py-1 text-xs font-medium rounded-full bg-indigo-50 dark:bg-blue-950 text-indigo-700 dark:text-blue-300 border border-indigo-200 dark:border-blue-700">
        {{ tag }}
      </span>
    </div>

    <div class="grid grid-cols-2 gap-3 mt-auto">
      <a :href="project.github || '#'" class="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-white py-2.5 px-4 rounded-xl transition duration-200 text-sm font-semibold border border-gray-200 dark:border-gray-700">
        <i class="fa-brands fa-github"></i> GitHub
      </a>
      <button class="flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-cyan-500 dark:to-blue-600 hover:opacity-90 text-white py-2.5 px-4 rounded-xl transition duration-200 shadow text-sm font-semibold">
        <i class="fa-solid fa-rocket"></i> Demo
      </button>
    </div>
  </div>
</template>