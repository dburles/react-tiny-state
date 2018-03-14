# react-tiny-state

Tiny React state containers. Demo: https://codesandbox.io/s/n3zypmlr4m.

## Usage Example

### Create a state container

Create a state container, passing in the default state:

```js
const counter = State(0);
```

This results in a function that provides a `get`, `set`, and `subscribe` method.

```js
const counter = State(0);

console.log(counter.get()); // 0
console.log(counter.set(5));
console.log(counter.get())); // 5
// we can also pass in a function to access the current state
console.log(counter.set(state => state * 2)); 
console.log(counter.get())); // 10
```

The subscribe method allows us to register a callback function to be called anytime `set` is called. 
`subscribe` returns a function we can call to unsubscribe.

```js
// Log changes
const sub = counter.subscribe(() => console.log(`changed: ${counter.get()}`));

// Unsubscribe
sub();
```

### Connect a React component

Make some functions (if we wish):

```js
const increment = () => counter.set(state => state + 1);
const decrement = () => counter.set(state => state - 1);
```

A simple React component:

```js
const StatelessCounter = ({ count, inc, dec }) => (
  <div>
    Count: {count}
    <br />
    <button onClick={inc}>Increment</button>
    <button onClick={dec}>Decrement</button>
  </div>
));
```

Make a HoC (We're using [Recompose](https://github.com/acdlite/recompose) here too):

We connect and subscribe to state changes by calling the state container as a function.

```js
const withCounter = compose(
  // Calling the state container as a function returns a higher order component:
  counter(),
  withProps(() => ({
    count: counter.get(),
  })),
  withHandlers({
    inc: () => () => increment(),
    dec: () => () => decrement(),
  }),
);
```

Then decorate our component:

```js
const StatefulCounter = withCounter(StatelessCounter);
```

## License

MIT
