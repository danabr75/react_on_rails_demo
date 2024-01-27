import React, {useState, useEffect} from 'react';
import SidebarTeam from '../components/sidebar_team.jsx';
import SidebarSponsor from '../components/sidebar_sponsor.jsx';
import SidebarSocial from '../components/sidebar_social.jsx';

const SideBar = props => {
  const sidebarClass = props.isOpen ? "open" : "";
  const sidebarHeaderClass = props.isOpen ? "sidebar-header open" : "sidebar-header";

  const [componentToRender, setComponentToRender] = useState(<SidebarTeam toggleSidebar={props.toggleSidebar} />);
  
  // 'tab-team' is the Default Tab, but means nothing; Will get overridden on tab clicks.
  const [activeComponentName, setActiveComponentName] = useState('tab-team');

  const [noirMode, setNoirMode] = useState(false);

  const sidebarChange = (sidebarName) => {
    if (sidebarName == 'sponsor') {
      setActiveComponentName('tab-sponsor')
      setComponentToRender(<SidebarSponsor toggleSidebar={props.toggleSidebar} />)
      props.toggleSidebar(sidebarName);
    } else if (sidebarName == 'social') {
      setActiveComponentName('tab-social')
      setComponentToRender(<SidebarSocial toggleSidebar={props.toggleSidebar} />)
      props.toggleSidebar(sidebarName);
    } else if (sidebarName == 'noir') {
      console.log("BEFORE NOIR")
      console.log(noirMode)
      setActiveComponentName('tab-noir')
      setNoirMode(!noirMode)
      console.log("AFTER NOIR")
      console.log(noirMode)
    } else {
      setActiveComponentName('tab-team')
      setComponentToRender(<SidebarTeam toggleSidebar={props.toggleSidebar} />)
      props.toggleSidebar(sidebarName);
    }
  };

// Noir Effect
// - Bug where noir is activated on page load. Checking tab name to compensate.
useEffect(() => {
  console.log("NOIR EFFECT EXECUTED")
  console.log(noirMode)
  if (activeComponentName == 'tab-noir') {
    if (noirMode) {
      $('.flip-container').addClass('flip')
      $('html').addClass('noir')
      $('.noir-text-hidden').addClass('active')
      // $('.tab-text').addClass('noir-text')
    } else {
      $('.flip-container').removeClass('flip')
      $('html').removeClass('noir')
      $('.noir-text-hidden').removeClass('active')
      // $('.tab-text').removeClass('noir-text')
    }
  }
}, [noirMode]);

  return (
    <>
      <div className={sidebarHeaderClass + " sidebar-tabs"}>
        <div className="header-toggle-content ">
          <div className="sidebar-tab flame-white-text" id='tab-team'>
            <button onClick={() => sidebarChange('team')} className="btn btn-info mt-3">
              &lt;&lt;
              <div className="tab-text float-end">
              Team
              </div>
            </button>
          </div>
          <div className="sidebar-tab flame-white-text" id='tab-sponsor'>
            <button onClick={() => sidebarChange('sponsor')} className="btn btn-info mt-3">
              &lt;&lt;
              <div className="tab-text float-end">
              Sponsor
              </div>
            </button>
          </div>
          <div className="sidebar-tab flame-white-text" id='tab-social'>
            <button onClick={() => sidebarChange('social')} className="btn btn-info mt-3">
              &lt;&lt;
              <div className="tab-text float-end">
              Socials
              </div>
            </button>
          </div>

          <div className="flip-container sidebar-tab flame-black-text" id='tab-noir'>
            <div className="flipper">
              <div className="front">
                <button onClick={() => sidebarChange('noir')} className="btn btn-info mt-3">
                  <span>&lt;&lt;</span>
                  <div className="tab-text float-end">
                    Noir
                  </div>
                </button>
              </div>
              <div className="back">
                <button onClick={() => sidebarChange('noir')} className="btn btn-info mt-3">
                  <span>&gt;&gt;</span>
                  <div className="tab-text float-end">
                    Noir
                  </div>
                </button>
              </div>
            </div>
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
