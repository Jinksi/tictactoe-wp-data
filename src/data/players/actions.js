import TYPES from './action-types'

export const setPlayers = ({ player1, player2 }) => {
  return {
    type: TYPES.SET_PLAYERS,
    data: {
      player1,
      player2,
    },
  }
}
