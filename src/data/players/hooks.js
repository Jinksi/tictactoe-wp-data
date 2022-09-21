import { useSelect } from '@wordpress/data'
import { STORE_NAME } from '..'

export const usePlayersData = (githubUsernames) => {
  const { players, isLoading } = useSelect(
    (select) => {
      const { getPlayers, hasFinishedResolution } = select(STORE_NAME)
      return {
        players: getPlayers(githubUsernames),
        // hasFinishedResolution is a selector that returns true if the resolution
        // for the given selector has finished, with the given arguments (if any) passed in as an array.
        isLoading: !hasFinishedResolution('getPlayers', [githubUsernames]),
      }
    },
    [githubUsernames]
  )

  return {
    players,
    isLoading,
  }
}
