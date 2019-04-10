import React, { Component } from 'react';

class Page extends Component {
  render() {
    return (
      <div>
        <p>Hey Im Page</p>
        {this.props.children}
      </div>
    );
  }
}

export default Page;