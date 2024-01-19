import axios from 'axios';
import { AxiosProvider, Request, Get, Delete, Head, Post, Put, Patch, withAxios } from 'react-axios'
import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from "prop-types";
import { useLocation, Link } from 'react-router-dom';
import { useParams } from "react-router-dom";

import LoadingSpinner,{
  ContainerSpinnerEnable,
  ContainerSpinnerDisable,
  InitialSpinnerDisable,
  InitialSpinnerEnable
} from '../components/loading_spinner.jsx'

const BlogPage = (props) => {
  const { id } = useParams()
  const API_PATH = "/api/v1/blogs/"

  const [blog, setBlog] = useState({attributes: {}});

  const [spinnerActive, setSpinnerActive] = useState(true)
  
  // call spinner fcts when spinner state changes.
  // useEffect(() => {
  //   if (spinnerActive) {
  //     ContainerSpinnerEnable()
  //   } else {
  //     ContainerSpinnerDisable()
  //   }
  // }, [spinnerActive]);

  function getAPIData() {
    return axios.get(
      `${API_PATH}/${id}/`, {headers: {Accept: 'application/json'}}
    ).then((response) => response.data)
  }

  // init blogs on page load
  useEffect(() => {
    InitialSpinnerEnable();
    fetchData();
  }, []);

  

  const fetchData = () => {
    getAPIData().then((item) => {
      setBlog(item.data);
      InitialSpinnerDisable();
    });
  };


  return <>
    <div className="row">
      <div className="col d-flex flex-grow-1  align-items-center">
        <Link className="btn btn-secondary" to="/game_blogs">Back to Blogs</Link>
      </div>
    </div>
    <LoadingSpinner>
      <section className="article p-4 border rounded">
          <div className="row">
            <div className="col col-md-4">
              <h2 className="article-title">{blog.attributes.title}</h2>
            </div>
            <div className="col">
              <div className="float-end">
                {/* tags*/}
              </div>
            </div>
          </div>

          <p className="article-body">{blog.attributes.body}</p>
      </section>
    </LoadingSpinner>
  </>
};

export default BlogPage;


