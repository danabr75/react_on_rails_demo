import React from "react";
console.log("EXPORTING SIDEBARR")
const SideBar = props => {
  const sidebarClass = props.isOpen ? "open" : "";
  const sidebarHeaderClass = props.isOpen ? "sidebar-header open" : "sidebar-header";

  return (
    <>
      <header className={sidebarHeaderClass}>
        <span className="header-toggle-content">
          <button onClick={props.toggleSidebar} className="btn btn-info mt-3">
            &lt;&lt;
            Team
          </button>
        </span>
      </header>

      <div className={sidebarClass + ' sidebar bg-gradient'}>
        <div className="center-container">
          <button onClick={props.toggleSidebar} className="sidebar-toggle top btn btn-danger float-right">
            &gt;&gt;
          </button>
        </div>
        <div>
          <div> I slide into view </div>
          <div> Me Too! </div>
          <div> Me Three! </div>
        </div>
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
