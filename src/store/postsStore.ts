import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Post } from '../types/Post'
import { getAllPosts, getPostById } from '../api/postApi'

export const usePostsStore = defineStore('posts', () => {
  // Estado
  const posts = ref<Post[]>([])
  const selectedPost = ref<Post | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  
  // Estado para búsqueda y paginación
  const searchQuery = ref('')
  const currentPage = ref(1)
  const postsPerPage = ref(10)

  // Getters
  
  //filtra posts por título según el término de búsqueda
  const filteredPosts = computed(() => {
    if (!searchQuery.value.trim()) {
      return posts.value
    }
    const query = searchQuery.value.toLowerCase().trim()
    return posts.value.filter(post => 
      post.title.toLowerCase().includes(query)
    )
  })

  //calcula el total de páginas según los posts filtrados
  const totalPages = computed(() => 
    Math.ceil(filteredPosts.value.length / postsPerPage.value)
  )

  //obtiene los posts de la página actual (con filtro aplicado)
  const paginatedPosts = computed(() => {
    const start = (currentPage.value - 1) * postsPerPage.value
    const end = start + postsPerPage.value
    return filteredPosts.value.slice(start, end)
  })

  //indica si hay posts cargados
  const hasPosts = computed(() => posts.value.length > 0)

  //indica si hay una página siguiente
  const hasNextPage = computed(() => currentPage.value < totalPages.value)

  //indica si hay una página anterior
  const hasPrevPage = computed(() => currentPage.value > 1)

  // Actions
  
  //carga todos los posts desde la API
  async function fetchPosts() {
    isLoading.value = true
    error.value = null

    try {
      posts.value = await getAllPosts()
    } catch (e) {
      error.value = 'Error al cargar los posts. Por favor, intenta de nuevo.'
      console.error(e)
    } finally {
      isLoading.value = false
    }
  }

  //selecciona un post por su ID
  async function selectPost(id: number) {
    //buscar en posts ya cargados
    const existingPost = posts.value.find(post => post.id === id)
    
    if (existingPost) {
      selectedPost.value = existingPost
      return
    }

    //si no existe, obtener de la API
    isLoading.value = true
    error.value = null

    try {
      selectedPost.value = await getPostById(id)
    } catch (e) {
      error.value = `Error al cargar el post con ID ${id}.`
      console.error(e)
    } finally {
      isLoading.value = false
    }
  }

  //actualiza el término de búsqueda y resetea a la página 1
  function setSearchQuery(query: string) {
    searchQuery.value = query
    currentPage.value = 1
  }

  //navega a una página específica
  function goToPage(page: number) {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page
    }
  }

  //navega a la página siguiente
  function nextPage() {
    if (hasNextPage.value) {
      currentPage.value++
    }
  }

  //navega a la página anterior
  function prevPage() {
    if (hasPrevPage.value) {
      currentPage.value--
    }
  }

  //limpia el post seleccionado
  function clearSelectedPost() {
    selectedPost.value = null
  }

  //resetea el estado del store
  function resetStore() {
    posts.value = []
    selectedPost.value = null
    isLoading.value = false
    error.value = null
    searchQuery.value = ''
    currentPage.value = 1
  }

  return {
    //estado
    posts,
    selectedPost,
    isLoading,
    error,
    searchQuery,
    currentPage,
    postsPerPage,
    //getters
    filteredPosts,
    paginatedPosts,
    totalPages,
    hasPosts,
    hasNextPage,
    hasPrevPage,
    //actions
    fetchPosts,
    selectPost,
    setSearchQuery,
    goToPage,
    nextPage,
    prevPage,
    clearSelectedPost,
    resetStore,
  }
})
