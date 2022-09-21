// Control action creator
export const fetch = (path, options) => {
  return {
    type: 'FETCH',
    path,
    options,
  }
}

async function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// Control object containing one or more control functions
export default {
  // Control function, with a name matching the control action creator above
  FETCH: async ({ path, options }) => {
    const response = await window.fetch(path, options)
    const result = await response.json()
    // Simulate a slow network to see the loading state
    await delay(500)
    return result
  },
}
