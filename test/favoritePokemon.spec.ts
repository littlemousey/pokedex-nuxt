// @vitest-environment nuxt
import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { MAX_FAVORITES, useFavoritePokemonStore } from '../app/stores/favoritePokemon'

beforeEach(() => {
  setActivePinia(createPinia())
})

const names = Array.from({ length: MAX_FAVORITES }, (_, i) => `pokemon-${i}`)

describe('favoritePokemon store', () => {
  it('starts empty', () => {
    const store = useFavoritePokemonStore()
    expect(store.count).toBe(0)
    expect(store.isFull).toBe(false)
    expect(store.remaining).toBe(MAX_FAVORITES)
  })

  it('adds a favourite', () => {
    const store = useFavoritePokemonStore()
    expect(store.addFavorite('pikachu')).toBe(true)
    expect(store.favorites).toEqual(['pikachu'])
    expect(store.isFavorite('pikachu')).toBe(true)
  })

  it('refuses duplicates', () => {
    const store = useFavoritePokemonStore()
    store.addFavorite('pikachu')
    expect(store.addFavorite('pikachu')).toBe(false)
    expect(store.count).toBe(1)
  })

  it(`enforces the cap of ${MAX_FAVORITES}`, () => {
    const store = useFavoritePokemonStore()
    for (const name of names) store.addFavorite(name)

    expect(store.count).toBe(MAX_FAVORITES)
    expect(store.isFull).toBe(true)
    expect(store.remaining).toBe(0)
    expect(store.addFavorite('one-too-many')).toBe(false)
    expect(store.count).toBe(MAX_FAVORITES)
  })

  it('deletes by name rather than by index', () => {
    // The Nuxt 2 version passed an array index through an event, which went
    // stale if the list changed between render and click.
    const store = useFavoritePokemonStore()
    store.addFavorite('pikachu')
    store.addFavorite('bulbasaur')

    store.deleteFavorite('pikachu')
    expect(store.favorites).toEqual(['bulbasaur'])
  })

  it('ignores a delete for something not in the list', () => {
    const store = useFavoritePokemonStore()
    store.addFavorite('pikachu')
    store.deleteFavorite('mewtwo')
    expect(store.favorites).toEqual(['pikachu'])
  })

  describe('toggleFavorite', () => {
    it('reports added, then removed', () => {
      const store = useFavoritePokemonStore()
      expect(store.toggleFavorite('pikachu')).toBe('added')
      expect(store.toggleFavorite('pikachu')).toBe('removed')
      expect(store.count).toBe(0)
    })

    it('reports rejected when the list is full', () => {
      const store = useFavoritePokemonStore()
      for (const name of names) store.addFavorite(name)
      expect(store.toggleFavorite('one-too-many')).toBe('rejected')
    })

    it('can still remove when the list is full', () => {
      const store = useFavoritePokemonStore()
      for (const name of names) store.addFavorite(name)
      expect(store.toggleFavorite(names[0]!)).toBe('removed')
      expect(store.isFull).toBe(false)
    })
  })

  it('erases the whole list', () => {
    const store = useFavoritePokemonStore()
    for (const name of names) store.addFavorite(name)
    store.eraseFavoritePokemonList()
    expect(store.favorites).toEqual([])
    expect(store.isFull).toBe(false)
  })
})
