export interface State {
    stateCaughtPokemonList: Array<string>
  }
  
  const state = (): State => ({
    stateCaughtPokemonList: []
  })
  
  export default state
  