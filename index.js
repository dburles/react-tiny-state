import React, { Component } from "react";

export default function State(
  name,
  setter,
  initialState,
  setterHandler = value => value
) {
  const subscriptions = [];
  let state = initialState;

  function subscribe(fn) {
    subscriptions.push(fn);
    return function() {
      subscriptions.splice(subscriptions.indexOf(fn), 1);
    };
  }

  function get() {
    return state;
  }

  function set(newValue, cb) {
    state = setterHandler(newValue);
    subscriptions.forEach(fn => fn(cb));
  }

  function wrapped(WrappedComponent) {
    return class extends Component {
      componentWillUnmount() {
        this.subscription();
      }

      subscription = subscribe(cb => this.setState({}, cb));

      render() {
        return React.createElement(WrappedComponent, {
          ...this.props,
          [setter]: set,
          [name]: get()
        });
      }
    };
  }

  wrapped.get = get;
  wrapped.set = set;

  return wrapped;
}
