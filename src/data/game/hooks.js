import { useSelect, useDispatch } from '@wordpress/data'
import { STORE_NAME } from '../index'
import { BOARD_SIZE, CELL_VALUES } from './utils'

export const useBoardData = () => {
  // We use the `useSelect` hook to get data from the store
  const { board, winner, isDraw } = useSelect((select) => {
    // Selectors are functions that return data from the store.
    // Defined in ./selectors.js
    const { getBoard, getWinner, getIsDraw } = select(STORE_NAME)

    return {
      board: getBoard(),
      winner: getWinner(),
      isDraw: getIsDraw(),
    }
  })

  // We use the `useDispatch` hook to dispatch actions to the store
  const { setCell, resetBoard } = useDispatch(STORE_NAME)

  return {
    // Returning state from the store
    board,
    winner,
    isDraw,

    // Returning dispatch actions
    setCell,
    resetBoard,

    // Returning constants
    BOARD_SIZE,
    CELL_VALUES,
  }
}
