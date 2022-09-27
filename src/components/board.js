import { useBoard, useBoardActions, useGameOutcome } from '../data/game/hooks'
import { BOARD_SIZE, CELL_VALUES } from '../data/game/utils'

const Board = ({ isXTurn, setIsXTurn }) => {
  const board = useBoard()
  const { winner } = useGameOutcome()
  const { setCell } = useBoardActions()

  return (
    <div
      className={`board ${isXTurn ? 'x-turn' : 'o-turn'}`}
      style={{ width: `${BOARD_SIZE * 100 + (BOARD_SIZE - 1) * 5}px` }}
    >
      {Object.entries(board).map(([key, value]) => (
        <button
          key={key}
          className={`cell${
            value !== CELL_VALUES.Empty ? ` cell-${value.toLowerCase()}` : ''
          }`}
          disabled={value !== CELL_VALUES.Empty || winner !== CELL_VALUES.Empty}
          onClick={() => {
            setCell({
              board,
              cellKey: key,
              cellValue: isXTurn ? CELL_VALUES.X : CELL_VALUES.O,
            })
            setIsXTurn(!isXTurn)
          }}
          type="button"
        >
          {value && <span className="sr-only">{value}</span>}
        </button>
      ))}
    </div>
  )
}

export default Board
