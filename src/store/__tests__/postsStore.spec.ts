import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { usePostsStore } from '../postsStore'
import * as postApi from '../../api/postApi'
import type { Post } from '../../types/Post'

// Mock de la API
vi.mock('../../api/postApi')

const mockPosts: Post[] = [
  { id: 1, userId: 1, title: 'Post 1', body: 'Body 1' },
  { id: 2, userId: 1, title: 'Post 2', body: 'Body 2' },
  { id: 3, userId: 2, title: 'Another title', body: 'Body 3' },
  { id: 4, userId: 2, title: 'Post 4', body: 'Body 4' },
  { id: 5, userId: 3, title: 'Post 5', body: 'Body 5' },
  { id: 6, userId: 3, title: 'Post 6', body: 'Body 6' },
  { id: 7, userId: 4, title: 'Post 7', body: 'Body 7' },
  { id: 8, userId: 4, title: 'Post 8', body: 'Body 8' },
  { id: 9, userId: 5, title: 'Post 9', body: 'Body 9' },
  { id: 10, userId: 5, title: 'Post 10', body: 'Body 10' },
  { id: 11, userId: 6, title: 'Post 11', body: 'Body 11' },
  { id: 12, userId: 6, title: 'Post 12', body: 'Body 12' },
]

describe('postsStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  describe('Estado inicial', () => {
    it('debería tener el estado inicial correcto', () => {
      const store = usePostsStore()

      expect(store.posts).toEqual([])
      expect(store.selectedPost).toBeNull()
      expect(store.isLoading).toBe(false)
      expect(store.error).toBeNull()
      expect(store.searchQuery).toBe('')
      expect(store.currentPage).toBe(1)
      expect(store.postsPerPage).toBe(10)
    })
  })

  describe('fetchPosts', () => {
    it('debería cargar los posts correctamente', async () => {
      vi.mocked(postApi.getAllPosts).mockResolvedValue(mockPosts)
      const store = usePostsStore()

      await store.fetchPosts()

      expect(store.posts).toEqual(mockPosts)
      expect(store.isLoading).toBe(false)
      expect(store.error).toBeNull()
    })

    it('debería manejar errores al cargar posts', async () => {
      vi.mocked(postApi.getAllPosts).mockRejectedValue(new Error('API Error'))
      const store = usePostsStore()

      await store.fetchPosts()

      expect(store.posts).toEqual([])
      expect(store.error).toBe('Error al cargar los posts. Por favor, intenta de nuevo.')
      expect(store.isLoading).toBe(false)
    })
  })

  describe('Búsqueda', () => {
    it('debería filtrar posts por título', async () => {
      vi.mocked(postApi.getAllPosts).mockResolvedValue(mockPosts)
      const store = usePostsStore()
      await store.fetchPosts()

      store.setSearchQuery('Another')

      expect(store.filteredPosts.length).toBe(1)
      expect(store.filteredPosts[0]?.title).toBe('Another title')
    })

    it('debería mostrar todos los posts si la búsqueda está vacía', async () => {
      vi.mocked(postApi.getAllPosts).mockResolvedValue(mockPosts)
      const store = usePostsStore()
      await store.fetchPosts()

      store.setSearchQuery('')

      expect(store.filteredPosts.length).toBe(mockPosts.length)
    })

    it('debería ser case-insensitive en la búsqueda', async () => {
      vi.mocked(postApi.getAllPosts).mockResolvedValue(mockPosts)
      const store = usePostsStore()
      await store.fetchPosts()

      store.setSearchQuery('ANOTHER')

      expect(store.filteredPosts.length).toBe(1)
    })

    it('debería resetear a página 1 al buscar', async () => {
      vi.mocked(postApi.getAllPosts).mockResolvedValue(mockPosts)
      const store = usePostsStore()
      await store.fetchPosts()
      store.goToPage(2)

      store.setSearchQuery('Post')

      expect(store.currentPage).toBe(1)
    })
  })

  describe('Paginación', () => {
    it('debería calcular el total de páginas correctamente', async () => {
      vi.mocked(postApi.getAllPosts).mockResolvedValue(mockPosts)
      const store = usePostsStore()
      await store.fetchPosts()

      // 12 posts / 10 por página = 2 páginas
      expect(store.totalPages).toBe(2)
    })

    it('debería devolver posts paginados correctamente', async () => {
      vi.mocked(postApi.getAllPosts).mockResolvedValue(mockPosts)
      const store = usePostsStore()
      await store.fetchPosts()

      // Página 1: primeros 10 posts
      expect(store.paginatedPosts.length).toBe(10)
      expect(store.paginatedPosts[0]?.id).toBe(1)

      // Página 2: últimos 2 posts
      store.goToPage(2)
      expect(store.paginatedPosts.length).toBe(2)
      expect(store.paginatedPosts[0]?.id).toBe(11)
    })

    it('debería navegar a la página siguiente', async () => {
      vi.mocked(postApi.getAllPosts).mockResolvedValue(mockPosts)
      const store = usePostsStore()
      await store.fetchPosts()

      store.nextPage()

      expect(store.currentPage).toBe(2)
    })

    it('debería navegar a la página anterior', async () => {
      vi.mocked(postApi.getAllPosts).mockResolvedValue(mockPosts)
      const store = usePostsStore()
      await store.fetchPosts()
      store.goToPage(2)

      store.prevPage()

      expect(store.currentPage).toBe(1)
    })

    it('no debería ir más allá de la última página', async () => {
      vi.mocked(postApi.getAllPosts).mockResolvedValue(mockPosts)
      const store = usePostsStore()
      await store.fetchPosts()
      store.goToPage(2)

      store.nextPage()

      expect(store.currentPage).toBe(2)
    })

    it('no debería ir antes de la primera página', async () => {
      vi.mocked(postApi.getAllPosts).mockResolvedValue(mockPosts)
      const store = usePostsStore()
      await store.fetchPosts()

      store.prevPage()

      expect(store.currentPage).toBe(1)
    })

    it('hasNextPage debería ser true si hay más páginas', async () => {
      vi.mocked(postApi.getAllPosts).mockResolvedValue(mockPosts)
      const store = usePostsStore()
      await store.fetchPosts()

      expect(store.hasNextPage).toBe(true)
    })

    it('hasPrevPage debería ser false en la primera página', async () => {
      vi.mocked(postApi.getAllPosts).mockResolvedValue(mockPosts)
      const store = usePostsStore()
      await store.fetchPosts()

      expect(store.hasPrevPage).toBe(false)
    })
  })

  describe('selectPost', () => {
    it('debería seleccionar un post existente', async () => {
      vi.mocked(postApi.getAllPosts).mockResolvedValue(mockPosts)
      const store = usePostsStore()
      await store.fetchPosts()

      await store.selectPost(1)

      expect(store.selectedPost).toEqual(mockPosts[0])
    })

    it('debería obtener el post de la API si no existe localmente', async () => {
      const singlePost: Post = { id: 99, userId: 1, title: 'New Post', body: 'New Body' }
      vi.mocked(postApi.getAllPosts).mockResolvedValue([])
      vi.mocked(postApi.getPostById).mockResolvedValue(singlePost)
      const store = usePostsStore()
      await store.fetchPosts()

      await store.selectPost(99)

      expect(postApi.getPostById).toHaveBeenCalledWith(99)
      expect(store.selectedPost).toEqual(singlePost)
    })
  })

  describe('clearSelectedPost', () => {
    it('debería limpiar el post seleccionado', async () => {
      vi.mocked(postApi.getAllPosts).mockResolvedValue(mockPosts)
      const store = usePostsStore()
      await store.fetchPosts()
      await store.selectPost(1)

      store.clearSelectedPost()

      expect(store.selectedPost).toBeNull()
    })
  })

  describe('resetStore', () => {
    it('debería resetear todo el estado', async () => {
      vi.mocked(postApi.getAllPosts).mockResolvedValue(mockPosts)
      const store = usePostsStore()
      await store.fetchPosts()
      store.setSearchQuery('test')
      store.goToPage(2)

      store.resetStore()

      expect(store.posts).toEqual([])
      expect(store.selectedPost).toBeNull()
      expect(store.searchQuery).toBe('')
      expect(store.currentPage).toBe(1)
    })
  })
})
