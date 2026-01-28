<script setup lang="ts">
import type { Post } from '../types/Post'

interface Props {
  post: Post
}

defineProps<Props>()

const emit = defineEmits<{
  viewDetails: [id: number]
}>()
</script>

<template>
  <article
    class="group relative bg-white rounded-2xl p-6 border border-slate-200 hover:border-sky-300 transition-all duration-300 hover:shadow-lg hover:shadow-sky-100"
  >
    <!-- Decorador superior -->
    <div
      class="absolute top-0 left-6 right-6 h-1 bg-gradient-to-r from-transparent via-sky-500 to-transparent rounded-b-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
    ></div>

    <!-- ID Badge -->
    <span
      class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-sky-50 text-sky-500 text-sm font-medium mb-4"
    >
      {{ post.id }}
    </span>

    <!-- Título -->
    <h3
      class="text-lg font-semibold text-slate-800 mb-3 line-clamp-2 group-hover:text-sky-500 transition-colors duration-300"
    >
      {{ post.title }}
    </h3>

    <!-- Descripción -->
    <p class="text-slate-500 text-sm leading-relaxed mb-5 line-clamp-3">
      {{ post.body }}
    </p>

    <!-- Botón -->
    <button
      @click="emit('viewDetails', post.id)"
      class="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-3 sm:py-2.5 bg-sky-500 hover:bg-sky-600 text-white rounded-xl font-medium text-sm transition-all duration-300 shadow-md shadow-sky-200 hover:shadow-sky-300 active:scale-[0.98]"
    >
      Ver más detalles
      <svg
        class="w-4 h-4 transition-transform group-hover:translate-x-1"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 5l7 7-7 7"
        />
      </svg>
    </button>
  </article>
</template>
