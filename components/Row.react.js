/** @jsx React.DOM */

var React = require('react');
var Block = require('./Block.react.js');

module.exports = Row = React.createClass({

	render(){
		var style={
			clear:"both",
			margin:"0",
			padding:"0",
			border:"1px"
		};

		var blocks = this.props.row.map( function( block, idx ){
			var key = "b" + this.key + "-" + idx;
			return <Block block={block} key={key} />
		});

		return <div style={style}>{blocks}</div>
	}
});