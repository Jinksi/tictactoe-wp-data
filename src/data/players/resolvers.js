import { fetch } from './controls'
import { setPlayers } from './actions'

export function* getPlayers(githubUsernames) {
  const player1Path = `https://api.github.com/users/${githubUsernames[0]}`
  const player1 = yield fetch(player1Path)

  const player2Path = `https://api.github.com/users/${githubUsernames[1]}`
  const player2 = yield fetch(player2Path)

  if (player1 && player2) {
    return setPlayers({ player1, player2 })
  }
  return
}
