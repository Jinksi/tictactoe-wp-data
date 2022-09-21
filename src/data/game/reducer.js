import TYPES from './action-types'
import { CELL_VALUES, generateInitialBoard } from './utils'
const { RESET_BOARD, SET_CELL, SET_WINNER, SET_IS_DRAW } = TYPES

const initialState = {
  board: generateInitialBoard(),
  winner: CELL_VALUES.Empty, // X or O,
  isDraw: false,
}
// A reducer is a pure function
// - accepts the previous `state` and an `action` as arguments
// - returns an updated `state` value.

const reducer = (
  // Receives current state as the first param or falls back to empty state
  state = initialState,
  // Receives an action as the second param
  action
) => {
  const { cellKey, cellValue, isDraw } = action?.data || {}
  // Create a switch statement to handle each action type
  switch (action.type) {
    case RESET_BOARD:
      return {
        ...state,
        board: generateInitialBoard(),
      }

    case SET_CELL:
      // Return if cell already has a value (or is undefined)
      if (state.board[cellKey] !== CELL_VALUES.Empty) return state

      // Return if cell value is not valid
      if (!Object.values(CELL_VALUES).includes(cellValue)) return state

      return {
        ...state,
        board: {
          ...state.board,
          [cellKey]: cellValue,
        },
      }

    case SET_WINNER:
      // Return if cell value is not valid
      if (!Object.values(CELL_VALUES).includes(cellValue)) return state

      return {
        ...state,
        winner: cellValue,
      }

    case SET_IS_DRAW:
      return {
        ...state,
        isDraw,
      }

    default:
      return state
  }
}

export default reducer
