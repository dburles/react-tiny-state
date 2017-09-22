import React, { Component } from 'react';

export default function state(name, setter, value) {
  const subscriptions = [];

  function subscribe(fn) {
    subscriptions.push(fn);
    return function() {
      subscriptions.splice(subscriptions.indexOf(fn), 1);
    };
  }

  return function(WrappedComponent) {
    return class extends Component {
      componentWillUnmount() {
        this.subscription();
      }

      subscription = subscribe(cb => this.setState({}, cb));

      render() {
        return React.createElement(WrappedComponent, {
          ...this.props,
          [setter]: (newValue, cb) => {
            value = newValue;
            subscriptions.forEach(fn => fn(cb));
          },
          [name]: value,
        });
      }
    };
  };
}
