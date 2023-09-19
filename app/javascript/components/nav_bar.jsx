import React from 'react';
import ReactDOM from 'react-dom';

import {
  Link,
  NavLink
} from "react-router-dom";

import PropTypes from "prop-types";

const NavBar = () => {
  return (
    <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-primary bg-gradient">
      <div className="container-fluid">
        <button className="navbar-toggler w-100" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" activeclassname="active" to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" activeclassname="active" to="/test">Test</NavLink>
            </li>
          </ul>

          <ul className="navbar-nav float-end">
            <li className="nav-item">
              <NavLink className="nav-link" activeclassname="active" to="/login">Login</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
