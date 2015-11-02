/** @jsx React.DOM */

module.exports =  KeyEventer = {
	addKeyEvent( key, cb ){
		Mousetrap.bind( key, cb );
	},
	componentWillUnmount(){
		Mousetrap.reset();
	}
};