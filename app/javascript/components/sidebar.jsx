import React, {useState, useEffect} from 'react';
import SidebarTeam from '../components/sidebar_team.jsx';
import SidebarSponsor from '../components/sidebar_sponsor.jsx';
import SidebarSocial from '../components/sidebar_social.jsx';

const SideBar = props => {
  const sidebarClass = props.isOpen ? "open" : "";
  const sidebarHeaderClass = props.isOpen ? "sidebar-header open" : "sidebar-header";

  const [componentToRender, setComponentToRender] = useState(<SidebarTeam toggleSidebar={props.toggleSidebar} />);
  
  const [activeComponentName, setActiveComponentName] = useState('tab-team');

  const sidebarChange = (sidebarName) => {
    if (sidebarName == 'sponsor') {
      setActiveComponentName('tab-sponsor')
      setComponentToRender(<SidebarSponsor toggleSidebar={props.toggleSidebar} />)
    } else if (sidebarName == 'social') {
      setActiveComponentName('tab-social')
      setComponentToRender(<SidebarSocial toggleSidebar={props.toggleSidebar} />)
    } else {
      setActiveComponentName('tab-team')
      setComponentToRender(<SidebarTeam toggleSidebar={props.toggleSidebar} />)
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
          <div className="sidebar-tab" id='tab-social'>
            <button onClick={() => sidebarChange('social')} className="btn btn-info mt-3">
              &lt;&lt;
              <div className="tab-text float-end">
              Socials
              </div>
            </button>
          </div>
        </div>
      </div>

      <div id='sidebar-content' className={sidebarClass + ' sidebar bg-gradient ' + activeComponentName}>
        <div className="center-container">
          <button onClick={props.toggleSidebar} className="sidebar-toggle top btn btn-danger float-right">
            &gt;&gt;
          </button>
        </div>
        <div id='inner-sidebar-content'>
          {componentToRender}
        </div>
      </div>

    </>
  );
};
export default SideBar;
