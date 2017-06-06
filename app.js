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
        spacing: 30, //格子间距
        margin: 10   //边框间距
    };

    var piece = { r : 12 };

    var backgammon = new Backgammon( checkerBoard, piece);
    backgammon.init();

    $("#start").click(function() {
        backgammon.init();
        backgammon.start();
        $("#start").unbind();
    })
});