import React, { Component } from 'react';

export default function State(initialState, setterHandler = value => value) {
  const subscriptions = [];
  let state = initialState;
  let shouldUpdate = true;

  function subscribe(fn) {
    subscriptions.push(fn);
    return function() {
      subscriptions.splice(subscriptions.indexOf(fn), 1);
    };
  }

  function get() {
    return state;
  }

  async function set(setValue, cb) {
    const newValue =
      typeof setValue === 'function' ? setValue(state) : setValue;

    if (newValue !== state) {
      state = await setterHandler(newValue);
      shouldUpdate = true;
      subscriptions.forEach(fn => fn(cb));
    } else {
      shouldUpdate = false;
    }
  }

  const container = map => WrappedComponent => {
    if (typeof map !== 'function') {
      throw Error('State: map function is required');
    }
    return class extends Component {
      shouldComponentUpdate(nextProps) {
        return nextProps !== this.props || shouldUpdate;
      }

      componentWillUnmount() {
        this.subscription();
      }

      subscription = subscribe(cb => this.setState({}, cb));

      render() {
        const props = {
          ...this.props,
          ...map({
            state,
            set,
          }),
        };

        return React.createElement(WrappedComponent, props);
      }
    };
  };

  container.get = get;
  container.set = set;

  return container;
}
