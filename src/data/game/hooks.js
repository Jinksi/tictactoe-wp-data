import { useSelect, useDispatch } from '@wordpress/data'
import { STORE_NAME } from '../index'

export const useBoard = () => {
  // We use the `useSelect` hook to get data from the store
  const board = useSelect((select) => select(STORE_NAME).getBoard())
  return board
}

export const useGameOutcome = () => {
  const { getWinner, getIsDraw } = useSelect((select) => select(STORE_NAME))
  return { winner: getWinner(), isDraw: getIsDraw() }
}

export const useBoardActions = () => {
  // We use the `useDispatch` hook to dispatch actions to the store
  const { setCell, resetBoard } = useDispatch(STORE_NAME)

  return {
    // Returning dispatch actions
    setCell,
    resetBoard,
  }
}
