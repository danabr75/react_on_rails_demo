// DEMO
// function ExampleComponent(props) {
//   return (
//     <React.Fragment>
//     </React.Fragment>
//   );
// }
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from "prop-types";

class ExampleComponent extends React.Component {
  render() {
    console.log("aaaa?")
    return (
      <React.Fragment>
        The name of this component is: ExampleComponent
      </React.Fragment>
    );
  }
}

ExampleComponent.propTypes = {
  greeting: PropTypes.string
}

export default ExampleComponent;

