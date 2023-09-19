import React from 'react';
import ReactDOM from 'react-dom';

import {
  Link,
  Outlet
} from "react-router-dom";


const PageWrapper = () => {
  return (
    <div>
      {/*<div>START: This is the PageWrapper</div>*/}
      <Outlet />
      {/*<div>STOP: This is the PageWrapper</div>*/}
    </div>
  );
};

export default PageWrapper;