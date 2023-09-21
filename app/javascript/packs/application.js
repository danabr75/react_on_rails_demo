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

// Pages
import BlogsPage from '../pages/blog_page.jsx';
// import Blogs from '../components/blogs.jsx';


// Components
import UserLogin from '../components/users/login.jsx';
import NavBar from '../components/nav_bar.jsx';
import PageWrapper from '../components/page_wrapper.jsx';
import HelloWorld from '../components/hello_world.jsx';
import Home from '../components/home.jsx';
import Error from '../components/error.jsx';


import React from 'react';
// import useEffect from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
// import Navigation from '../components/navigation';
// import { BrowserRouter, Route } from 'react-router-dom';

// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";


import {
  BrowserRouter as Router,
  createBrowserRouter,
  RouterProvider,
  Routes,
  Route,
  Link
} from "react-router-dom";

const App = () => {
  return (
    <Router className="bg-light bg-gradient">

      <div>
        {/*header*/}
        { <NavBar/> }
      </div>

      <div className="container bg-light bg-gradient pb-4 pt-4">
        <Routes>
          <Route path="/" element={<PageWrapper />}>
            <Route path="/" element={<Home />} />
            <Route path="/game_blogs" element={<BlogsPage />} />
            <Route path="/login" element={<UserLogin />} />
            <Route path="*" element={<Error />} />
          </Route>
        </Routes>
      </div>

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