# react-tiny-state

Tiny React state containers. Demo: https://codesandbox.io/s/n3zypmlr4m.

## Usage Example

Create a state container, passing in the default state:

```js
const counter = State(0);
```

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

Make a HoC (We're using [Recompose](https://github.com/acdlite/recompose) here too)

```js
const withCounter = compose(
  // Calling the state container as a function returns a higher order component:
  counter(),
  mapProps(() => ({
    count: counter.state,
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

### Read and update state anywhere:

Though we only have reactivity within React context

```js
const counter = State(0);

console.log(counter.state); // 0
console.log(counter.set(5));
console.log(counter.state)); // 5
console.log(counter.set(state => state * 2));
console.log(counter.state)); // 10
```

## License

MIT
