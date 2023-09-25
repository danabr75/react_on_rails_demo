import axios from 'axios';
import { AxiosProvider, Request, Get, Delete, Head, Post, Put, Patch, withAxios } from 'react-axios'
import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from "prop-types";
import { useLocation, Link, useSearchParams } from 'react-router-dom';

import Pagination from 'react-rails-pagination';
import LoadingSpinner, {ContainerSpinnerEnable, ContainerSpinnerDisable, InitialSpinnerDisable} from '../components/loading_spinner.jsx'

// src: https://www.npmjs.com/package/multiselect-react-dropdown
import Multiselect from 'multiselect-react-dropdown';

// import queryString from 'query-string';
// const queryString = require('query-string');
let count = 0

const BlogsPage = (props) => {
  console.log("BlogsPage")
  const [firstLoad, setFirstLoad] = useState(true);
  console.log(count)
  
  const API_PATH = "/api/v1/blogs"

  // HOW TO THROW A STACKTRACE
  // const customError = new Error('This is a custom error message');
  // // Access the stack trace
  // const stackTrace = customError.stack;
  // console.error('Stack trace:', stackTrace);

  count = count + 1

  // get current page params
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialPage = searchParams.has('page') ? parseInt(searchParams.get('page')) : 1;

  // TODO support URL search
  const initialSearch = searchParams.get('initialSearch')

  const [page, setPage] = useState(initialPage);

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

  // we don't want the footer spinner to be active on page load,
  // so we're using 'undefined' as a 3rd state: page init.
  const [spinnerActive, setSpinnerActive] = useState(undefined)

  function getAPIData() {
    console.log("API DATA")
    let tag_ids = selectedTags.map((v) => v.id);

    let q = new URLSearchParams();

    q.set("page", page);
    q.set("per_page", perPage);

    tag_ids.forEach((tagId) => {
      q.append('search[tag_ids][]', tagId);
    });

    return axios.get(
      `${API_PATH}?${q.toString()}`,
      {
        headers: {Accept: 'application/json'},
      }
    ).then((response) => {
      console.log('API DATA END')
      return response.data
    })
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



  // call spinner fcts when spinner state changes.
  useEffect(() => {
    console.log("BlogsPage - spinner check")
    if (spinnerActive) {
      ContainerSpinnerEnable()
    } else {
      ContainerSpinnerDisable()
    }
  }, [spinnerActive]);

  useEffect(() => {
    console.log("FIRST LOAD")
    setFirstLoad(true)
  }, []);

  // When selecting tags, if not on page one, merely change to page 1 for refresh
  // - would need to anyway
  useEffect(() => {
    if (page == 1) {
      fetchTableData();
    } else {
      setPage(1)
    }
  }, [selectedTags]);

  useEffect(() => {
    console.log('fetchTableData - callback')
    // Kludge: Without this line, component will sometimes NOT
    //  pull correct page number from URL.
    setPage(page)
    fetchTableData();
  }, [firstLoad, page]);

  const fetchTableData = () => {
    console.log('fetchTableData')
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
    if (spinnerActive == false) {
      setSpinnerActive(true)
    }
    getAPIData().then((items) => {
      setSpinnerActive(false)
      setBlogs(items.data)
      InitialSpinnerDisable()
    });
  };

  const handleChangePage = (currentPage) => {
    if (page !== currentPage) {
      setPage(parseInt(currentPage));
    }
  };

  return (
    <>
      <div className="row">
        <div className="col col-md-2 d-flex align-items-center">
          <h3 className=" ">Blogs</h3>
        </div>
        <div className="col col-md-5 d-flex align-items-center">

          <form className="form-inline row">
            <div className="form-group col d-flex align-items-center">
              <input className="form-control" type="search" placeholder="Search" id="example-search-input"/>
            </div>
            <div className="form-group col d-flex align-items-center">
              <Multiselect
                className="form-control"
                options={tags} // Options to display in the dropdown
                selectedValues={selectedTags} // Preselected value to persist in dropdown
                onSelect={onSelect} // Function will trigger on select event
                onRemove={onRemove} // Function will trigger on remove event
                displayValue="name" // Property name to display in the dropdown options
                placeholder="Tags"
              />
            </div>
          </form>


        </div>
        <div className="col col-md-5 upper-pagination">
          {totalPages > 1 && <Pagination page={page} pages={totalPages} handleChangePage={handleChangePage} />}
        </div>
      </div>
      <LoadingSpinner>
        {blogs.map((blog) => (
          <section key={blog.attributes.id} className="article p-4 border rounded row">
            <div className="row">
              <h2 className="article-title col"><Link to={'/game_blogs/' + blog.attributes.id}>{blog.attributes.title}</Link></h2>
              <div className="col">
                <div className="float-end">
                  {blog.attributes.platform_tags_limited.map((platform) => (
                    <span key={platform.id} className="tag-button tag-platform">
                      {platform.name}
                    </span>
                  ))}
                  {blog.attributes.genre_tags.map((genre) => (
                    <span key={genre.id} className="tag-button tag-genre">
                       {genre.name}
                    </span>
                  ))}
                  <span className="additional-tags">
                    {blog.attributes.uncategorized_tags.map((tag) => (
                      <span key={tag.id} className="tag-button">
                         {tag.name}
                      </span>
                    ))}
                  </span>
                </div>
              </div>
            </div>
            <p className="article-body">{blog.attributes.body_limited}</p>
          </section>
        ))}
      </LoadingSpinner>
      <div className="col d-flex flex-grow-1 justify-content-center align-items-center lower-pagination">
        {totalPages > 1 && <Pagination page={page} pages={totalPages} handleChangePage={handleChangePage} />}
      </div>
    </>
  );
};

export default BlogsPage;


