# react-tiny-state

An idea on simple React global state management.

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
  // Pass in a function to map state and set function to props
  counter(({ state, set }) => ({ count: state, setCounter: set })),
)(StatelessCounter);
```

We can also read and update state directly through get/set methods:

```js
const counter = State(0);

console.log(counter.get()); // 0
console.log(counter.set(5));
console.log(counter.get()); // 5
```

Optional update hook (can be async):

```js
const counter = State(0, state => {
  // do something here
  return state;
});
```

Live demo: https://codesandbox.io/s/6wvql0x1m3

## License

MIT
