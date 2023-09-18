import React from 'react';
import ReactDOM from 'react-dom';

import {
  Link
} from "react-router-dom";

import PropTypes from "prop-types";


const NavBar = () => {
  return (
   <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/test">Test</Link></li>
      </ul>
    </nav>
  );
};

export default NavBar;
