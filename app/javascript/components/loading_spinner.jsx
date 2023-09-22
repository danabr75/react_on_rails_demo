// ex usage:
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


import React from 'react';
import ReactDOM from 'react-dom';


export const ContainerSpinnerEnable = () => {
  $('#root-container').addClass("spinner-active")
}
export const ContainerSpinnerDisable = () => {
  $('#root-container').removeClass("spinner-active")
}

const LoadingSpinner = () => {
  return <>
    <div className="spinner-container">
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
  </>
};

export default LoadingSpinner;