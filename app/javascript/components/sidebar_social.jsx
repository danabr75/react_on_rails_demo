import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { AxiosProvider, Request, Get, Delete, Head, Post, Put, Patch, withAxios } from 'react-axios'

const SidebarSocial = () => {
  const API_PATH = "/api/v1/socials/public_index"
  const [socials, setSocials] = useState([]);

  function getAPIData() {
    console.log("API DATA")


    return axios.get(
      `${API_PATH}`,
      {
        headers: {Accept: 'application/json'},
      }
    ).then((response) => {
      console.log('API DATA END')
      return response.data
    })
  };

  const fetchTableData = () => {
    console.log('fetchTableData')
    getAPIData().then((items) => {
      setSocials(items.data)
    });
  };

  useEffect(() => {
    console.log("FIRST LOAD")
    fetchTableData();
  }, []);

  return (
    <div id='tab-team ' className="tab-content">
      <div>
        {socials.map((social) => (
          <section key={social.attributes.id} className="">
            <div className="row">
              <div className="col">
                  <a href={social.attributes.external_url} target="_blank" rel="noopener">
                    <img src={social.attributes.avatar_url} alt="Attached Image" width="100%" />
                  </a>
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>

  );
};

export default SidebarSocial;
