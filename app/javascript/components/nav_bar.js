import React from "react";
import { Nav, NavLink, NavMenu }
  from "./nav_bar_elements";

const NavBar = () => {
  return (
    <Nav>
      <NavMenu>
        <NavLink to="/" activeStyle>
          Home
        </NavLink>
        <NavLink to="/test" activeStyle>
          Test
        </NavLink>
      </NavMenu>
    </Nav>
  );
};

export default NavBar;