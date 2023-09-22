import React from 'react';
import ReactDOM from 'react-dom';

import {
  Link,
  Outlet
} from "react-router-dom";


const PageWrapper = () => {
  return (
    <div id="root-container" className="container bg-light bg-gradient pb-4 pt-4">

      {/*<div>START: This is the PageWrapper</div>*/}
      <Outlet />
      {/*<div>STOP: This is the PageWrapper</div>*/}
    </div>
  );
};

export default PageWrapper;