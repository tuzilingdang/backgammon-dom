## 五子棋

### DEMO
实现的五子棋效果可见demo： https://tuzilingdang.github.io/backgammon-dom/


### 开始

1. 下载文件或git clone 到本地
2. 浏览器打开index.html
3. 点击左上“开始”按钮, 否则无法add棋子


### 实现

DOM实现五子棋游戏

### 参数可调
棋盘和棋子的以下参数可以调节，调用backgammon前传入可控制棋盘的样式：

棋盘 checkboard：

       id //棋盘canvas元素的id

       rows // 棋盘列数

       margin // 棋盘边框间距

       gridLineColor // 格子线颜色

       boardColor // 棋盘背景颜色


 棋子 piece:
 
 	r // 棋子半径


### 兼容
支持移动端和PC浏览器使用；


### 技术细节

组合使用构造函数和原型模式，界面基于DOM操作实现，依赖jQuery／require.js .