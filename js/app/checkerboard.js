define(["jquery"], function($) {
	// 棋盘构造函数
	function CheckerBoard(board) {
		this.id = board.id;
		this.rows = board.rows || 14;
		this.margin = board.margin || 10;
		this.gridLineColor = board.gridLineColor || "#807d7d";
		this.boardColor = board.boardColor || "#EACE9F";
	}

	CheckerBoard.prototype = {
		constructor: CheckerBoard,

		// 初始化棋盘
		init: function() {
			$("#" + this.id).height($("#" + this.id).width());
			this.width = $("#" + this.id).width();
			this.height = $("#" + this.id).width();
			this.cols = this.rows;
			this.spacing = (this.width - this.margin * 2) / this.rows;

			this.fillBackgroundColor();
			this.drawGrid();
			this.drawBoardArc();
			this.drawBorder();
		},

		makeSquare: function() {
			var div = document.createElement("div");
			div.className = "square";
			div.style.width = this.spacing + "px";
			div.style.height = this.spacing + "px";
			div.style.display = "inline-block";
			div.style.verticalAlign = "top";
			div.style.border = "1px solid " + this.gridLineColor;
			div.style.borderBottom = "none";
			div.style.borderLeft = "none";
			return div;
		},

		makeDot: function(x, y, r) {
			var div = document.createElement("div");
			div.className = "dot";
			div.style.position = "absolute";
			div.style.left = x - r + "px"
			div.style.top = y - r + "px";
			div.style.width = 2 * r + "px";
			div.style.height = 2 * r + "px";
			div.style.borderRadius = 500 + "px";
			div.style.backgroundColor = "#000000";
			return div;
		},

		// 填充棋盘颜色
		fillBackgroundColor: function() {
			$("#" + this.id).css("background-color", this.boardColor);
		},

		// 绘制棋盘边框
		drawBorder: function() {
			var squarey = $(".first-y");
			var squarex = $(".first-x");
			squarey.css("border-left", "1px solid " + this.gridLineColor);
			squarex.css("border-bottom", "1px solid " + this.gridLineColor);
		},

		// 绘制棋盘格子
		drawGrid: function() {
			var fragment = document.createDocumentFragment();
			var row;

			for (var i = 0; i < this.rows; i++) {
				row = document.createElement("div");
				row.style.height = this.spacing + "px";
				row.style.width = this.spacing * this.rows + "px";
				row.style.marginLeft = this.margin + "px";
				row.style.borderLeft = "0.5px solid" + this.gridLineColor;
				row.style.borderRight = "0.5px solid" + this.gridLineColor;
				if ( i === 0 ) {
					row.style.marginTop = this.margin + "px";
					row.style.borderTop = "0.5px solid" + this.gridLineColor;		
				}
				if ( i == (this.rows -1) ) {
					row.style.borderBottom = "0.5px solid" + this.gridLineColor;	
				}
				row.className = "row";
				for (var j = 0; j < this.rows; j++) {
					var square = this.makeSquare();
					square.id = j + "-" + i;

					if (j === 0) {
						if (i === this.rows - 1) {
							square.className = "square first-y first-x";
						} else {
							square.className = "square first-y";
						}
						square.style.borderColor = this.gridLineColor;
						row.appendChild(square)
					} else if (i === this.rows - 1) {
						square = this.makeSquare();
						square.id = j + "-" + i;
						square.className = "square first-x";
						square.style.borderColor = this.gridLineColor;
						row.appendChild(square)
					} else {
						square.style.borderColor = this.gridLineColor;
						row.appendChild(square);
					}

				}
				fragment.appendChild(row);
			}
			document.querySelector("#" + this.id).appendChild(fragment);
		},

		// 绘制棋盘圆点
		drawBoardArc: function() {
			var that = this;
			var leftX = this.margin + this.spacing * 3,
				rightX = this.width - this.margin - this.spacing * 3;
			var topY = this.margin + this.spacing * 3,
				bottomY = this.height - this.margin - this.spacing * 3;
			var centerX = (this.width / 2).toFixed(2),
				centerY = (this.height / 2).toFixed(2);

			var fragment = document.createDocumentFragment();
			fragment.appendChild(this.makeDot(centerX, centerY, 4));
			fragment.appendChild(this.makeDot(leftX, topY, 4));
			fragment.appendChild(this.makeDot(leftX, bottomY, 4));
			fragment.appendChild(this.makeDot(rightX, topY, 4));
			fragment.appendChild(this.makeDot(rightX, bottomY, 4));
			$("#" + this.id).append(fragment);
		},

		// 获取鼠标点击位置相对于checker-board原点的像素坐标
		getMousePos: function(e) {
			var canvas = $("#" + this.id);
			var canvasPos = {
				x: canvas.offset().left + this.margin,
				y: canvas.offset().top + this.margin,
			};
			var mouseClientPos = {
				x: e.pageX,
				y: e.pageY
			};
			var x = (mouseClientPos.x - canvasPos.x) * this.width / canvas.width();
			var y = (mouseClientPos.y - canvasPos.y) * this.height / canvas.height();

			return {
				x: Math.round(x / this.spacing) * this.spacing + this.margin,
				y: Math.round(y / this.spacing) * this.spacing + this.margin
			};
		},

		// 落子获取状态矩阵坐标值
		getStateCoordinate: function(e) {
			var mousePos = this.getMousePos(e);
			return {
				x: Math.round(mousePos.x / this.spacing),
				y: Math.round(mousePos.y / this.spacing)
			};
		}
	}
	return CheckerBoard;
});