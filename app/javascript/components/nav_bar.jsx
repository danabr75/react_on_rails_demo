import React, {useEffect} from 'react';
import {
  useLocation
} from "react-router-dom";


import {
  Link,
  NavLink
} from "react-router-dom";

import PropTypes from "prop-types";

const NavBar = () => {
  const location = useLocation();
  useEffect(() => {
    console.log("Location Change - navbar")
    // Bootstrap will not reset clicked links in navbar
    if ($('.navbar-collapse.collapse.show').length == 1) {
      $('.navbar-toggler').click()
    }
  }, [location]);

  const isLoggedIn = window.currentUser !== undefined;

  return (
    <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-primary bg-gradient rounded-pill rounded-top border border-3">
      <div className="container-fluid">
        <button className="navbar-toggler w-100" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" activeclassname="active" to="/">
                Boxman's Base<span class='noir-text-hidden'> Noir</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" activeclassname="active" to="/game_blogs">Game Blogs</NavLink>
            </li>
          </ul>

          {isLoggedIn ? (
            <ul className="navbar-nav float-end">
              <li className="nav-item">
                <a class="btn btn-info" href="/admin_index">
                  Manage
                </a>
                 <a class="btn btn-danger" href="/users/sign_out" data-method="delete">
                  Sign Out
                </a>
              </li>
            </ul>
          ) : (
            <ul className="navbar-nav float-end">
              <li className="nav-item">
                <a class="btn btn-info" href="/users/sign_in">
                  Sign in
                </a>
              </li>
            </ul>
          )}

        </div>
      </div>
    </nav>
  );
};

export default NavBar;
