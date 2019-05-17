<template>
  <div
    v-if="pokemonData && pokemonDescription"
    class="pokemon-card nes-container is-rounded"
  >
    <div>
      <img
        :src="
          `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
            pokemonData.id
          }.png`
        "
        :alt="pokemonData.name"
        class="pokemon-card__image"
      />
    </div>
    <div class="pokemon-card__text">
      <p>
        Name:
        <span class="pokemon-card__pokemon-name">{{ pokemonData.name }}</span>
      </p>
      <p>No. {{ pokemonData.id }}</p>
      <p>
        Type:
        <span
          v-for="(typesOfPokemon, index) in pokemonData.types"
          :key="`type${index}`"
        >
          {{ typesOfPokemon.type.name }}
        </span>
      </p>
      <p>{{ pokemonDescription[0].flavor_text }}</p>
      <div class="pokemon-card__practice-button">
        <router-link
          type="button"
          class="nes-btn is-primary"
          :to="`/capture/${pokemonData.id}`"
        >
          Catch
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PokemonCard',
  props: {
    pokemonName: {
      type: String,
      default: ''
    }
  },
  data: function() {
    return {
      pokemonData: null,
      pokemonDescription: null
    }
  },
  async created() {
    if (this.pokemonName) {
      this.pokemonData = await this.getDataSpecificPokemon(this.pokemonName)
      this.pokemonDescription = await this.getPokemonDescription(
        this.pokemonData
      )
    }
  },
  methods: {
    async getDataSpecificPokemon(name) {
      const data = await this.$axios.$get(
        `https://pokeapi.co/api/v2/pokemon/${name}/`
      )
      return data
    },
    async getPokemonDescription(pokemonData) {
      const data = await this.$axios.$get(`${pokemonData.species.url}`)
      return data.flavor_text_entries.filter(function(element) {
        return element.language.name === 'en'
      })
    }
  }
}
</script>

<style scoped>
.pokemon-card {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 10px;
}

.pokemon-card__practice-button {
  text-align: right;
}

.pokemon-card__image {
  height: 150px;
}

.pokemon-card__pokemon-name {
  text-transform: capitalize;
}
</style>
