import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SearchBar from '../SearchBar.vue'

describe('SearchBar', () => {
  it('debería renderizar correctamente', () => {
    const wrapper = mount(SearchBar, {
      props: { modelValue: '' },
    })

    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('input').exists()).toBe(true)
  })

  it('debería mostrar el placeholder personalizado', () => {
    const wrapper = mount(SearchBar, {
      props: { 
        modelValue: '',
        placeholder: 'Buscar artículos...',
      },
    })

    expect(wrapper.find('input').attributes('placeholder')).toBe('Buscar artículos...')
  })

  it('debería mostrar el valor del modelValue', () => {
    const wrapper = mount(SearchBar, {
      props: { modelValue: 'test search' },
    })

    expect((wrapper.find('input').element as HTMLInputElement).value).toBe('test search')
  })

  it('debería emitir update:modelValue al escribir', async () => {
    const wrapper = mount(SearchBar, {
      props: { modelValue: '' },
    })

    await wrapper.find('input').setValue('nueva búsqueda')

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['nueva búsqueda'])
  })

  it('debería mostrar el botón de limpiar cuando hay texto', () => {
    const wrapper = mount(SearchBar, {
      props: { modelValue: 'texto' },
    })

    const clearButton = wrapper.find('button')
    expect(clearButton.exists()).toBe(true)
  })

  it('no debería mostrar el botón de limpiar cuando está vacío', () => {
    const wrapper = mount(SearchBar, {
      props: { modelValue: '' },
    })

    const clearButton = wrapper.find('button')
    expect(clearButton.exists()).toBe(false)
  })

  it('debería emitir string vacío al hacer clic en limpiar', async () => {
    const wrapper = mount(SearchBar, {
      props: { modelValue: 'texto' },
    })

    await wrapper.find('button').trigger('click')

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual([''])
  })

  it('debería mostrar contador de resultados cuando showResultsCount es true', () => {
    const wrapper = mount(SearchBar, {
      props: { 
        modelValue: 'búsqueda',
        showResultsCount: true,
        resultsCount: 5,
      },
    })

    expect(wrapper.text()).toContain('5 resultado(s) encontrado(s)')
  })

  it('no debería mostrar contador cuando showResultsCount es false', () => {
    const wrapper = mount(SearchBar, {
      props: { 
        modelValue: 'búsqueda',
        showResultsCount: false,
        resultsCount: 5,
      },
    })

    expect(wrapper.text()).not.toContain('resultado(s)')
  })

  it('no debería mostrar contador cuando no hay búsqueda', () => {
    const wrapper = mount(SearchBar, {
      props: { 
        modelValue: '',
        showResultsCount: true,
        resultsCount: 10,
      },
    })

    expect(wrapper.text()).not.toContain('resultado(s)')
  })
})
