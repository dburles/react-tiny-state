import React, { Component } from 'react';

export default function State(initialState, setterHandler = value => value) {
  const subscriptions = [];
  let shouldUpdate = true;

  function subscribe(fn) {
    subscriptions.push(fn);
    return function() {
      subscriptions.splice(subscriptions.indexOf(fn), 1);
    };
  }

  function set(setValue, cb) {
    const newValue =
      typeof setValue === 'function' ? setValue(wrapped.state) : setValue;

    if (newValue !== wrapped.state) {
      wrapped.state = setterHandler(newValue);
      shouldUpdate = true;
      subscriptions.forEach(fn => fn(cb));
    } else {
      shouldUpdate = false;
    }
  }

  const wrapped = map => WrappedComponent => {
    return class extends Component {
      shouldComponentUpdate(nextProps) {
        return nextProps !== this.props || shouldUpdate;
      }

      componentWillUnmount() {
        this.subscription();
      }

      subscription = subscribe(cb => this.setState({}, cb));

      render() {
        return React.createElement(WrappedComponent, this.props);
      }
    };
  };

  wrapped.set = set;
  wrapped.state = initialState;

  return wrapped;
}
