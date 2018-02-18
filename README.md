# react-tiny-state

Tiny React state containers. Demo: https://codesandbox.io/s/0v1097mjzv.

## Usage Example

Create a state container, passing in the default state:

```js
const counter = State(0);
```

Attach methods (if we wish):

```js
counter.increment = () => counter.set(state => state + 1);
counter.decrement = () => counter.set(state => state - 1);
```

A simple React component:

```js
const StatelessCounter = ({ state, increment, decrement }) => (
  <div>
    Count: {state}
    <br />
    <button onClick={() => increment()}>Increment</button>
    <button onClick={() => decrement()}>Decrement</button>
  </div>
));
```

Calling the state container as a function returns a higher order component:

```js
const StatefulCounter = counter()(StatelessCounter);
```

We can optionally provide a function to map prop names:

```js
const StatefulCounter = counter(({ state, increment, decrement }) => ({
  count: state,
  inc: increment,
  dec: decrement,
}))(StatelessCounter);
```

### Read and update state outside of React:

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
