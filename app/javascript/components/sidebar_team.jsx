import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { AxiosProvider, Request, Get, Delete, Head, Post, Put, Patch, withAxios } from 'react-axios'

const SidebarTeam = () => {
  const API_PATH = "/api/v1/members/public_index"
  const [members, setMembers] = useState([]);

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
      setMembers(items.data)
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
        {members.map((member) => (
          <section key={member.attributes.id} className="">
            <div className="row">
              <div className="col">
                  <h2 className="article-title">
                    {member.attributes.title}
                    <br/>
                    {member.attributes.public_name}
                  </h2>
                  <img src={member.attributes.avatar_url} alt="Attached Image" width="100%" />
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>

  );
};

export default SidebarTeam;
