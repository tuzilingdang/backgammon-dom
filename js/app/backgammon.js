define("backgammon", ["jquery", "checkerboard", "piece"], function($, CheckerBoard, Piece) {
	// 五子棋构造函数
	function Backgammon(checkerBoard, piece) {
		this.checkerBoard = checkerBoard || {},
			this.piece = piece || {}
	}

	Backgammon.prototype = {
		constructor: Backgammon,

		// 初始化棋盘
		init: function() {
			$("#" + this.checkerBoard.id).html("");
			$("#start").removeClass("active");
			$(".mask").hide();
			$("#" + this.checkerBoard.id).unbind();
			$("#take-back").unbind();
			$("#put-back").unbind();

			this.setCheckerBoard(this.checkerBoard); // 设置棋盘属性
			this.setPiece(this.piece.r); //  设置棋子属性

			this.matrixWidth = (this.checkerBoard.width - 2 * this.checkerBoard.margin) / this.checkerBoard.spacing + 1; // 初始化矩阵长
			this.matrixHeight = (this.checkerBoard.height - 2 * this.checkerBoard.margin) / this.checkerBoard.spacing + 1; // 初始化矩阵宽
		},

		// 设置棋盘属性
		setCheckerBoard:  function(board) {
			this.checkerBoard = new CheckerBoard(board);
			this.checkerBoard.init();
		},

		// 设置棋子属性
		setPiece: function(r) {
			this.piece = new Piece( r, this.checkerBoard.id );
		},
		
		// 开局
		start: function() {
			var that = this;
			$("#start").addClass("active");
			this.initStateMatrix(this.matrixWidth, this.matrixHeight);
			this.initHistoryMatrix(this.matrixWidth, this.matrixHeight);
			this.turnState = "X"; // turnState标记走棋顺序，X 代表黑棋， O 代表白棋
			this.count = 0;
			// this.timeCount();

			$("#" + this.checkerBoard.id).click(function(e) {
				that.placePiece(e);
			});

			$("#take-back").click(function() {
				that.takeBackPiece();
			});

			$("#put-back").click(function() {
				that.putBackPiece();
			});

		},

		// 初始化记录棋局状态的矩阵
		initStateMatrix: function(width, height) {
			this.stateMatrix = new Array();
			for (var i = 0; i < width; i++) {
				this.stateMatrix[i] = new Array();
				for (var j = 0; j < height; j++) {
					this.stateMatrix[i][j] = "null";
				}
			}
		},

		// 初始化记录历史状态的矩阵
		initHistoryMatrix: function(width, height) {
			this.historyMatrix = new Array();
			for (var i = 0; i < width + 1; i++) {
				this.historyMatrix[i] = new Array();
				for (var j = 0; j < height + 1; j++) {
					this.historyMatrix[i][j] = "null";
				}
			}
		},

		// 落子改变矩阵状态
		changeStateMatrix: function() {
			this.stateMatrix[this.statePos.x][this.statePos.y] = this.turnState;
			this.historyMatrix[this.statePos.x][this.statePos.y] = this.turnState;
		},

		// 放置棋子
		placePiece: function(e) {
			var color = (this.turnState === "X") ? "black" : "white";
			if (e) {
				this.mousePos = this.checkerBoard.getMousePos(e);
				this.statePos = this.checkerBoard.getStateCoordinate(e);
			}

			if (this.statePos.x >= 0 && this.statePos.y >= 0) {
				if (this.stateMatrix[this.statePos.x][this.statePos.y] === "null") {
					this.piece.setPiecePos(this.mousePos);
					this.piece.draw(this.statePos, color);
					this.changeStateMatrix();

					switch (this.caculateWinner(this.statePos)) {
						case "N":
							this.turnState = (this.turnState === "X") ? "O" : "X";
							break;
						case "D":
							this.drawn();
							break;
						case "X":
							this.gameOver("X");
							break;
						case "O":
							this.gameOver("O");
							break;
						default:
							break;
					}
				}
			}
		},

		// 检察游戏是否获胜并返回获胜方
		caculateWinner: function(pos) {
			var that = this;
			var player = that.stateMatrix[pos.x][pos.y];

			// 判断是否和棋
			function checkDrawn() {
				for (var i = 0; i < that.matrixWidth; i++) {
					for (var j = 0; j < that.matrixHeight; j++) {
						if (that.stateMatrix[i][j] === "null") {
							return false;
						}
					}
				}
				return true;
			}
			// 判断水平方向是否有连棋
			function checkHorizon() {
				var count = 0;
				for (var i = 1; i < 5; i++) {
					if ((pos.x - i) >= 0) {
						if ((that.stateMatrix[pos.x - i][pos.y] === player)) {
							count++;
						}
					}
				}

				for (var i = pos.x + 1; i < 5 - count + pos.x; i++) {
					if (i >= that.matrixWidth) {
						return false;
					} else {
						if (that.stateMatrix[i][pos.y] !== player) {
							return false;
						}
					}
				}
				return true;
			}
			// 判断竖直方向是否有连棋
			function checkVertical() {
				var count = 0;
				for (var j = 1; j < 5; j++) {
					if ((pos.y - j) >= 0) {
						if ((that.stateMatrix[pos.x][pos.y - j] === player)) {
							count++;
						}
					}
				}

				for (var j = pos.y + 1; j < 5 - count + pos.y; j++) {
					if (j >= that.matrixHeight) {
						return false;
					} else {
						if (that.stateMatrix[pos.x][j] !== player) {
							return false;
						}
					}

				}
				return true;
			}
			// 判断斜向方向是否有连棋
			function checkDiagonal() {
				var count = 0;
				for (var j = 1; j < 5; j++) {
					if ((pos.y - j) >= 0 && (pos.x - j) >= 0) {
						if ((that.stateMatrix[pos.x - j][pos.y - j] === player)) {
							count++;
						}
					}
				}
				for (var j = 1; j < 5 - count; j++) {
					if ((j + pos.y >= that.matrixHeight) || (j + pos.x >= that.matrixHeight)) {
						return false;
					} else {
						if (that.stateMatrix[pos.x + j][pos.y + j] !== player) {
							return false;
						}
					}
				}
				return true;
			}
			// 判断反斜向方向是否有连棋
			function checkReverseDiagonal() {
				var count = 0;
				for (var j = 1; j < 5; j++) {
					if ((pos.y - j) >= 0 && (j + pos.x) < that.matrixWidth) {
						if ((that.stateMatrix[pos.x + j][pos.y - j] === player)) {
							count++;
						}
					}
				}
				for (var j = 1; j < 5 - count; j++) {
					if (((j + pos.y) >= that.matrixHeight) || ((pos.x - j) < 0)) {
						return false;
					} else {
						if (that.stateMatrix[pos.x - j][pos.y + j] !== player) {
							return false;
						}
					}
				}
				return true;
			}

			if (!checkDrawn()) {
				if (checkHorizon() || checkVertical() || checkDiagonal() || checkReverseDiagonal()) {
					return player;
				} else {
					return "N";
				}
			} else {
				return "D";
			}
		},

		drawn: function() {
			$("#timer").html(player + "获胜，游戏结束");
			$(".mask").show();
		},

		gameOver: function(player) {
			var that = this;
			if (player) {
				if (player === "X") {
					player = "黑方"
				}
				if (player === "O") {
					player = "白方"
				}
				$("#timer").html(player + "获胜，游戏结束");
				$(".mask").show();
				// alert(player + "获胜，游戏结束");
			}
			$("#restart").click(function() {
				that.init();
				that.start();
				$("#start").unbind();
			})
		},

		// 回到上一步
		takeBackPiece: function() {
			var that = this;
			this.piece.clear(this.statePos);
			this.stateMatrix[this.statePos.x][this.statePos.y] = "null";
			this.turnState = (this.turnState === "X") ? "O" : "X";
		},

		// 撤销悔棋
		putBackPiece: function() {
			var that = this;
			var historyState = this.historyMatrix[this.statePos.x][this.statePos.y];
			var color = (historyState === "X") ? "black" : "white";
			this.piece.draw(this.statePos, color);
			this.stateMatrix[this.statePos.x][this.statePos.y] = historyState;
			this.turnState = (historyState === "X") ? "O" : "X";
		},

		timeCount: function() {
			var that = this;
			$("#timer").html(this.count + "s");
			this.count = this.count + 1;
			this.t = setTimeout(that.timeCount(), 1000)
		},

		stopCount: function() {
			this.count = 0;
			setTimeout($("'#timer").html("Game Over"), 0);
			clearTimeout(this.t);
		}
	}

	return Backgammon;
});