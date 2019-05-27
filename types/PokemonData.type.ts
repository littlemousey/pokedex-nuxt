export default interface PokemonData {
  abilities: Ability[]
  base_experience: number
  forms: Form[]
  game_indices: GameIndice[]
  height: number
  held_items: HeldItem[]
  id: number
  is_default: boolean
  location_area_encounters: string
  moves: Move[]
  name: string
  order: number
  species: Species
  sprites: Sprites
  stats: Stat[]
  types: Type[]
  weight: number
}

interface Ability {
  ability: {
    name: string
    url: string
  }
  is_hidden: boolean
  slot: number
}

interface Form {
  name: string
  url: string
}

interface GameIndice {
  game_index: number
  version: {
    name: string
    url: string
  }
}

interface HeldItem {
  item: {
    name: string
    url: string
  }
  version_details: object
}

interface MoveLearnMethod {
  name: string
  url: string
}

interface VersionGroup {
  name: string
  url: string
}

interface VersionGroupDetail {
  level_learned_at: number
  move_learn_method: MoveLearnMethod
  version_group: VersionGroup
}

interface Move {
  move: {
    name: string
    url: string
  }
  version_group_details: VersionGroupDetail[]
}

interface Species {
  name: string
  url: string
}

interface Sprites {
  back_default: string
  back_female?: any
  back_shiny: string
  back_shiny_female?: any
  front_default: string
  front_female?: any
  front_shiny: string
  front_shiny_female?: any
}

interface Stat {
  base_stat: number
  effort: number
  stat: {
    name: string
    url: string
  }
}

interface Type {
  slot: number
  type: {
    name: string
    url: string
  }
}
