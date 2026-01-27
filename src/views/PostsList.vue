<script setup lang="ts">
import { onMounted } from 'vue'
import { usePostsStore } from '../store/postsStore'
import PostCard from '../components/PostCard.vue'

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
      <h1
        class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent mb-4"
      >
        Artículos
      </h1>
      <p class="text-slate-400 text-lg max-w-2xl mx-auto">
        Explora nuestra colección de artículos. Haz clic en "Ver más detalles"
        para leer el contenido completo.
      </p>
    </header>

    <!-- Loading State -->
    <div
      v-if="store.isLoading"
      class="flex flex-col items-center justify-center py-20"
    >
      <div
        class="w-12 h-12 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin mb-4"
      ></div>
      <p class="text-slate-400">Cargando artículos...</p>
    </div>

    <!-- Error State -->
    <div
      v-else-if="store.error"
      class="bg-red-500/10 border border-red-500/30 rounded-2xl p-8 text-center max-w-md mx-auto"
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
        @click="store.fetchPosts()"
        class="px-6 py-2 bg-red-500/20 hover:bg-red-500 text-red-300 hover:text-white rounded-lg transition-all duration-300"
      >
        Reintentar
      </button>
    </div>

    <!-- Posts Grid -->
    <div
      v-else
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <PostCard
        v-for="post in store.firstTenPosts"
        :key="post.id"
        :post="post"
        @view-details="handleViewDetails"
      />
    </div>

    <!-- Empty State -->
    <div
      v-if="!store.isLoading && !store.error && store.firstTenPosts.length === 0"
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
          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
        />
      </svg>
      <p class="text-slate-500">No hay artículos disponibles</p>
    </div>
  </section>
</template>
