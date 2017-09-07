# react-tiny-state

An idea on simplifying React global state management. The API is very similar to [Recompose](https://github.com/acdlite/recompose) [withState](https://github.com/acdlite/recompose/blob/master/docs/API.md#withstate) except the generated component contains state unique to each definition, rather than per instance.

# Usage Example

```js
const withCounter = state('counter', 'setCounter', 0);
const Counter = withCounter(({ counter, setCounter }) =>
  <div>
    Count: {counter}
    <button onClick={() => setCounter(n => n + 1)}>Increment</button>
    <button onClick={() => setCounter(n => n - 1)}>Decrement</button>
  </div>
);
```

# License

MIT
