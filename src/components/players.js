import { useState } from 'react'

import { usePlayersData } from '../data/players/hooks'

function getRandomGithubUsernames(num) {
  const githubUsernames = [
    'aprea',
    'brucealdridge',
    'haszari',
    'james-allan',
    'jinksi',
    'mattallan',
    'shendy-a8c',
    'octocat',
  ]
  const randomGithubUsernames = []
  while (randomGithubUsernames.length < num) {
    const randomGithubUsername =
      githubUsernames[Math.floor(Math.random() * githubUsernames.length)]
    if (!randomGithubUsernames.includes(randomGithubUsername)) {
      randomGithubUsernames.push(randomGithubUsername)
    }
  }
  console.log(randomGithubUsernames)
  return randomGithubUsernames
}

const initialPlayers = getRandomGithubUsernames(2)

const Players = () => {
  const [githubUsernames, setGithubUsernames] = useState(initialPlayers)
  const { players, isLoading } = usePlayersData(githubUsernames)

  return (
    <div className="players">
      <div className="players__list">
        <div className="player">
          <img
            className="player__avatar"
            src={!isLoading ? players[0].avatar_url : ''}
            alt={!isLoading ? players[0].login : ''}
          />

          <div className="player__name">
            {isLoading ? '...' : `@${players[0].login}`}
          </div>
        </div>

        <h3>VS</h3>

        <div className="player">
          <img
            className="player__avatar"
            src={!isLoading ? players[1].avatar_url : ''}
            alt={!isLoading ? players[1].login : ''}
          />

          <div className="player__name">
            {isLoading ? '...' : `@${players[1].login}`}
          </div>
        </div>
      </div>

      <button
        className="players__button"
        onClick={() => setGithubUsernames(getRandomGithubUsernames(2))}
        disabled={isLoading}
      >
        Change players
      </button>
    </div>
  )
}

export default Players
