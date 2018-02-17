# react-tiny-state

Tiny React state containers. Demo: https://codesandbox.io/s/6wvql0x1m3.

## Usage Example

```js
// Create state container
const counter = State(0);

const StatelessCounter = ({ count, setCounter }) => (
  <div>
    Count: {count}
    <button onClick={() => setCounter(count + 1)}>Increment</button>
    <button onClick={() => setCounter(count - 1)}>Decrement</button>
  </div>
);

const StatefulCounter = compose(
  // Pass in a function to map `state` and `set` function to props
  counter(({ state, set }) => ({ count: state, setCounter: set })),
)(StatelessCounter);
```

### We can also read and update state directly through the get/set methods:

```js
const counter = State(0);

console.log(counter.get()); // 0
console.log(counter.set(5));
console.log(counter.get()); // 5
console.log(counter.set(state => state * 2));
console.log(counter.get()); // 10
```

### Create methods if you like:

```js
const counter = State(0);
counter.increment = () => counter.set(state => state + 1);
counter.decrement = () => counter.set(state => state - 1);
counter.doubled = () => counter.get() * 2;
```

## License

MIT
