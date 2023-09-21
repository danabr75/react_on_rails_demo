import React from 'react';
import ReactDOM from 'react-dom';

import {
  Link,
} from "react-router-dom";

import PropTypes from "prop-types";

class Error extends React.Component {
  render() {
    return (
      <div>
        <p>
          You have arrived at an invalid page. You may return via this <Link to="/">link</Link>
        </p>
      </div>
    );
  }
}

export default Error;
