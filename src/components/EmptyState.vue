<script setup lang="ts">
type IconType = 'search' | 'empty' | 'error'

interface Props {
  icon?: IconType
  title: string
  subtitle?: string
}

withDefaults(defineProps<Props>(), {
  icon: 'empty',
  subtitle: '',
})
</script>

<template>
  <div class="text-center py-20">
    <!-- Ícono de búsqueda sin resultados -->
    <svg
      v-if="icon === 'search'"
      class="w-16 h-16 text-slate-300 mx-auto mb-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>

    <!-- Ícono de caja vacía -->
    <svg
      v-else-if="icon === 'empty'"
      class="w-16 h-16 text-slate-300 mx-auto mb-4"
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

    <!-- Ícono de error -->
    <svg
      v-else-if="icon === 'error'"
      class="w-16 h-16 text-slate-300 mx-auto mb-4"
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

    <!-- Título -->
    <p class="text-slate-600 mb-2">{{ title }}</p>
    
    <!-- Subtítulo opcional -->
    <p v-if="subtitle" class="text-slate-400 text-sm">{{ subtitle }}</p>

    <!-- Slot para contenido adicional (botones, etc.) -->
    <div v-if="$slots.default" class="mt-4">
      <slot />
    </div>
  </div>
</template>
