export const getBoard = (state) => {
  return state.game.board
}

export const getWinner = (state) => {
  return state.game.winner
}

export const getIsDraw = (state) => {
  return state.game.isDraw
}
