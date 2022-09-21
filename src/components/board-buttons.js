import { useBoardData } from '../data/game/hooks'

const BoardButtons = ({ setIsXTurn }) => {
  const { resetBoard } = useBoardData()

  return (
    <button
      className="restart-game"
      type="button"
      onClick={() => {
        resetBoard()
        setIsXTurn(Math.random() >= 0.5)
      }}
    >
      Restart game
    </button>
  )
}

export default BoardButtons
