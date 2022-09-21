import React, { useState } from 'react'
import Confetti from 'react-confetti'

import { useBoardData } from './data/game/hooks'
import Board from './components/board'
import BoardButtons from './components/board-buttons'
import BoardTitle from './components/board-title'
import Scoreboard from './components/scoreboard'
import './style.css'

function App() {
  // We can use both global and local state in the same component
  const { winner, CELL_VALUES } = useBoardData()
  const [isXTurn, setIsXTurn] = useState(Math.random() >= 0.5)

  return (
    <div className="App">
      <BoardTitle isXTurn={isXTurn} />
      <Board isXTurn={isXTurn} setIsXTurn={setIsXTurn} />
      <BoardButtons setIsXTurn={setIsXTurn} />
      {winner !== CELL_VALUES.Empty && <Confetti />}
      <Scoreboard />
    </div>
  )
}

export default App
