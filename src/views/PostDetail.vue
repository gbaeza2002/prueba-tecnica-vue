<script setup lang="ts">
import { usePostsStore } from '../store/postsStore'

const store = usePostsStore()

const emit = defineEmits<{
  goBack: []
}>()

function handleGoBack() {
  store.clearSelectedPost()
  emit('goBack')
}
</script>

<template>
  <section class="w-full max-w-4xl mx-auto">
    <!-- Botón Volver -->
    <button
      @click="handleGoBack"
      class="inline-flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition-colors duration-300 mb-8 group"
    >
      <svg
        class="w-5 h-5 transition-transform group-hover:-translate-x-1"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M15 19l-7-7 7-7"
        />
      </svg>
      Volver a la lista
    </button>

    <!-- Loading State -->
    <div
      v-if="store.isLoading"
      class="flex flex-col items-center justify-center py-20"
    >
      <div
        class="w-12 h-12 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin mb-4"
      ></div>
      <p class="text-slate-400">Cargando artículo...</p>
    </div>

    <!-- Error State -->
    <div
      v-else-if="store.error"
      class="bg-red-500/10 border border-red-500/30 rounded-2xl p-8 text-center"
    >
      <svg
        class="w-12 h-12 text-red-400 mx-auto mb-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
      <p class="text-red-300 mb-4">{{ store.error }}</p>
      <button
        @click="handleGoBack"
        class="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg transition-all duration-300"
      >
        Volver a la lista
      </button>
    </div>

    <!-- Post Content -->
    <article
      v-else-if="store.selectedPost"
      class="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl border border-slate-700/50 overflow-hidden"
    >
      <!-- Header decorativo -->
      <div
        class="h-2 bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500"
      ></div>

      <div class="p-8 md:p-12">
        <!-- Meta info -->
        <div class="flex items-center gap-4 mb-6">
          <span
            class="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-mono"
          >
            Post #{{ store.selectedPost.id }}
          </span>
          <span
            class="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-slate-700/50 text-slate-400 text-sm"
          >
            Usuario {{ store.selectedPost.userId }}
          </span>
        </div>

        <!-- Título -->
        <h1
          class="text-3xl md:text-4xl font-bold text-slate-100 mb-8 leading-tight"
        >
          {{ store.selectedPost.title }}
        </h1>

        <!-- Separador -->
        <div
          class="w-24 h-1 bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full mb-8"
        ></div>

        <!-- Contenido -->
        <div class="prose prose-invert prose-lg max-w-none">
          <p class="text-slate-300 leading-relaxed text-lg whitespace-pre-line">
            {{ store.selectedPost.body }}
          </p>
        </div>

        <!-- Footer -->
        <div
          class="mt-12 pt-8 border-t border-slate-700/50 flex items-center justify-between"
        >
          <div class="text-slate-500 text-sm">
            Artículo completo
          </div>
          <button
            @click="handleGoBack"
            class="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-white rounded-xl font-medium transition-all duration-300 border border-emerald-500/30 hover:border-emerald-500"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Volver a artículos
          </button>
        </div>
      </div>
    </article>

    <!-- No Post Selected -->
    <div
      v-else
      class="text-center py-20"
    >
      <svg
        class="w-16 h-16 text-slate-600 mx-auto mb-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
      <p class="text-slate-500 mb-4">No hay artículo seleccionado</p>
      <button
        @click="handleGoBack"
        class="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg transition-all duration-300"
      >
        Ver todos los artículos
      </button>
    </div>
  </section>
</template>
