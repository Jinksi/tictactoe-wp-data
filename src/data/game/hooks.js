import { useSelect, useDispatch } from '@wordpress/data'
import { STORE_NAME } from '../index'
import { BOARD_SIZE, CELL_VALUES } from './utils'

export const useBoardData = () => {
  const { setCell, resetBoard } = useDispatch(STORE_NAME)
  return useSelect((select) => {
    // Selectors are functions that return data from the store.
    // Defined in ./selectors.js
    const { getBoard, getWinner, getIsDraw } = select(STORE_NAME)

    return {
      board: getBoard(),
      winner: getWinner(),
      isDraw: getIsDraw(),
      setCell,
      resetBoard,
      BOARD_SIZE,
      CELL_VALUES,
    }
  })
}
