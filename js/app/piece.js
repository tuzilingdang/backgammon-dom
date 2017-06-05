define(["jquery"], function() {
	// 棋子构造函数
	function Piece( r ) {
		this.r =  r || 12 // 棋子半径
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
			$("#checker-board").append(fragment);
		},

		clear: function(pos) {
			var id = "#" + pos.x + "-" + pos.y + "-piece";
			$(id).remove();
		},
	}

	return Piece;
});