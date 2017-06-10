require.config({
    baseUrl: 'js/libs',
    paths: {
        app: '../app',
        backgammon: "../app/backgammon",
        checkerboard: "../app/checkerboard",
        piece: "../app/piece",
    }
});

// 开始 app 主逻辑.
require(["jquery", "backgammon"], function($, Backgammon) {
    var checkerBoard = {
        id: "checker-board",
        rows: 14, // 棋盘列数
        margin: 15, // 棋盘边框间距
        // gridLineColor: "#3dd849",
        // boardColor: "black"
    };
    var piece = {
        r : 10
    };

    var backgammon = new Backgammon(checkerBoard, piece);
    backgammon.init();

    $("#start").click(function() {
        backgammon.init();
        backgammon.start();
        $("#start").unbind();
    })
});