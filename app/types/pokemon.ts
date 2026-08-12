/**
 * The subset of the PokéAPI (https://pokeapi.co/docs/v2) response shapes this
 * app actually consumes.
 */

/** An entry in the paginated `/pokemon` list resource. */
export interface PokemonListEntry {
  name: string
  url: string
}

export interface PokemonListResponse {
  count: number
  next: string | null
  previous: string | null
  results: PokemonListEntry[]
}

export interface NamedApiResource {
  name: string
  url: string
}

export interface PokemonType {
  slot: number
  type: NamedApiResource
}

/** The `/pokemon/{id}` resource. */
export interface Pokemon {
  id: number
  name: string
  types: PokemonType[]
  species: NamedApiResource
  sprites: {
    front_default: string | null
  }
  /**
   * PokéAPI serves cries directly since 2024, which replaces the third-party
   * pokemoncries.com URLs the Nuxt 2 version built by hand.
   */
  cries: {
    latest: string | null
    legacy: string | null
  }
}

export interface FlavorTextEntry {
  flavor_text: string
  language: NamedApiResource
  version: NamedApiResource
}

/** The `/pokemon-species/{id}` resource. */
export interface PokemonSpecies {
  capture_rate: number
  flavor_text_entries: FlavorTextEntry[]
}

/** A list entry decorated with the derived values the UI needs. */
export interface PokemonListItem extends PokemonListEntry {
  id: number
  displayName: string
  spriteUrl: string
  isFavorite: boolean
}
