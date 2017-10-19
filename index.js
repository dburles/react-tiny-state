import React, { Component } from 'react';

export default function State(
  name,
  setter,
  initialState,
  setterHandler = value => value,
) {
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

  async function set(newValue, cb) {
    if (newValue !== state) {
      state = await setterHandler(newValue);
      shouldUpdate = true;
      subscriptions.forEach(fn => fn(cb));
    } else {
      shouldUpdate = false;
    }
  }

  function wrapped(WrappedComponent) {
    return class extends Component {
      shouldComponentUpdate(nextProps) {
        return nextProps !== this.props || shouldUpdate;
      }

      componentWillUnmount() {
        this.subscription();
      }

      subscription = subscribe(cb => this.setState({}, cb));

      render() {
        return React.createElement(WrappedComponent, {
          ...this.props,
          [setter]: set,
          [name]: get(),
        });
      }
    };
  }

  wrapped.get = get;
  wrapped.set = set;

  return wrapped;
}
