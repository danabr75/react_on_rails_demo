import axios from 'axios';
import { AxiosProvider, Request, Get, Delete, Head, Post, Put, Patch, withAxios } from 'react-axios'
import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from "prop-types";
import Blogs from '../components/blogs.jsx';
import { useLocation } from 'react-router-dom';

import Pagination from 'react-rails-pagination';
import LoadingSpinner from '../components/loading_spinner.jsx'

const BlogsPage = (props) => {
// const API_PATH = "/api/v1/blogs"
  const API_PATH = "/api/v1/blogs"

  // get current page params
  console.log("get current page params")
  const location = useLocation();
  console.log(location)
  const searchParams = new URLSearchParams(location.search);
  console.log(searchParams)
  const initialPage = searchParams.get('page') ? parseInt(searchParams.get('page')) : undefined;

  const [page, setPage] = useState(initialPage || 1);
  const [totalBlogsCount, setTotalBlogsCount] = useState(1);
  const perPage = 10;
  const [totalPages, setTotalPages] = useState(1);
  console.log("TOTAL PAGES SET")
  console.log(totalPages)
  const [blogs, setBlogs] = useState([]);

  const [loaded, setLoaded] = useState(false);

  function getAPIData() {
    return axios.get(
      `${API_PATH}?page=${page}&per_page=${perPage}`, {headers: {Accept: 'application/json'}}
    ).then((response) => response.data)
  }

  function getAPIMeta() {
    return axios.get(
      `${API_PATH}/meta`, {headers: {Accept: 'application/json'}}
    )
    .then((response) => response.data)
  }

  // init blogs on page load
  useEffect(() => {
    console.log("Triggered Page Load data")
    fetchTableData()
  }, []);

  // update blogs on page change.
  useEffect(() => {
    fetchTableData()
  }, [page]);

  const fetchTableData = () => {
    getAPIMeta().then((meta) => {
      setTotalPages(
        Math.ceil(
          meta.total_count / perPage
        )
      )
    });
    getAPIData().then((items) => {
      setBlogs(items)
      setLoaded(true)
    });
  };

  const handleChangePage = (currentPage) => {
    setLoaded(false)
    setBlogs([])
    setPage(parseInt(currentPage));
  };

  let componentToRender;
  console.log("CHECKING IF LOADED")
  console.log(loaded)
  if (loaded == false) {
    console.log("SPINNER")
    componentToRender = <LoadingSpinner />;
  } else {
    console.log("CONTENT")
    componentToRender = <>
      <h3>Blogs</h3>
      <table>
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Content</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((item) => (
            <tr key={item.id}>
              <td>
                <p>{item.id} => {item.title}</p>
              </td>
              <td>
                {/* Render data from each item */}
                <p>{item.body}</p>
                {/* Add more elements as needed */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/*<Pagination page={page} pages={totalPages} handleChangePage={handleChangePage} />*/}
      <Pagination page={page} pages={totalPages} handleChangePage={handleChangePage} />
      {/* Component render with required props */}
    </>
  }

  return componentToRender;
};

export default BlogsPage;


