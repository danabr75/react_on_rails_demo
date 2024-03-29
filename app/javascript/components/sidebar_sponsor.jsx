import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { AxiosProvider, Request, Get, Delete, Head, Post, Put, Patch, withAxios } from 'react-axios'

const SidebarSponsor = () => {
  const API_PATH = "/api/v1/sponsors/public_index"
  const [sponsors, setSponsors] = useState([]);

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
      setSponsors(items.data)
    });
  };

  useEffect(() => {
    console.log("FIRST LOAD")
    fetchTableData();
  }, []);

  // useEffect(() => {
  //   console.log("FIRST LOAD")
  // }, []);
  return (
    <div id='tab-team ' className="tab-content">
      <div>
        {sponsors.map((sponsor) => (
          <section key={sponsor.attributes.id} className="">
            <div className="row">
              <div className="col">
                  <h2 className="article-title">
                    {sponsor.attributes.name}
                  </h2>
                  <p>
                    {sponsor.attributes.tagline}
                  </p>
                  <img src={sponsor.attributes.avatar_url} alt="Attached Image" width="100%" />
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>

  );
};

export default SidebarSponsor;
