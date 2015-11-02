/** @jsx React.DOM */

var React = require('react'),
	ReactDOM = require('react-dom'),
	Board = require('./components/Board.react.js');

// Snag the initial state that was passed from the server side
//var initialState = JSON.parse(document.getElementById('initial-state').innerHTML)


// Render the components, picking up where react left off on the server
ReactDOM.render(
  <Board />,
  document.getElementById('react-app')
);