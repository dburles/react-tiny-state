# react-tiny-state

An idea on simplifying React global state management. The API is very similar to [Recompose](https://github.com/acdlite/recompose) [withState](https://github.com/acdlite/recompose/blob/master/docs/API.md#withstate) except the generated component contains state unique to each definition, rather than per instance.

## Usage Example

```js
const counter = State('counter', 'setCounter', 0);
const Counter = counter(({ counter, setCounter }) =>
  <div>
    Count: {counter}
    <button onClick={() => setCounter(counter + 1)}>Increment</button>
    <button onClick={() => setCounter(counter - 1)}>Decrement</button>
  </div>
);
```

Read and update state through get/set methods:

```js
const counter = State('counter', 'setCounter', 0);
console.log(counter.get()); // 0
console.log(counter.set(5));
console.log(counter.get()); // 5
```

Optional async update function:

```js
const counter = State('counter', 'setCounter', 0, value => {
  // do something here
  return value;
});
```

Live demo: https://codesandbox.io/s/6wvql0x1m3

## License

MIT
