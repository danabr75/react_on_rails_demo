import axios from 'axios';
import { AxiosProvider, Request, Get, Delete, Head, Post, Put, Patch, withAxios } from 'react-axios'
import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from "prop-types";
// import Blogs from '../components/blogs.jsx';
import { useLocation, Link } from 'react-router-dom';

import Pagination from 'react-rails-pagination';
import LoadingSpinner from '../components/loading_spinner.jsx'

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

  const [spinnerActive, setSpinnerActive] = useState(true)

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
      setBlogs(items.data)
      setSpinnerActive(false)
    });
  };

  const handleChangePage = (currentPage) => {
    console.log("handleChangePage")
    setSpinnerActive(true)
    setPage(parseInt(currentPage));
  };

  let componentToRender;
  if (spinnerActive) {
    componentToRender = <LoadingSpinner />;
  } else {

    // blogs.map((blog) => {
    //   console.log(blog.attributes.platform_tags_limited);
    // })
    componentToRender = <>
      <div className="row">
        <div className="col d-flex flex-grow-1  align-items-center">
          <h3 className=" ">Blogs</h3>
        </div>
        <div className="col upper-pagination">
          <Pagination page={page} pages={totalPages} handleChangePage={handleChangePage} />
        </div>
      </div>

      {blogs.map((blog) => (
        <section key={blog.attributes.id} className="article p-4 border rounded">
          <div className="row">
            <h2 className="article-title col"><Link to={'/game_blogs/' + blog.attributes.id}>{blog.attributes.title}</Link></h2>
            <div className="col">
              <div className="float-end">
              (
              {blog.attributes.platform_tags_limited.map((platform) => (
                <span key={platform.id}>
                  {platform.name}
                </span>
              ))}
              {blog.attributes.genre_tags.map((genre) => (
                <span key={genre.id}>
                   {' '}| {genre.name}
                </span>
              ))}
              )
              </div>
            </div>
          </div>
          <p className="article-body">{blog.attributes.body_limited}</p>
        </section>
      ))}

      <div className="col d-flex flex-grow-1 justify-content-center align-items-center lower-pagination">
        <Pagination page={page} pages={totalPages} handleChangePage={handleChangePage} />
      </div>
      {/* Component render with required props */}
    </>
  }

  return componentToRender;
};

export default BlogsPage;


