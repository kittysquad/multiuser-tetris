/** @jsx React.DOM */

var React 			= require('react');

var Row 			= require('./Row.react.js');
var IntevalGen 		= require('./IntevalGen.react.js');
var KeyEventer 		= require('./KeyEventer.react.js');
var BlockController = require('./BlockController.react.js');

module.exports = Board = React.createClass({

	mixins: [IntevalGen, KeyEventer, BlockController ],

	socket: null,
	sendBoardstatetoServer(){
		this.socket.emit("boardstate", JSON.stringify(this.state.boardState) );
	},
	updateBoardState( sync ){
		if( sync ) this.sendBoardstatetoServer();
		this.setState( { boardState: this.state.boardState } );
	},

	cleanBoard(){

		var boardState = new Array();
		var networkboardState = new Array();
		for( var i = 0 ; i < this.state.row; ++ i ){
			boardState[i] = new Array();
			networkboardState[i] = new Array();
			for( var j = 0 ; j < this.state.col ; ++ j ){
				boardState[i].push( 0 );
				networkboardState[i].push( 0 );
			}
		}

		this.setState( { boardState: boardState, networkboardState: networkboardState, count: 0 } );

	},
	getInitialState: function(){
		var ret = {
			count: 0,
			col: 10,
			row: 15
		};
		return ret;
	},
	componentWillMount(){

		// Connect to Server
		this.socket = io();
		this.socket.on('boardstate', function(msg){
			this.setState( { networkboardState: eval( msg ) } );
	  	}.bind(this));

		// Add Key event
		this.addKeyEvent( "left", function( e, combo ){
			this.moveBlock( -1, 0 );
			this.updateBoardState();
		}.bind(this) );
		this.addKeyEvent( "right", function( e, combo ){
			this.moveBlock( 1, 0 );
			this.updateBoardState();
		}.bind(this));
		this.addKeyEvent( "up", function( e, combo ){
			this.shapeChange();
			this.updateBoardState();
		}.bind(this));
		this.addKeyEvent( "down", function( e, combo ){
			this.nextStep();
		}.bind(this));
		this.addKeyEvent( "space", function( e, combo ){
			this.gotoBottom();
		}.bind(this));

		// Clean board
		this.cleanBoard();

		// New block
		this.newBlock();

	},
	componentDidMount(){
	},
	componentWillUnmount(){
	},

	nextStep(){
		if( !this.downBlock() ){
			// Check End
			if( this.checkGameOver() ){
				alert("Game Over");
				this.cleanBoard();
			}else{
				var score = this.removeCompleteLine();
				if( 0 < score ){
					this.setState( { count: this.state.count + score } );
				}
				this.newBlock();
			}
		}
		this.updateBoardState( true );
	},
	gotoBottom(){
		while( this.downBlock() ){}

		// Check End
		if( this.checkGameOver() ){
			alert("Game Over");
			this.cleanBoard();
		}else{
			var score = this.removeCompleteLine();
			if( 0 < score ){
				this.setState( { count: this.state.count + score } );
			}
			this.newBlock( true );
		}
	
		this.updateBoardState();
	},

	onTimeout: function(){
		this.nextStep();
		
	},
	render: function(){
		var style={
			float:"left",
			margin:"1px",
			padding:"0"
		};

		var board = this.state.boardState.map( function( row, idx ){
			var key = "r" + idx;
			return <Row row={row} key={key} />
		} );

		var networkBoard = this.state.networkboardState.map( function( row, idx ) {
			var key = "remote_r" + idx;
			return <Row row={row} key={key} />
		});

		return( 
				<div className="contatiner" >
					<h1>
					{this.props.name} Tetris  Score : [ {this.state.count} ]
					</h1>
					<div style={style}>
						{board}
					</div>
					<div style={style}>
						{networkBoard}
					</div>
				</div>
			);
	}

});