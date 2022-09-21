import { registerStore, combineReducers } from '@wordpress/data'

import * as game from './game'

export const STORE_NAME = 'helix/tictactoe'

// Combining each separate store in the data directory into one store.
registerStore(STORE_NAME, {
  // initial state derived from each store's reducer
  reducer: combineReducers({ game: game.reducer }),
  actions: {
    ...game.actions,
  },
  selectors: {
    ...game.selectors,
  },
})
