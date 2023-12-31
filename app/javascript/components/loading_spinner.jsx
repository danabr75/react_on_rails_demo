// ex usage:
//
// // Use setSpinnerActive to enable,disable spinner
// const [spinnerActive, setSpinnerActive] = useState(true)
//

// // Start initial spinner on main container
// useEffect(() => {
//   InitialSpinnerEnable();
//   yourAPIFunction().then((results) => {
//     ...
//     InitialSpinnerDisable();
//   });
// }, []);
//
// // Enable container overlay around the wrapped LoadingSpinner container
// // - if you have repeated API calls
// useEffect(() => {
//   if (spinnerActive) {
//     ContainerSpinnerEnable()
//   } else {
//     ContainerSpinnerDisable()
//   }
// }, [spinnerActive]);
//
// <LoadingSpinner>
//   <YourComponentHere>
// </LoadingSpinner>

import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';

export const ContainerSpinnerEnable = () => {
  console.log("ContainerSpinnerEnable")
  $('.loading-spinner-content').addClass("element-overlay")
  $('#footer-spinner-container').removeClass("hidden")
}
export const ContainerSpinnerDisable = () => {
  console.log("ContainerSpinnerDisable")
  $('.loading-spinner-content').removeClass("element-overlay")
  $('#footer-spinner-container').addClass("hidden")
}

export const InitialSpinnerDisable = () => {
  console.log("hiding initial spinner")
  $('#initial-page-loading-spinner').addClass("hidden")
  $('.loading-spinner-content').removeClass("hidden")
  $('#root-container').removeClass('spinner-for-content-active')
}
export const InitialSpinnerEnable = () => {
  $('.loading-spinner-content').addClass("hidden")
  $('#root-container').addClass('spinner-for-content-active')
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
                <div className="spinner-inner really text-primary" role="status">
                </div>
              </div>


          </div>
        </div>

        <div className="spinner-spacer">
        </div>
      </div>

      {/*Start with overlay*/}
      <div className="loading-spinner-content">
        {props.children}
      </div>

      <div id="footer-spinner-container" className="hidden">
        <div className="spinner-outer">
          <div className="spinner-inner really text-primary" role="status">
          </div>
        </div>
      </div>
    </>
  )
};

export default LoadingSpinner;