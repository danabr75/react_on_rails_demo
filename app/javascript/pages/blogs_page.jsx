import axios from 'axios';
import { AxiosProvider, Request, Get, Delete, Head, Post, Put, Patch, withAxios } from 'react-axios'
import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from "prop-types";
// import Blogs from '../components/blogs.jsx';
import { useLocation, Link, useSearchParams } from 'react-router-dom';

import Pagination from 'react-rails-pagination';
import LoadingSpinner, {ContainerSpinnerEnable, ContainerSpinnerDisable} from '../components/loading_spinner.jsx'

// src: https://www.npmjs.com/package/multiselect-react-dropdown
import Multiselect from 'multiselect-react-dropdown';

// import queryString from 'query-string';
// const queryString = require('query-string');

const BlogsPage = (props) => {
  const API_PATH = "/api/v1/blogs"

  // get current page params
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialPage = searchParams.has('page') ? parseInt(searchParams.get('page')) : undefined;

  // TODO support URL search
  const initialSearch = searchParams.get('initialSearch')

  const [page, setPage] = useState(initialPage || 1);
  const [totalBlogsCount, setTotalBlogsCount] = useState(1);
  const perPage = 30;
  const [totalPages, setTotalPages] = useState(1);

  // Tag Search
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  // const fetchTableData = () => {
  const onSelect = (selectedList, selectedItem) => {
    setSelectedTags([...selectedTags, selectedItem]);
  }
  const onRemove = (selectedList, removedItem) => {
    setSelectedTags(selectedTags.filter(item => item.id !== removedItem.id))
  }

  // const [searchParams, setSearchParams] = useSearchParams();


  const [blogs, setBlogs] = useState([]);

  const [spinnerActive, setSpinnerActive] = useState(true)

  // call spinner fcts when spinner state changes.
  useEffect(() => {
    if (spinnerActive) {
      ContainerSpinnerEnable()
    } else {
      ContainerSpinnerDisable()
    }
  }, [spinnerActive]);

  function getAPIData() {
    console.log("API DATA")
    let tag_ids = selectedTags.map((v) => v.id);

    let q = new URLSearchParams();

    q.set("page", page);
    q.set("per_page", perPage);

    tag_ids.forEach((tagId) => {
      q.append('search[tag_ids][]', tagId);
    });

    // q.set("filters[]", '{name: "first", value: "1"}');
    // q.append("filters[]", '{name: "second", value: "2"}');

    return axios.get(
      `${API_PATH}?${q.toString()}`,
      {
        headers: {Accept: 'application/json'},
      }
    ).then((response) => response.data)
  }

  function getAPIMeta() {
    let q = new URLSearchParams();
    let tag_ids = selectedTags.map((v) => v.id);
    console.log(tag_ids)
    tag_ids.forEach((tagId) => {
      q.append('search[tag_ids][]', tagId);
    });

    return axios.get(
      `${API_PATH}/meta?${q.toString()}`,
      {
        headers: {Accept: 'application/json'},
      }
    )
    .then((response) => response.data)
  }

  // // init blogs on page load
  // // - appears to not be needed. The page listener is triggered on load.
  // useEffect(() => {
  //   fetchTableData()
  // }, []);

  // update blogs on page change
  useEffect(() => {
    fetchTableData()
  }, [page]);

  // reset page on tag change
  useEffect(() => {
    // if page already 1, then manually fetch
    if (page == 1) {
      fetchTableData();
    } else {
      setPage(1);
    }
  }, [selectedTags]);

  const fetchTableData = () => {
    getAPIMeta().then((meta) => {
      console.log("META")
      console.log(meta)
      setTotalPages(
        Math.ceil(
          meta.total_count / perPage
        )
      )
      setTags(meta.tags)
    });
    getAPIData().then((items) => {
      setBlogs(items.data)
      setSpinnerActive(false)
    });
  };

  const handleChangePage = (currentPage) => {
    if (page !== currentPage) {
      setSpinnerActive(true)
      setPage(parseInt(currentPage));
    }
  };


  let componentToRender;
  if (spinnerActive) {
    componentToRender = <LoadingSpinner />;
  } else {
    componentToRender = <>
      <div className="row">
        <div className="col d-flex flex-grow-1  align-items-center">
          <h3 className=" ">Blogs</h3>
        </div>
        <div className="col d-flex flex-grow-1 align-items-center">
          {/*// Tag Search*/}
          {/*
          const [tags, setTags] = useState([]);
          const [selectedTags, setSelectedTags] = useState([]);*/}
          <Multiselect
          options={tags} // Options to display in the dropdown
          selectedValues={selectedTags} // Preselected value to persist in dropdown
          onSelect={onSelect} // Function will trigger on select event
          onRemove={onRemove} // Function will trigger on remove event
          displayValue="name" // Property name to display in the dropdown options
          />

        </div>
        <div className="col upper-pagination">
          {totalPages > 1 && <Pagination page={page} pages={totalPages} handleChangePage={handleChangePage} />}
        </div>
      </div>

      {blogs.map((blog) => (
        <section key={blog.attributes.id} className="article p-4 border rounded row">
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
        {totalPages > 1 && <Pagination page={page} pages={totalPages} handleChangePage={handleChangePage} />}
      </div>
      {/* Component render with required props */}
    </>
  }

  return componentToRender;
};

export default BlogsPage;


