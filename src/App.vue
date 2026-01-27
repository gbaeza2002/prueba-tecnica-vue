<script setup lang="ts">
import { ref } from 'vue'
import PostsList from './views/PostsList.vue'
import PostDetail from './views/PostDetail.vue'

type View = 'list' | 'detail'

const currentView = ref<View>('list')

function showPostDetail() {
  currentView.value = 'detail'
}

function showPostsList() {
  currentView.value = 'list'
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
    <!-- Patrón de fondo decorativo -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none">
      <div
        class="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl"
      ></div>
      <div
        class="absolute top-1/2 -left-40 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl"
      ></div>
      <div
        class="absolute -bottom-40 right-1/3 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl"
      ></div>
    </div>

    <!-- Contenido principal -->
    <main class="relative z-10 container mx-auto px-4 py-12 md:py-20">
      <!-- Transición entre vistas -->
      <Transition name="fade" mode="out-in">
        <PostsList
          v-if="currentView === 'list'"
          @view-post="showPostDetail"
        />
        <PostDetail
          v-else
          @go-back="showPostsList"
        />
      </Transition>
    </main>

    <!-- Footer -->
    <footer class="relative z-10 text-center py-8 text-slate-600 text-sm">
      <p>Graciany Baeza Jara - Full stack developer</p>
    </footer>
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
