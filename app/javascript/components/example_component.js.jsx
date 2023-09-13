// DEMO
// function ExampleComponent(props) {
//   return (
//     <React.Fragment>
//     </React.Fragment>
//   );
// }
import React from 'react';
import ReactDOM from 'react-dom';

class ExampleComponent extends React.Component {
  render() {
    return (
      <div>
        <p>The name of this component is: ExampleComponent</p>
        {/* Other content of your component */}
      </div>
    );
  }
}

export default ExampleComponent;

