export function getPlayers(state, githubUsernames) {
  return state.players[githubUsernames.join('-')]
}
