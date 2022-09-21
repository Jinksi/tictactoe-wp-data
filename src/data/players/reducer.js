import TYPES from './action-types'
const { SET_PLAYERS } = TYPES

const initialState = {
  players: [],
}

const reducer = (
  // Receives current state as the first param or falls back to empty state
  state = initialState,
  // Receives an action as the second param
  action
) => {
  const { player1, player2 } = action.data || {}

  // Create a switch statement to handle each action type
  switch (action.type) {
    case SET_PLAYERS:
      // Return a new state object with the updated players array
      const key = `${player1.login}-${player2.login}`.toLocaleLowerCase()
      return {
        ...state,
        [key]: [player1, player2],
      }

    default:
      return state
  }
}

export default reducer
