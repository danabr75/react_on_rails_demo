// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.
import 'semantic-ui-css/semantic.min.css'

import Rails from "@rails/ujs"
import Turbolinks from "turbolinks"
import * as ActiveStorage from "@rails/activestorage"
import "channels"

//= require react
//= require react_ujs
//= require components

// Import jQuery
import $ from 'jquery';
window.jQuery = $;
window.$ = $;

// Bootstrap CSS
//import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
//import "bootstrap/dist/js/bootstrap.bundle.min";

Rails.start()
Turbolinks.start()
ActiveStorage.start()