export const BOARD_SIZE = 3

export const CELL_VALUES = {
  Empty: '',
  X: 'X',
  O: 'O',
}

export const generateInitialBoard = () => {
  let initialBoard = {}
  for (let i = 0; i < BOARD_SIZE; i++) {
    for (let j = 0; j < BOARD_SIZE; j++) {
      initialBoard[`${i}_${j}`] = CELL_VALUES.Empty
    }
  }
  return initialBoard
}

export const isHorizontalWinner = (board, lastRow, lastCol) => {
  const lastCell = board[`${lastRow}_${lastCol}`]

  for (let i = 0; i < BOARD_SIZE; i++) {
    if (board[`${lastRow}_${i}`] !== lastCell) {
      return false
    }
  }

  return true
}

export const isVerticalWinner = (board, lastRow, lastCol) => {
  const lastCell = board[`${lastRow}_${lastCol}`]

  for (let i = 0; i < BOARD_SIZE; i++) {
    if (board[`${i}_${lastCol}`] !== lastCell) {
      return false
    }
  }

  return true
}

export const isDiagonalWinner = (board, lastRow, lastCol) => {
  const lastCell = board[`${lastRow}_${lastCol}`]

  if (lastRow === lastCol) {
    for (let i = 0; i < BOARD_SIZE; i++) {
      if (board[`${i}_${i}`] !== lastCell) {
        return false
      }
    }
  } else {
    for (let i = 0; i < BOARD_SIZE; i++) {
      if (board[`${i}_${BOARD_SIZE - 1 - i}`] !== lastCell) {
        return false
      }
    }
  }

  return true
}

export const checkIfWinner = ({ board, lastCellKey, lastCellValue }) => {
  const [lastRow, lastCol] = lastCellKey.split('_').map((n) => parseInt(n))

  let winner = CELL_VALUES.Empty
  if (
    isHorizontalWinner(board, lastRow, lastCol) ||
    isVerticalWinner(board, lastRow, lastCol) ||
    isDiagonalWinner(board, lastRow, lastCol)
  ) {
    winner = lastCellValue
  }

  // if there is no winner and all cells are filled, it's a draw
  const isDraw =
    winner !== CELL_VALUES.Empty &&
    !Object.values(board).some((cell) => cell === CELL_VALUES.Empty)

  return {
    isDraw,
    winner,
  }
}
