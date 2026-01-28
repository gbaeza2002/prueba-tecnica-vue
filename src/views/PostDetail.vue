<script setup lang="ts">
import { ref } from 'vue'
import { usePostsStore } from '../store/postsStore'
import gifImage from '../assets/200w.gif'

const store = usePostsStore()
const isImageLoaded = ref(false)

const emit = defineEmits<{
  goBack: []
}>()

function handleGoBack() {
  store.clearSelectedPost()
  emit('goBack')
}

function onImageLoad() {
  isImageLoaded.value = true
}
</script>

<template>
  <section class="w-full max-w-4xl mx-auto">
    <!-- Botón Volver -->
    <button
      @click="handleGoBack"
      class="inline-flex items-center gap-2 px-4 py-3 sm:py-2 text-slate-600 hover:text-sky-500 hover:bg-white rounded-xl transition-all duration-300 mb-6 sm:mb-8 group active:scale-[0.98]"
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
        class="w-12 h-12 border-4 border-sky-200 border-t-sky-500 rounded-full animate-spin mb-4"
      ></div>
      <p class="text-slate-500">Cargando artículo...</p>
    </div>

    <!-- Error State -->
    <div
      v-else-if="store.error"
      class="bg-red-50 border border-red-200 rounded-2xl p-8 text-center"
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
      <p class="text-red-600 mb-4">{{ store.error }}</p>
      <button
        @click="handleGoBack"
        class="px-6 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-all duration-300"
      >
        Volver a la lista
      </button>
    </div>

    <!-- Post Content -->
    <article
      v-else-if="store.selectedPost"
      class="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-lg"
    >
      <!-- Header decorativo -->
      <div
        class="h-2 bg-gradient-to-r from-sky-400 via-sky-500 to-sky-600"
      ></div>

      <div class="p-8 md:p-12">
        <!-- Meta info -->
        <div class="flex flex-wrap items-center gap-2 sm:gap-4 mb-6">
          <span
            class="inline-flex items-center justify-center px-3 sm:px-4 py-1.5 rounded-full bg-sky-50 text-sky-500 text-xs sm:text-sm font-medium"
          >
            Post #{{ store.selectedPost.id }}
          </span>
          <span
            class="inline-flex items-center justify-center px-3 sm:px-4 py-1.5 rounded-full bg-slate-100 text-slate-600 text-xs sm:text-sm"
          >
            Usuario {{ store.selectedPost.userId }}
          </span>
        </div>

        <!-- Título -->
        <h1
          class="text-3xl md:text-4xl font-bold text-slate-800 mb-8 leading-tight"
        >
          {{ store.selectedPost.title }}
        </h1>

        <!-- Separador -->
        <div
          class="w-24 h-1 bg-gradient-to-r from-sky-400 to-sky-500 rounded-full mb-8"
        ></div>

        <!-- Contenido -->
        <div class="prose prose-lg max-w-none">
          <p class="text-slate-600 leading-relaxed text-lg whitespace-pre-line">
            {{ store.selectedPost.body }}
          </p>
        </div>

        <!-- Imagen GIF -->
        <div class="mt-8 flex justify-center">
          <div class="relative">
            <!-- Skeleton placeholder mientras carga -->
            <div 
              v-if="!isImageLoaded"
              class="w-64 h-48 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 rounded-xl animate-pulse flex items-center justify-center"
            >
              <div class="flex flex-col items-center gap-2">
                <svg 
                  class="w-10 h-10 text-slate-300 animate-bounce" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    stroke-linecap="round" 
                    stroke-linejoin="round" 
                    stroke-width="2" 
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span class="text-slate-400 text-sm">Cargando imagen...</span>
              </div>
            </div>
            <!-- Imagen real -->
            <img 
              :src="gifImage" 
              alt="Ilustración" 
              :class="[
                'rounded-xl max-w-full h-auto transition-all duration-500',
                isImageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95 absolute inset-0'
              ]"
              @load="onImageLoad"
            />
          </div>
        </div>

        <!-- Footer -->
        <div class="mt-12 pt-8 border-t border-slate-200">
          <p class="text-slate-400 text-sm text-center">
            Artículo completo
          </p>
        </div>
      </div>
    </article>

    <!-- No Post Selected -->
    <div
      v-else
      class="text-center py-20"
    >
      <svg
        class="w-16 h-16 text-slate-300 mx-auto mb-4"
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
        class="px-6 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-lg transition-all duration-300"
      >
        Ver todos los artículos
      </button>
    </div>
  </section>
</template>
