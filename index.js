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
      subscription = subscribe(() => this.setState({}));

      componentWillUnmount() {
        this.subscription();
      }

      render() {
        return React.createElement(WrappedComponent, {
          ...this.props,
          [setter]: newValue => {
            value = newValue;
            subscriptions.forEach(fn => fn());
          },
          [name]: value,
        });
      }
    };
  };
}
