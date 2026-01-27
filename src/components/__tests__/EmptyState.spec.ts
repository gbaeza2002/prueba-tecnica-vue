import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import EmptyState from '../EmptyState.vue'

describe('EmptyState', () => {
  it('debería renderizar correctamente', () => {
    const wrapper = mount(EmptyState, {
      props: { title: 'Sin resultados' },
    })

    expect(wrapper.exists()).toBe(true)
  })

  it('debería mostrar el título', () => {
    const wrapper = mount(EmptyState, {
      props: { title: 'No hay artículos' },
    })

    expect(wrapper.text()).toContain('No hay artículos')
  })

  it('debería mostrar el subtítulo cuando se proporciona', () => {
    const wrapper = mount(EmptyState, {
      props: { 
        title: 'Sin resultados',
        subtitle: 'Intenta otra búsqueda',
      },
    })

    expect(wrapper.text()).toContain('Intenta otra búsqueda')
  })

  it('no debería mostrar subtítulo cuando está vacío', () => {
    const wrapper = mount(EmptyState, {
      props: { title: 'Sin resultados' },
    })

    // Solo debe haber un párrafo (el título)
    const paragraphs = wrapper.findAll('p')
    expect(paragraphs.length).toBe(1)
  })

  it('debería mostrar ícono de búsqueda cuando icon es "search"', () => {
    const wrapper = mount(EmptyState, {
      props: { 
        title: 'Sin resultados',
        icon: 'search',
      },
    })

    const svg = wrapper.find('svg')
    expect(svg.exists()).toBe(true)
  })

  it('debería mostrar ícono de caja vacía cuando icon es "empty"', () => {
    const wrapper = mount(EmptyState, {
      props: { 
        title: 'Sin datos',
        icon: 'empty',
      },
    })

    const svg = wrapper.find('svg')
    expect(svg.exists()).toBe(true)
  })

  it('debería mostrar ícono de error cuando icon es "error"', () => {
    const wrapper = mount(EmptyState, {
      props: { 
        title: 'Ocurrió un error',
        icon: 'error',
      },
    })

    const svg = wrapper.find('svg')
    expect(svg.exists()).toBe(true)
  })

  it('debería renderizar contenido del slot', () => {
    const wrapper = mount(EmptyState, {
      props: { title: 'Sin resultados' },
      slots: {
        default: '<button>Acción</button>',
      },
    })

    expect(wrapper.text()).toContain('Acción')
    expect(wrapper.find('button').exists()).toBe(true)
  })
})
