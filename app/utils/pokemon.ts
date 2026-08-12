import type { PokemonListEntry } from '~/types/pokemon'

const SPRITE_BASE =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon'

/**
 * Pull the numeric id out of a PokéAPI resource URL, e.g.
 * `https://pokeapi.co/api/v2/pokemon/25/` -> 25.
 *
 * The Nuxt 2 version used the array index instead, which only worked because
 * the list happened to be the first 151 in order.
 */
export function idFromResourceUrl(url: string): number {
  const match = url.match(/\/(\d+)\/?$/)
  return match?.[1] ? Number(match[1]) : 0
}

export function spriteUrl(id: number): string {
  return `${SPRITE_BASE}/${id}.png`
}

export function capitalize(name: string): string {
  return name.charAt(0).toUpperCase() + name.slice(1)
}

export function pokemonId(pokemon: PokemonListEntry): number {
  return idFromResourceUrl(pokemon.url)
}
