import axios from 'axios';
import { AxiosProvider, Request, Get, Delete, Head, Post, Put, Patch, withAxios } from 'react-axios'
import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from "prop-types";
// import Blogs from '../components/blogs.jsx';
import { useLocation, Link } from 'react-router-dom';

import Pagination from 'react-rails-pagination';
import LoadingSpinner, { StyleSpinnerOnRootContainerEnable, StyleSpinnerOnRootContainerDisable } from '../components/loading_spinner.jsx'

const BlogsPage = (props) => {
// const API_PATH = "/api/v1/blogs"
  const API_PATH = "/api/v1/blogs"

  // get current page params
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialPage = searchParams.get('page') ? parseInt(searchParams.get('page')) : undefined;

  const [page, setPage] = useState(initialPage || 1);
  const [totalBlogsCount, setTotalBlogsCount] = useState(1);
  const perPage = 30;
  const [totalPages, setTotalPages] = useState(1);
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

  // // init blogs on page load
  // // - appears to not be needed. The page listener is triggered on load.
  // useEffect(() => {
  //   fetchTableData()
  // }, []);

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
      StyleSpinnerOnRootContainerDisable()
    });
  };

  const handleChangePage = (currentPage) => {
    console.log("handleChangePage")
    setLoaded(false)
    StyleSpinnerOnRootContainerEnable()
    setPage(parseInt(currentPage));
  };

  let componentToRender;
  if (loaded == false) {
    componentToRender = <LoadingSpinner />;
  } else {
    componentToRender = <>
      <div className="row">
        <div className="col d-flex flex-grow-1  align-items-center">
          <h3 className=" ">Blogs</h3>
        </div>
        <div className="col">
          <Pagination page={page} pages={totalPages} handleChangePage={handleChangePage} />
        </div>
      </div>

      {blogs.map((item) => (
        <section key={item.id} className="article p-4 border rounded">
            <h2 className="article-title"><Link to={'/game_blogs/' + item.id}>{item.title}</Link></h2>
            <p className="article-body">{item.body}</p>
        </section>
      ))}

      <div className="col d-flex flex-grow-1 justify-content-center align-items-center">
        <Pagination page={page} pages={totalPages} handleChangePage={handleChangePage} />
      </div>
      {/* Component render with required props */}
    </>
  }

  return componentToRender;
};

export default BlogsPage;


