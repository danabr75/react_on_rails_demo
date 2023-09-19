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
          <Link to="/game_blogs">/game_blogs</Link> to see our catalog.
        </p>
        <p>Semantic UI</p>
        <div className="ui three buttons">
          <button className="ui button">One</button>
          <button className="ui button">Two</button>
          <button className="ui button">Three</button>
        </div>
        <p style={{height: '1000px'}}>
          
        </p>
      </div>
    );
  }
}

export default Home;
