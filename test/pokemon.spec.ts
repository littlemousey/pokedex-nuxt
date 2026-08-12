import { describe, expect, it } from 'vitest'
import { capitalize, idFromResourceUrl, spriteUrl } from '../app/utils/pokemon'

describe('idFromResourceUrl', () => {
  it('extracts the id from a PokéAPI resource url', () => {
    expect(idFromResourceUrl('https://pokeapi.co/api/v2/pokemon/25/')).toBe(25)
  })

  it('handles a url with no trailing slash', () => {
    expect(idFromResourceUrl('https://pokeapi.co/api/v2/pokemon/151')).toBe(151)
  })

  it('handles species urls too', () => {
    expect(idFromResourceUrl('https://pokeapi.co/api/v2/pokemon-species/3/')).toBe(3)
  })

  it('returns 0 for a url with no id', () => {
    expect(idFromResourceUrl('https://pokeapi.co/api/v2/pokemon/')).toBe(0)
  })

  /**
   * The Nuxt 2 list used the array index + 1 as the sprite id, which was only
   * correct because the list was the first 151 in order. Reading the id from
   * the url survives an offset or reordered list.
   */
  it('does not depend on list position', () => {
    const offsetList = [
      { name: 'chikorita', url: 'https://pokeapi.co/api/v2/pokemon/152/' },
      { name: 'bayleef', url: 'https://pokeapi.co/api/v2/pokemon/153/' }
    ]
    expect(offsetList.map((p) => idFromResourceUrl(p.url))).toEqual([152, 153])
  })
})

describe('spriteUrl', () => {
  it('builds the PokeAPI sprite url', () => {
    expect(spriteUrl(25)).toBe(
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png'
    )
  })
})

describe('capitalize', () => {
  it('uppercases the first letter', () => {
    expect(capitalize('pikachu')).toBe('Pikachu')
  })

  it('leaves an empty string alone', () => {
    expect(capitalize('')).toBe('')
  })
})
