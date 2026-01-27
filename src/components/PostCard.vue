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
    class="group relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-slate-700/50 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10"
  >
    <!-- Decorador superior -->
    <div
      class="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
    ></div>

    <!-- ID Badge -->
    <span
      class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-mono mb-4"
    >
      {{ post.id }}
    </span>

    <!-- Título -->
    <h3
      class="text-lg font-semibold text-slate-100 mb-3 line-clamp-2 group-hover:text-emerald-300 transition-colors duration-300"
    >
      {{ post.title }}
    </h3>

    <!-- Descripción -->
    <p class="text-slate-400 text-sm leading-relaxed mb-5 line-clamp-3">
      {{ post.body }}
    </p>

    <!-- Botón -->
    <button
      @click="emit('viewDetails', post.id)"
      class="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-white rounded-lg font-medium text-sm transition-all duration-300 border border-emerald-500/30 hover:border-emerald-500"
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
