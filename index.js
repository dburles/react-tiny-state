import React, { Component } from 'react';

export default function State(initialState, setterHandler = value => value) {
  const subscriptions = [];
  let shouldUpdate = true;
  let state = initialState;

  function subscribe(fn) {
    subscriptions.push(fn);
    return function() {
      subscriptions.splice(subscriptions.indexOf(fn), 1);
    };
  }

  const wrapped = () => WrappedComponent => {
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

  function get() {
    return state;
  }

  function set(setValue, cb) {
    const newValue =
      typeof setValue === 'function' ? setValue(state) : setValue;

    if (newValue !== state) {
      state = setterHandler(newValue);
      shouldUpdate = true;
      subscriptions.forEach(fn => fn(cb));
    } else {
      shouldUpdate = false;
    }
  }

  wrapped.get = get;
  wrapped.set = set;
  wrapped.subscribe = subscribe;

  return wrapped;
}
