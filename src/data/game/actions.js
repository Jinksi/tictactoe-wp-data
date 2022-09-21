import { select } from '@wordpress/data'
import { STORE_NAME } from '..'

import TYPES from './action-types'
import { CELL_VALUES, checkIfWinner } from './utils'

// Action creator with no payload
// Using a generator function to yield side-effects
export function* resetBoard() {
  yield setIsDraw({ isDraw: false })
  yield setWinner({ cellValue: CELL_VALUES.Empty })

  return {
    // Action type
    type: TYPES.RESET_BOARD,
  }
}

// Action creator with payload
// This one is a generator function which allows us to use `yield` to
// dispatch other actions.
export function* setCell({
  cellKey, //
  cellValue, // X or O
}) {
  // Note we're returning the setCell action here first,
  // then calculating and dispatching setWinner and setIsDraw actions
  yield {
    // Action type
    type: TYPES.SET_CELL,
    // Action data
    data: {
      cellKey,
      cellValue,
    },
  }

  // Get the board to check for a winner
  const board = select(STORE_NAME).getBoard()
  const { winner, isDraw } = checkIfWinner({
    board,
    lastCellKey: cellKey,
    lastCellValue: cellValue,
  })

  if (winner !== CELL_VALUES.Empty) {
    yield setWinner({ cellValue: winner })
  }
  if (isDraw) {
    yield setIsDraw({ isDraw })
  }
}

export const setWinner = ({
  cellValue, // X or O
}) => {
  return {
    // Action type
    type: TYPES.SET_WINNER,
    // Action data
    data: {
      cellValue,
    },
  }
}

export const setIsDraw = ({ isDraw }) => {
  return {
    // Action type
    type: TYPES.SET_IS_DRAW,
    // Action data
    data: {
      isDraw,
    },
  }
}
