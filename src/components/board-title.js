import { useBoardData } from '../data/game/hooks'

const BoardTitle = ({ isXTurn }) => {
  const { winner, isDraw, CELL_VALUES } = useBoardData()

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
