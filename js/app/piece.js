define(["jquery"], function() {
	// 棋子构造函数
	function Piece( r, boardId ) {
		this.r =  r || 10 , // 棋子半径
		this.id = boardId
	}

	Piece.prototype = {
		constructor: Piece,

		setPiecePos: function(pos) {
			this.x = pos.x;
			this.y = pos.y;
		},

		makePiece: function(name) {
			var div = document.createElement("div");
			div.className = name;
			div.style.width = this.r * 2 + "px";
			div.style.height = this.r * 2 + "px";
			return div;
		},

		draw: function(pos, color) {
			var fragment;
			if(color === "black") {
				fragment = this.makePiece("black");
			}
			else {
				fragment = this.makePiece("white");
			}
			fragment.style.position = "absolute";
			fragment.style.left = this.x  - this.r + "px";
			fragment.style.top = this.y - this.r + "px";
			fragment.id = pos.x + "-" + pos.y + "-piece";
			$("#" + this.id).append(fragment);
		},

		clear: function(pos) {
			var id = "#" + pos.x + "-" + pos.y + "-piece";
			$(id).remove();
		},
	}
	return Piece;
});