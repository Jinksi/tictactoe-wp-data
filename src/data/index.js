import { registerStore, combineReducers } from '@wordpress/data'

import * as game from './game'
import * as players from './players'

export const STORE_NAME = 'helix/tictactoe'

// Combining each separate store in the data directory into one store.
registerStore(STORE_NAME, {
  // initial state derived from each store's reducer
  reducer: combineReducers({ game: game.reducer, players: players.reducer }),
  actions: {
    ...game.actions,
    ...players.actions,
  },
  selectors: {
    ...game.selectors,
    ...players.selectors,
  },
  resolvers: {
    ...players.resolvers,
  },
  controls: {
    ...players.controls,
  },
})
