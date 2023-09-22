import React from 'react';
import ReactDOM from 'react-dom';


export const StyleSpinnerOnRootContainerEnable = () => {
  // $('#root-container').addClass("spinner-shrink")
}
export const StyleSpinnerOnRootContainerDisable = () => {
  // $('#root-container').removeClass("spinner-shrink")
}

const LoadingSpinner = () => {
  return <div className="spinner">Loading...</div>;
};

export default LoadingSpinner;