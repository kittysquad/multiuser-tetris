/** @jsx React.DOM */

module.exports = IntevalGen = {

	setIntevel( ms ){
		this.fixed_ms = ms;
		setTimeout( this.__onTimeout, this.fixed_ms );

	},
	__onTimeout(){
		this.onTimeout();
		setTimeout( this.__onTimeout, this.fixed_ms );
	},
	componentDidMount(){
		this.setIntevel(1000);
	}

};