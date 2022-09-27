import { useGameOutcome } from '../data/game/hooks'
import { CELL_VALUES } from '../data/game/utils'

const BoardTitle = ({ isXTurn }) => {
  const { winner, isDraw } = useGameOutcome()

  return (
    <h2>
      {winner !== CELL_VALUES.Empty ? (
        <span>{winner} won!</span>
      ) : isDraw ? (
        <span>Draw!</span>
      ) : (
        <span>{isXTurn ? 'X' : 'O'} Turn</span>
      )}
    </h2>
  )
}

export default BoardTitle
