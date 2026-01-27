import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PostCard from '../PostCard.vue'
import type { Post } from '../../types/Post'

const mockPost: Post = {
  id: 1,
  userId: 1,
  title: 'Test Post Title',
  body: 'This is a test post body with some content.',
}

describe('PostCard', () => {
  it('debería renderizar correctamente', () => {
    const wrapper = mount(PostCard, {
      props: { post: mockPost },
    })

    expect(wrapper.exists()).toBe(true)
  })

  it('debería mostrar el ID del post', () => {
    const wrapper = mount(PostCard, {
      props: { post: mockPost },
    })

    expect(wrapper.text()).toContain('1')
  })

  it('debería mostrar el título del post', () => {
    const wrapper = mount(PostCard, {
      props: { post: mockPost },
    })

    expect(wrapper.text()).toContain('Test Post Title')
  })

  it('debería mostrar el body del post', () => {
    const wrapper = mount(PostCard, {
      props: { post: mockPost },
    })

    expect(wrapper.text()).toContain('This is a test post body')
  })

  it('debería emitir viewDetails con el ID al hacer clic en el botón', async () => {
    const wrapper = mount(PostCard, {
      props: { post: mockPost },
    })

    const button = wrapper.find('button')
    await button.trigger('click')

    expect(wrapper.emitted('viewDetails')).toBeTruthy()
    expect(wrapper.emitted('viewDetails')![0]).toEqual([1])
  })

  it('debería mostrar el texto "Ver más detalles" en el botón', () => {
    const wrapper = mount(PostCard, {
      props: { post: mockPost },
    })

    const button = wrapper.find('button')
    expect(button.text()).toContain('Ver más detalles')
  })
})
