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

  // Getters
  
  //obtiene los primeros 10 posts
  const firstTenPosts = computed(() => posts.value.slice(0, 10))

  //indica si hay posts cargados
  const hasPosts = computed(() => posts.value.length > 0)

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
  }

  return {
    //estado
    posts,
    selectedPost,
    isLoading,
    error,
    //getters
    firstTenPosts,
    hasPosts,
    //actions
    fetchPosts,
    selectPost,
    clearSelectedPost,
    resetStore,
  }
})
