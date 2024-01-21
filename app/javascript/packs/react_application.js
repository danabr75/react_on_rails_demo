// Pages
import BlogsPage from '../pages/blogs_page.jsx';
import BlogPage from '../pages/blog_page.jsx';


// Components
import UserLogin from '../components/users/login.jsx';
import NavBar from '../components/nav_bar.jsx';
import PageWrapper from '../components/page_wrapper.jsx';
import HelloWorld from '../components/hello_world.jsx';
import Home from '../components/home.jsx';
import Error from '../components/error.jsx';

import SideBar from '../components/sidebar.jsx';


import React, {useState, useEffect} from 'react';
// import React from 'react';
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

import { AuthProvider } from '../components/auth_context.jsx';

const App = () => {
  // Right-hand Sidebar Logic
  const [sidebarOpen, setSideBarOpen] = useState(false);
  var activeComponentName = undefined;
  const handleViewSidebar = (sidebarName) => {
    setSideBarOpen(!sidebarOpen);
    activeComponentName = sidebarName;
  };

  return (
    <AuthProvider>
      <Router>
        <div>
          {/*header*/}
          { <NavBar/> }
        </div>

        <span>
          <SideBar isOpen={sidebarOpen} toggleSidebar={handleViewSidebar} />
        </span>

        <Routes>
          <Route path="/" element={<PageWrapper />}>
            <Route path="/" element={<Home />} />
            <Route path="/game_blogs" element={<BlogsPage />} />
            <Route path="/game_blogs/:id" element={<BlogPage />} />
            <Route path="/login" element={<UserLogin />} />
            <Route path="*" element={<Error />} />
          </Route>
        </Routes>

        <div>
        {/*footer*/}
        </div>
      </Router>
    </AuthProvider>
  );
};



document.addEventListener('DOMContentLoaded', () => {
  const root = createRoot(document.getElementById('root'));
  root.render(
    <App />
  );
  // Other ReactDOM operations or component rendering go here

  // adding bootstrap 5 classes to imported components; ex: Multiselect
  $('.searchBox').addClass('form-control')
});