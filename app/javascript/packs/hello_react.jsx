// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

// import React from 'react'
// import ReactDOM from 'react-dom'
// import PropTypes from 'prop-types'


// document.addEventListener('DOMContentLoaded', () => {
//   ReactDOM.render(
//     <Hello name="React" />,
//     document.body.appendChild(document.createElement('div')),
//   )
// })


import HelloWorld from '../components/hello_world';
import ExampleComponent from '../components/example_component';
console.log("WHATY?")
// // This is how react_on_rails can see the HelloWorld in the browser.
// ReactOnRails.register({
//   HelloWorld,
// });