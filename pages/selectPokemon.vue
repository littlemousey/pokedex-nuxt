<template>
  <div class="select-pokemon-page">
    <img src="~/assets/logo.svg" alt="pokémon" />
    <div class="select-pokemon-content">
      <pokemon-list v-if="statePokemonDataList" class="select-pokemon-list" />
      <summary-favorites
        v-if="statePokemonDataList"
        class="select-pokemon-summary"
      />
    </div>
  </div>
</template>

<script>
import PokemonList from '@/components/PokemonList'
import SummaryFavorites from '@/components/SummaryFavorites'
import { mapState } from 'vuex'
export default {
  components: {
    PokemonList,
    SummaryFavorites
  },
  computed: {
    ...mapState(['statePokemonDataList'])
  }
}
</script>

<style scoped>
.select-pokemon-page {
  text-align: center;
}

.select-pokemon-content {
  text-align: left;
  display: flex;
  justify-content: space-evenly;
}
</style>
