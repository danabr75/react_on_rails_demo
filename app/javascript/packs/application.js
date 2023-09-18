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

import NavBar from '../components/nav_bar';
import PageWrapper from '../components/page_wrapper';
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




{/*
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Link</a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li>
        <li class="nav-item">
          <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
        </li>
      </ul>
      <form class="d-flex">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>
*/}

const App = () => {
  return (
    <Router>

      <div>
        {/*header*/}
        { <NavBar/> }
      </div>

      <Routes>
        <Route path="/" element={<PageWrapper />}>
          <Route path="/" element={<Home />} />
          <Route path="/test" element={<ExampleComponent />} />
        </Route>
      </Routes>

      <div>
      {/*footer*/}
      </div>
    </Router>
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