<script setup lang="ts">
interface Props {
  modelValue: string
  placeholder?: string
  resultsCount?: number
  showResultsCount?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Buscar...',
  resultsCount: 0,
  showResultsCount: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}

function clearSearch() {
  emit('update:modelValue', '')
}
</script>

<template>
  <div class="w-full">
    <div class="relative">
      <input
        type="text"
        :value="modelValue"
        @input="handleInput"
        :placeholder="placeholder"
        class="w-full px-5 py-4 pl-12 bg-slate-800/50 border border-slate-700/50 rounded-2xl text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300"
      />
      <!-- Ícono de búsqueda -->
      <svg
        class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <!-- Botón limpiar búsqueda -->
      <button
        v-if="modelValue"
        @click="clearSearch"
        class="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full bg-slate-700 hover:bg-slate-600 text-slate-400 hover:text-slate-200 transition-colors"
        aria-label="Limpiar búsqueda"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
    <!-- Contador de resultados -->
    <p
      v-if="showResultsCount && modelValue"
      class="text-sm text-slate-500 mt-3 text-center"
    >
      {{ resultsCount }} resultado(s) encontrado(s)
    </p>
  </div>
</template>
