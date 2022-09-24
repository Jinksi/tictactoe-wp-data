# @wordpress/data learnup, cheatsheet and example app

## What is `@wordpress/data`?

`@wordpress/data` is a state management library for JavaScript. It is used in the WordPress admin, and is available as a package in the [WordPress npm registry](https://www.npmjs.com/package/@wordpress/data).

## Development

- Requires [Node.js](https://nodejs.org/en/) v16 and [npm](https://www.npmjs.com/) v8.
- `npm install` to install dependencies.
- `npm start` to start the development server.

## Cheatsheet

View the [cheatsheet](docs/wp-data-cheatsheet.md) for a quick reference of terminology.

## Learnup

View the [learnup](docs/wp-data-learnup.md) for a detailed explanation of the concepts and API. This is a Marp presentation, so you can view it in [Marp](https://marp.app/) or [Marp for VS Code](https://marketplace.visualstudio.com/items?itemName=marp-team.marp-vscode).

## Example App

The `@wordpress/data` implementation of state management for @aprea's [TicTacToe app](https://github.com/aprea/tictactoe) is available in the [src/data](src/data) directory. Some modifications and additions were made to the component structure to resemble a large-scale app.

Check out the `controls-resolvers` branch to see additional `players` state with async selectors and resolvers.

## Resources

* I strongly recommend reading [A Practical Overview of the @wordpress/data API](https://unfoldingneurons.com/series/practical-overview-of-wp-data) by [@nerrad](https://github.com/nerrad).
