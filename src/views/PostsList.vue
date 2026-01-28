<script setup lang="ts">
import { onMounted } from 'vue'
import { usePostsStore } from '../store/postsStore'
import PostCard from '../components/PostCard.vue'
import SearchBar from '../components/SearchBar.vue'
import EmptyState from '../components/EmptyState.vue'
import logoImg from '../assets/logo-header.png'

const store = usePostsStore()

const emit = defineEmits<{
  viewPost: [id: number]
}>()

onMounted(() => {
  if (!store.hasPosts) {
    store.fetchPosts()
  }
})

function handleViewDetails(id: number) {
  store.selectPost(id)
  emit('viewPost', id)
}
</script>

<template>
  <section class="w-full">
    <!-- Header -->
    <header class="text-center mb-12">
      <!-- Logo -->
      <img 
        :src="logoImg" 
        alt="Logo" 
        class="w-32 h-32 md:w-40 md:h-40 mx-auto mb-4 object-contain"
      />
      <h1
        class="text-4xl md:text-5xl font-bold text-sky-500 mb-4"
      >
        Artículos
      </h1>
      <p class="text-slate-600 text-lg max-w-2xl mx-auto">
        Explora nuestra colección de artículos. Haz clic en "Ver más detalles"
        para leer el contenido completo.
      </p>
    </header>

    <!-- Barra de búsqueda -->
    <div class="max-w-xl mx-auto mb-10">
      <SearchBar
        :model-value="store.searchQuery"
        @update:model-value="store.setSearchQuery"
        placeholder="Buscar artículos por título..."
        :results-count="store.filteredPosts.length"
        :show-results-count="true"
      />
    </div>

    <!-- Loading State -->
    <div
      v-if="store.isLoading"
      class="flex flex-col items-center justify-center py-20"
    >
      <div
        class="w-12 h-12 border-4 border-sky-200 border-t-sky-500 rounded-full animate-spin mb-4"
      ></div>
      <p class="text-slate-500">Cargando artículos...</p>
    </div>

    <!-- Error State -->
    <div
      v-else-if="store.error"
      class="bg-red-50 border border-red-200 rounded-2xl p-8 text-center max-w-md mx-auto"
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
        @click="store.fetchPosts()"
        class="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all duration-300"
      >
        Reintentar
      </button>
    </div>

    <!-- Posts Grid -->
    <template v-else>
      <div
        v-if="store.paginatedPosts.length > 0"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <PostCard
          v-for="post in store.paginatedPosts"
          :key="post.id"
          :post="post"
          @view-details="handleViewDetails"
        />
      </div>

      <!-- Empty State: sin resultados de búsqueda -->
      <EmptyState
        v-else-if="store.searchQuery"
        icon="search"
        title="No se encontraron artículos"
        subtitle="Intenta con otro término de búsqueda"
      />

      <!-- Empty State: sin posts -->
      <EmptyState
        v-else
        icon="empty"
        title="No hay artículos disponibles"
      />

      <!-- Paginación Mobile: Simple y compacta -->
      <nav
        v-if="store.totalPages > 1"
        class="flex sm:hidden items-center justify-center gap-3 mt-12"
      >
        <button
          @click="store.prevPage()"
          :disabled="!store.hasPrevPage"
          class="flex items-center justify-center w-12 h-12 rounded-xl border transition-all duration-300"
          :class="store.hasPrevPage 
            ? 'border-slate-300 text-slate-600 hover:border-sky-500 hover:text-sky-500 active:scale-95' 
            : 'border-slate-200 text-slate-300 cursor-not-allowed'"
          aria-label="Página anterior"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <!-- Indicador de página central -->
        <div class="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-slate-200 shadow-sm">
          <span class="text-sky-500 font-semibold">{{ store.currentPage }}</span>
          <span class="text-slate-400">/</span>
          <span class="text-slate-500">{{ store.totalPages }}</span>
        </div>

        <button
          @click="store.nextPage()"
          :disabled="!store.hasNextPage"
          class="flex items-center justify-center w-12 h-12 rounded-xl border transition-all duration-300"
          :class="store.hasNextPage 
            ? 'border-slate-300 text-slate-600 hover:border-sky-500 hover:text-sky-500 active:scale-95' 
            : 'border-slate-200 text-slate-300 cursor-not-allowed'"
          aria-label="Página siguiente"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </nav>

      <!-- Paginación Desktop: Con números de página -->
      <nav
        v-if="store.totalPages > 1"
        class="hidden sm:flex items-center justify-center gap-3 mt-12"
      >
        <!-- Botón Anterior -->
        <button
          @click="store.prevPage()"
          :disabled="!store.hasPrevPage"
          class="flex items-center justify-center gap-1.5 h-11 px-4 rounded-xl border transition-all duration-300"
          :class="store.hasPrevPage 
            ? 'border-slate-300 text-slate-600 hover:border-sky-500 hover:text-sky-500 active:scale-95' 
            : 'border-slate-200 text-slate-300 cursor-not-allowed'"
          aria-label="Página anterior"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          <span>Anterior</span>
        </button>

        <!-- Números de página -->
        <div class="flex items-center gap-1.5">
          <template v-for="page in store.totalPages" :key="page">
            <button
              v-if="page === 1 || page === store.totalPages || (page >= store.currentPage - 1 && page <= store.currentPage + 1)"
              @click="store.goToPage(page)"
              class="w-11 h-11 rounded-xl font-medium transition-all duration-300 active:scale-95"
              :class="page === store.currentPage 
                ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/30' 
                : 'text-slate-500 hover:bg-slate-100 hover:text-sky-500'"
            >
              {{ page }}
            </button>
            <span
              v-else-if="page === store.currentPage - 2 || page === store.currentPage + 2"
              class="w-10 h-11 flex items-center justify-center text-slate-400"
            >
              ...
            </span>
          </template>
        </div>

        <!-- Botón Siguiente -->
        <button
          @click="store.nextPage()"
          :disabled="!store.hasNextPage"
          class="flex items-center justify-center gap-1.5 h-11 px-4 rounded-xl border transition-all duration-300"
          :class="store.hasNextPage 
            ? 'border-slate-300 text-slate-600 hover:border-sky-500 hover:text-sky-500 active:scale-95' 
            : 'border-slate-200 text-slate-300 cursor-not-allowed'"
          aria-label="Página siguiente"
        >
          <span>Siguiente</span>
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </nav>

      <!-- Info de paginación -->
      <p v-if="store.totalPages > 1" class="text-center text-slate-500 text-sm mt-4">
        {{ store.filteredPosts.length }} artículo(s) en total
      </p>
    </template>
  </section>
</template>
