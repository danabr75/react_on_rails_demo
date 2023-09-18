// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

import Rails from "@rails/ujs"
import Turbolinks from "turbolinks"
import * as ActiveStorage from "@rails/activestorage"
import "channels"

//= require react
//= require react_ujs
//= require components

// Import jQuery
import $ from 'jquery';
window.jQuery = $;
window.$ = $;


Rails.start()
Turbolinks.start()
ActiveStorage.start()

// import NavBar from '../components/nav_bar';
import HelloWorld from '../components/hello_world';
import Home from '../components/home';
import ExampleComponent from '../components/example_component';
// import Navbar from '../components/nav_bar';
import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
// import Navigation from '../components/navigation';
// import { BrowserRouter, Route } from 'react-router-dom';

import {
  BrowserRouter as Router,
  createBrowserRouter,
  RouterProvider,
  Routes,
  Route,
  Link
} from "react-router-dom";

// const router = createBrowserRouter([
//   // <Route exact path='/' exact element={<App />} />
//   // <Route path='/about' element={<About />} />
//   {
//     path: "/",
//     element: <Home />,
//     // element: <div>Hello world!</div>,
//   },
//   {
//     path: "/test",
//     element: <ExampleComponent />,
//   },
// ]);


const App = () => {
  return (
    <div>
      <header>
        <Router>
          <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/test">Test</Link></li>
          </ul>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/test" element={<ExampleComponent/>}/>
          </Routes>
        </Router>
      </header>
      <div>
      {/*footer*/}
      </div>
    </div>
  );
};



document.addEventListener('DOMContentLoaded', () => {
  const root = createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  // Other ReactDOM operations or component rendering go here
});