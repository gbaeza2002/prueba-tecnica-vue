import axios from 'axios'
import type { Post } from '../types/Post'

const BASE_URL = 'https://jsonplaceholder.typicode.com'

//Cliente Axios configurado para la API de JSONPlaceholder
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

//Obtiene todos los posts de la API
export const getAllPosts = async (): Promise<Post[]> => {
  try {
    const response = await apiClient.get<Post[]>('/posts')
    return response.data
  } catch (error) {
    console.error('Error al obtener los posts:', error)
    throw error
  }
}

//Obtiene un post específico por su ID
export const getPostById = async (id: number): Promise<Post> => {
  try {
    const response = await apiClient.get<Post>(`/posts/${id}`)
    return response.data
  } catch (error) {
    console.error(`Error al obtener el post con ID ${id}:`, error)
    throw error
  }
}
