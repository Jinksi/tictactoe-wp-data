# @wordpress/data cheatsheet

<!-- table of contents -->

- [Terminology](#terminology)
  - [Store](#store)
  - [Selector](#selector)
  - [Action and Action Creator](#action)
  - [Reducer](#reducer)
  - [Control](#control)
  - [Resolver](#resolver)
  - [Generator Function](#generator-function)
- [How do I?](#how-do-i)
  - [Register a new store](#register-a-new-store)
  - [Use with React](#use-with-react)
  - [View and debug what’s in the store, actions, etc.](#view-and-debug-whats-in-the-store-actions-etc)
  - [Trigger side-effects when dispatching an action](#trigger-side-effects-when-dispatching-an-action)
  - [Fetch data from a REST API to update state](#fetch-data-from-a-rest-api-to-update-state)

## Terminology

### Store

A **store** holds the whole state tree of your application. The only way to change the state inside it is to dispatch an action on it.

Example Image: `wc/payments` store.

`@wordpress/data` differs slightly from the Redux approach of having only one store for a single application. Multiple stores are used within wp-admin, each represented by a namespace: (e.g. `wc/payments` or `core/blocks`).

Example Image: WC stores.

`@wordpress/data`

### Selector

A **selector** is a function that will get and return a specific slice of state based on arguments provided.

```js
// Selector
export const getProducts( state ) => {
	return state.products;
}

// Selector with args
export const getProduct( state, id ) => {
	return state.products[ id ];
}
```

### Action

An **action** is a plain object representing an intention to change the state. Actions are used to tell the **reducer** that we want to make a change to the state.

```js
// Action object
{
	type: 'SET_PRODUCT',
	data: { id: 123, title: 'Product Title' }
}
```

**Action types** are often split into separate files (e.g. `action-types.js`):

```js
// Action types
const TYPES = {
  ADD_POST: 'ADD_POST',
  UPDATE_POST: 'UPDATE_POST',
  DELETE_POST: 'DELETE_POST',
}
export default TYPES
```

**Action creators** are functions that accept arguments and return an **action** object that will be dispatched to the **reducer**.

```js
// Action creator
export const addPost = (post) => {
  return {
    type: TYPES.ADD_POST, // "ADD_POST"
    data: post,
  }
}
```

### Reducer

A [**reducer**](https://redux.js.org/tutorials/fundamentals/part-3-state-actions-reducers) is a pure function that accepts the previous `state` and an `action` as arguments and returns an updated `state` value.

- It must be a pure function. No side-effects.
- It must never mutate the incoming state. Return a newly updated state object.

```js
export const reducer = (state, action) => {
  if (action.type === 'SET_PRODUCT') {
    const { product } = action.data
    const existingProducts = state.products.filter(
      (existing) => existing.id !== action.data.product.id
    )
    return {
      ...state,
      products: [...existingProducts, product],
    }
  }
}
```

### Control

A **control** or **control function** defines the execution flow for a specific action type, where you want to execute logic as part of the flow of modifying state. For example, **async** data flows like REST API requests.

A **control action creator** is the same as an action creator, accepting arguments and returning an **action** that has a type matching a **control function**.

```js
// Control action creator
export const fetch = (path, options = {}) => {
  return {
    type: 'FETCH',
    path,
    options,
  }
}

// Control object containing one or more control functions
export default {
  // Control function, with a name matching the control action creator above
  FETCH: async ({ path, options }) => {
    const response = await window.fetch(path, options)
    const result = await response.json()
    return result
  },
}
```

The [￼`@wordpress/data-controls`￼ package](https://github.com/WordPress/gutenberg/tree/master/packages/data-controls) is used to provide commonly-used controls:

- `apiFetch`: for performing a WP REST API fetch.
- `dispatch`: for dispatching another action in a different store.
- `select`: for selecting data from the state in another store.

```js
// Control action creator
export const fetch = (path, options = {}) => {
	if (options.body)
}
```

### Resolver

Linked to a **selector**, **resolvers** allow for automatically resolving data for the initial slice of state the selector is retrieving.

- The name of a resolver function must be the same as the selector that it is resolving
- Resolvers must return, dispatch or yield action objects.

### Generator Function

A **Generator Function** is a unique function that can pause itself and resume later, allowing other code to run in the meantime.

- Identified by the `*function` keyword.
- Iteration starts with the `.next()` method.
- Each time the `yield` keyword is reached, the subsequent expression is evaluated, execution is paused, and an object is returned:
  `{ done: false, value: ... }`
- Execution continues with the `.next()` method, which can accept an input param accessible within the function as `input`.
- When the function reaches a `return` keyword, the return object will include `done: true`.

See [this article on generator functions](https://flaviocopes.com/javascript-generators/).

---

## How do I?

### Register a new store.

The `registerStore(storeName, options)` function accepts two arguments:

1. `storeName`: a name to identify the store, aka “store name”. Commonly grouped with a prefix: e.g. `wc/payments` for [WooCommerce Payments](https://github.com/Automattic/woocommerce-payments).
2. `options`: an object that includes the following:
   - `reducer` _Note: singular not plural._
   - `selectors`: optional
   - `controls`: optional
   - `resolvers`: optional
   - `actions`: optional
   - `initialState`: optional

```js
import { registerStore } from '@wordpress/data'

registerStore(STORE_NAME, {
  reducer,
  selectors,
  controls,
  resolvers,
  actions,
  initialState,
})
```

**Note:** [￼`registerStore`￼ is deprecated, replaced by ￼`register`￼](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-data/#registerstore). I’ll continue demonstrating `registerStore` to be consistent with WCPay usage.

You will likely have multiple directories with individual states and logic that you would like to combine into one. For example, [WCPay](https://github.com/Automattic/woocommerce-payments/blob/9621b920555073429b39084e08173a1d4f561c7a/client/data/store.js#L26) has separate states and logic for `deposits`, `disputes`, `transactions`, etc. In this case, we combine them into a single store, using the `combineReducers` function to create a single reducer.

```js
registerStore(STORE_NAME, {
  reducer: combineReducers({
    deposits: deposits.reducer,
    transactions: transactions.reducer,
    charges: charges.reducer,
  }),
  actions: {
    ...deposits.actions,
    ...transactions.actions,
    ...charges.actions,
  },
  selectors: {
    ...deposits.selectors,
    ...transactions.selectors,
    ...charges.selectors,
  },
  resolvers: {
    ...deposits.resolvers,
    ...transactions.resolvers,
    ...charges.resolvers,
  },
})
```

### Use with React

#### `useSelect`

The `useSelect` hook lets you listen to a slice of state using one or more selectors.

```jsx
import { useSelect } from '@wordpress/data'

// Use within a functional component
const Product = ({ id }) => {
  const product = useSelect(
    (select) => {
      const { getProduct } = select(STORE_NAME)
      return getProduct(id)
    },
    [id]
  )
  return <div>{product.name}</div>
}

// Or use within a custom hook (also with a shortened syntax)
const useProduct = ({ id }) => {
  const product = useSelect((select) => select(STORE_NAME).getProduct(id), [id])
  return product
}
```

#### `useDispatch`

The `useDispatch` hook lets you dispatch an action to the store. `useDispatch(STORE_NAME)` returns an object with all the action creators defined in the store.

```jsx
import { useDispatch } from '@wordpress/data'

// Use within a functional component
const ProductUpdateButton = ({ id }) => {
  const { updateProduct } = useDispatch(STORE_NAME)
  const update = () => updateProduct({ id, title: 'New title' })
  return <button onClick={update}>Update Product</button>
}

// Or use within a custom hook, alongside `useSelect`
const useProduct = ({ id }) => {
  const { updateProduct } = useDispatch(STORE_NAME)
  const product = useSelect((select) => select(STORE_NAME).getProduct(id), [id])
  return { product, updateProduct }
}
```

### View and debug what’s in the store, actions, etc.

[Redux DevTools](https://github.com/reduxjs/redux-devtools) is a browser extension that works with `@wordpress/data`, since it uses Redux under the hood.

- Use the **Store** select to choose the store you want to view (e.g. `wc/payments`).
- Use the **State** to view the data in the store.
- See a list of dispatched actions on the in the left sidebar.
  - Use the **Actions** to view details about each action.
  - Use the **Diff** to see the difference between the previous and current state after each action.
  - Use the slider at the bottom of the screen to "time-travel" through dispatched actions.

### Trigger side-effects when dispatching an action

<mark>**TODO**</mark>

- For example;
  - updating multiple parts of the state when dispatching an action.
  - sending an asynchronous HTTP

### Fetch data from a REST API to update state

<mark>**TODO**</mark>

```

```
