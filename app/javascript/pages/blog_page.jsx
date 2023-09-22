import axios from 'axios';
import { AxiosProvider, Request, Get, Delete, Head, Post, Put, Patch, withAxios } from 'react-axios'
import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from "prop-types";
import Blogs from '../components/blogs.jsx';
import { useLocation, Link } from 'react-router-dom';
import { useParams } from "react-router-dom";

import LoadingSpinner from '../components/loading_spinner.jsx'

const BlogPage = (props) => {
  const { id } = useParams()
  const API_PATH = "/api/v1/blogs/"

  const [blog, setBlog] = useState([]);

  const [spinnerActive, setSpinnerActive] = useState(true)

  function getAPIData() {
    return axios.get(
      `${API_PATH}/${id}/`, {headers: {Accept: 'application/json'}}
    ).then((response) => response.data)
  }

  // init blogs on page load
  useEffect(() => {
    fetchData()
  }, []);

  const fetchData = () => {
    getAPIData().then((item) => {
      setBlog(item.data)
      setSpinnerActive(false)
    });
  };


  let componentToRender;
  if (spinnerActive) {
    componentToRender = <LoadingSpinner />;
  } else {
    componentToRender = <>
      <div className="row">
        <div className="col d-flex flex-grow-1  align-items-center">
          <Link className="btn btn-secondary" to="/game_blogs">Back to Blogs</Link>
        </div>
      </div>
      <section className="article p-4 border rounded">
          <div className="row">
            <h2 className="article-title col">{blog.attributes.title}</h2>
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

          <p className="article-body">{blog.attributes.body}</p>
      </section>
      {/* Component render with required props */}
    </>
  }

  return componentToRender;
};

export default BlogPage;


