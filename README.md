# react-tiny-state

Tiny React state containers. Demo: https://codesandbox.io/s/6wvql0x1m3.

## Usage Example

```js
// Create state container
const counter = State(0);

// Attach methods (if we wish):
counter.increment = () => counter.set(state => state + 1);
counter.decrement = () => counter.set(state => state - 1);

const StatelessCounter = ({ state, increment, decrement }) => (
  <div>
    Count: {state}
    <br />
    <button onClick={() => increment()}>Increment</button>
    <button onClick={() => decrement()}>Decrement</button>
  </div>
));

// Connect our counter state
const StatefulCounter = counter()(StatelessCounter);
```

### We can also read and update state directly (outside of React):

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
