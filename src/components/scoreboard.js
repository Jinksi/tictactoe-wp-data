import { useState, useEffect } from 'react'
import { useGameOutcome } from '../data/game/hooks'
import { CELL_VALUES } from '../data/game/utils'

const Scoreboard = () => {
  const { winner, isDraw } = useGameOutcome()
  const { X, O } = CELL_VALUES
  // Using local state to track the score
  // But this could be global state as well
  const [score, setScore] = useState({
    [X]: 0,
    [O]: 0,
    isDraw: 0,
  })

  useEffect(() => {
    if (winner === X) {
      setScore((prevScore) => ({
        ...prevScore,
        [X]: prevScore[X] + 1,
      }))
    } else if (winner === O) {
      setScore((prevScore) => ({
        ...prevScore,
        [O]: prevScore[O] + 1,
      }))
    } else if (isDraw) {
      setScore((prevScore) => ({
        ...prevScore,
        isDraw: prevScore.isDraw + 1,
      }))
    }
  }, [winner, isDraw, X, O])

  return (
    <div className="scoreboard">
      <div className="scoreboard__score">
        <h4 className="scoreboard__score-title">X</h4>
        <p className="scoreboard__score-value">{score[X]}</p>
      </div>
      <div className="scoreboard__score">
        <h4 className="scoreboard__score-title">O</h4>
        <p className="scoreboard__score-value">{score[O]}</p>
      </div>

      <div className="scoreboard__score">
        <h4 className="scoreboard__score-title">D</h4>
        <p className="scoreboard__score-value">{score.isDraw}</p>
      </div>
    </div>
  )
}

export default Scoreboard
