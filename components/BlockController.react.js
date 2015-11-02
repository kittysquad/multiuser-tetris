/** @jsx React.DOM */

var blocks = [
				[
					[
						[1],
						[1],
						[1],
						[1]
					],
					[
						[1,1,1,1]
					],
				],
				[
					[
						[1,1],
						[1,1]
					]
				],
				[
					[
						[1,1,0],
						[0,1,1]
					],
					[
						[0,1],
						[1,1],
						[1,0]
					]
				],
				[
					[
						[0,1,1],
						[1,1,0]
					],
					[
						[1,0],
						[1,1],
						[0,1]
					]
				],
				[
					[
						[0,1,0],
						[1,1,1]
					],
					[
						[1,0],
						[1,1],
						[1,0]
					],
					[
						[1,1,1],
						[0,1,0]
					],
					[
						[0,1],
						[1,1],
						[0,1]
					]
				],
				[
					[
						[1,1],
						[0,1],
						[0,1]
					],
					[
						[0,0,1],
						[1,1,1]
					],
					[
						[1,0],
						[1,0],
						[1,1]
					],
					[
						[1,1,1],
						[1,0,0]
					]
				],
				[
					[
						[1,1],
						[1,0],
						[1,0]
					],
					[
						[1,1,1],
						[0,0,1]
					],
					[
						[0,1],
						[0,1],
						[1,1]
					],
					[
						[1,0,0],
						[1,1,1]
					]
				]
			];

module.exports = BlockController = {
	getInitialState: function(){
		var ret = {
			currblock: null,
			currblockshape: 0, 
			currblockposition:{x : 0, y: 0}
		};

		return ret;
	},
	hitCheck( currblock, c_x, c_y ){

		// board size check
		if( c_y >= this.state.row ) return false;
		if( c_x < 0 || c_x + currblock[0].length > this.state.col ) return false;

		// hit check
		for( var y = currblock.length - 1 ; y >= 0 ; -- y ){
			var block_y =  ( currblock.length - 1 ) - y;

			if(  c_y < block_y ) return true;

			for( var x = 0 ; x < currblock[0].length ; ++ x ){

				if( currblock[ y ][ x ] == 1 && 
					this.state.boardState[ c_y - block_y ][ c_x + x ] != 0 ){
					return false;
				}
			}
		}

		return true;

	},
	newBlock(){

		var currblock_idx = Math.ceil( ( Math.random() * 100 ) % ( blocks.length ) ) - 1;

		this.state.currblock = blocks[ currblock_idx ];
		this.state.currblockposition.x = parseInt( this.state.col /2 - this.state.currblock[0].length / 2 );
		this.state.currblockposition.y = -1;
		this.state.currblockshape = 0;
		
	},
	downBlock(){
		return this.moveBlock( 0, 1 );
	},
	shapeChange(){
		var currblock = this.state.currblock[this.state.currblockshape];
		var c_y = this.state.currblockposition.y;
		var c_x = this.state.currblockposition.x;

		// clean
		this.drawToBoard( 0 , currblock, c_x, c_y );

		// check
		if( !this.hitCheck( this.state.currblock[( this.state.currblockshape + 1 ) % this.state.currblock.length],
							c_x, c_y ) ) {
			this.drawToBoard( 1 , currblock, c_x, c_y );			
			return;
		}

		// Change shape
		this.state.currblockshape = ( this.state.currblockshape + 1 ) % this.state.currblock.length;

		currblock = this.state.currblock[this.state.currblockshape];
		this.drawToBoard( 1, currblock, c_x, c_y );

	},
	moveBlock( v_x, v_y ){
		var currblock = this.state.currblock[this.state.currblockshape];
		var c_y = this.state.currblockposition.y;
		var c_x = this.state.currblockposition.x;

		// check
		if( c_y + v_y >= this.state.row ) return false;
		if( c_x + v_x < 0 || c_x + v_x + currblock[0].length -1 >= this.state.col ) return false;

		// clean
		this.drawToBoard( 0 , currblock, c_x, c_y );

		if( !this.hitCheck( currblock, c_x + v_x, c_y + v_y ) ) {
			this.drawToBoard( 1 , currblock, c_x, c_y );			
			return false;
		}

		// draw
		c_y = this.state.currblockposition.y = c_y + v_y;
		c_x = this.state.currblockposition.x = c_x + v_x;

		this.drawToBoard( 1, currblock, c_x, c_y );

		return true;
	},
	drawToBoard( num, currblock, c_x, c_y ) {

		for( var y = currblock.length - 1 ; y >= 0 ; -- y ){
			var block_y =  ( currblock.length - 1 ) - y;

			if(  c_y < block_y ) break;

			for( var x = 0 ; x < currblock[0].length ; ++ x ){

				if( currblock[ y ][ x ] == 1 ){
					this.state.boardState[ c_y - block_y ][ c_x + x ] = num;
					
				}
			}
		}

	},
	checkGameOver(){
		var currblock = this.state.currblock[this.state.currblockshape];
		var c_y = this.state.currblockposition.y;

		// check
		if( c_y - currblock.length < 0 ) return true;
		else return false;
	},
	removeCompleteLine(){

		var score = 0;
		var y = this.state.row - 1;

		while( y >= 0 ){

			// check
			var isComplete = true;
			for( var x = 0 ; x < this.state.col; ++ x ){
				if( 0 == this.state.boardState[y][x] ){
					isComplete = false;
					break;
				}
			}

			// move down
			if( isComplete ){
				for( var mv_y = y -1 ; mv_y >= 0 ; -- mv_y ){
					this.state.boardState[mv_y + 1 ] = this.state.boardState[mv_y];
				}
				this.state.boardState[0] = new Array();
				for( var j = 0 ; j < this.state.col ; ++ j ){
					this.state.boardState[0].push( 0 );
				}
				++score ;
			}else{
				y = y - 1;
			}
		}

		return score;
	}
};