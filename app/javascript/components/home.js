import React from 'react';
import ReactDOM from 'react-dom';

import {
  Link,
} from "react-router-dom";

import PropTypes from "prop-types";

class Home extends React.Component {
  render() {
    return (
      <div>
        <div>This is the Home page.</div>
        <p>
          Welcome to our content index. Head over to{" "}
          <Link to="/test">/test</Link> to see our catalog.
        </p>
      </div>
    );
  }
}

export default Home;
