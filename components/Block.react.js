/** @jsx React.DOM */
var React = require('react');

module.exports = Block = React.createClass({

   render(){
		var style={
			width:"40px",
			height:"40px",
			float:"left",
			margin:"0",
			padding:"0"
		};
		if( this.props.block == 0 ){
			style.backgroundColor = "#000000"
		}else{
			style.backgroundColor = "#FF0000"
		}
		return <div style={style} >&nbsp;&nbsp;&nbsp;</div>
	}

});