// ex usage:
//
// // Use setSpinnerActive to enable,disable spinner
// const [spinnerActive, setSpinnerActive] = useState(true)
//
// // call spinner fcts when spinner state changes.
// useEffect(() => {
//   if (spinnerActive) {
//     ContainerSpinnerEnable()
//   } else {
//     ContainerSpinnerDisable()
//   }
// }, [spinnerActive]);
//
// let componentToRender;
// if (spinnerActive) {
//   componentToRender = <LoadingSpinner />;
// } else {
//   componentToRender = // Normal content
// }
// return componentToRender;

import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';

export const ContainerSpinnerEnable = () => {
  $('.loading-spinner-content').addClass("element-overlay")
  // $('.spinner-container').removeClass("spinner-hidden")
}
export const ContainerSpinnerDisable = () => {
  $('.loading-spinner-content').removeClass("element-overlay")
  // $('.spinner-container').addClass("spinner-hidden")
}

export const InitialSpinnerDisable = () => {
  console.log("hiding initial spinner")
  $('#initial-page-loading-spinner').addClass("hidden")
}

const LoadingSpinner = (props) => {
  useEffect(() => {
    // Mount Event
    return () => {
      // Component unmount event.
      ContainerSpinnerDisable()
    }
  }, []);

  return (
    <>
      <div id="initial-page-loading-spinner" className="spinner-container">
        <div className="spinner-spacer">
        </div>

        <div className="d-flex flex-column">
          <div className="d-flex flex-grow-1 justify-content-center align-items-center">

              <div className="spinner-outer">
                <div className="spinner-inner heart text-primary" role="status">
                </div>
              </div>

              <div className="spinner-outer spinner-reverse">
                <div className="spinner-inner hot-tub text-primary" role="status">
                </div>
              </div>

              <div className="spinner-outer">
                <div className="spinner-inner thumbs-up text-primary" role="status">
                </div>
              </div>


          </div>
        </div>
      </div>

      {/*Start with overlay*/}
      <div className="loading-spinner-content element-overlay">
        {props.children}
      </div>
    </>
  )
};

export default LoadingSpinner;