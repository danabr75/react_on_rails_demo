import React, {useState, useEffect} from 'react';
import SidebarTeam from '../components/sidebar_team.jsx';
import SidebarSponsor from '../components/sidebar_sponsor.jsx';
import SidebarTest from '../components/sidebar_test.jsx';

const SideBar = props => {
  const sidebarClass = props.isOpen ? "open" : "";
  const sidebarHeaderClass = props.isOpen ? "sidebar-header open" : "sidebar-header";

  const [componentToRender, setComponentToRender] = useState(<SidebarTeam />);

  const sidebarChange = (sidebarName) => {
    if (sidebarName == 'sponsor') {
      setComponentToRender(<SidebarSponsor />)
    } else if (sidebarName == 'test') {
      setComponentToRender(<SidebarTest />)
    } else {
      setComponentToRender(<SidebarTeam />)
    }
    props.toggleSidebar(sidebarName);
  };


  return (
    <>
      <div className={sidebarHeaderClass + " sidebar-tabs"}>
        <div className="header-toggle-content ">
          <div className="sidebar-tab" id='tab-team'>
            <button onClick={() => sidebarChange('team')} className="btn btn-info mt-3">
              &lt;&lt;
              <div className="tab-text float-end">
              Team
              </div>
            </button>
          </div>
          <div className="sidebar-tab" id='tab-sponsor'>
            <button onClick={() => sidebarChange('sponsor')} className="btn btn-info mt-3">
              &lt;&lt;
              <div className="tab-text float-end">
              Sponsor
              </div>
            </button>
          </div>
          <div className="sidebar-tab" id='tab-test'>
            <button onClick={() => sidebarChange('test')} className="btn btn-info mt-3">
              &lt;&lt;
              <div className="tab-text float-end">
              TEST
              </div>
            </button>
          </div>
        </div>
      </div>

      <div className={sidebarClass + ' sidebar bg-gradient'}>
        <div className="center-container">
          <button onClick={props.toggleSidebar} className="sidebar-toggle top btn btn-danger float-right">
            &gt;&gt;
          </button>
        </div>
        
        {componentToRender}
        <div className="center-container">
          <button onClick={props.toggleSidebar} className="sidebar-toggle bottom btn btn-danger float-right">
            &gt;&gt;
          </button>
        </div>
      </div>
    </>
  );
};
export default SideBar;
