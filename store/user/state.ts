export interface State {
  username: string
  loggedIn: boolean
}

const state = (): State => ({
  username: '',
  loggedIn: false
})

export default state
