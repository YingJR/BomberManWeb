//import player.js
// const player = require('player');
var DIR = cc.Enum({
    None: 0,
    UP: 1,
    DOWN: 2,
    LEFT: 3,
    RIGHT: 4
});

cc.Class({
    'extends': cc.Component,

    properties: {
        speed: 2

    },

    // player: {
    //     default: null,
    //     type: player
    // },
    onLoad: function onLoad() {

        this.loadMap();
        this.player = this.node.getChildByName('player');
        var player1 = this.player;

        this.tiledMap = this.node.getComponent(cc.TiledMap);
        // var point = this.node.convertToNodeSpace(this.player.node.getPosition());

        var self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function onKeyPressed(keyCode, event) {
                var newTile = cc.p(self.playerTile.x, self.playerTile.y);
                switch (keyCode) {
                    case cc.KEY.up:
                        newTile.y -= 1;
                        break;
                    case cc.KEY.down:
                        newTile.y += 1;
                        break;
                    case cc.KEY.left:
                        newTile.x -= 1;
                        break;
                    case cc.KEY.right:
                        newTile.x += 1;
                        break;
                }

                self.tryMoveToNewTile(newTile);
            }
        }, self.node);
    },

    // tryMoveToNewTile: function(newTile) {
    //     var mapSize = this.tiledMap.getMapSize();
    //     if (newTile.x < 0 || newTile.x >= mapSize.width) return;
    //     if (newTile.y < 0 || newTile.y >= mapSize.height) return;

    //     if (this.barriers.getTileGIDAt(newTile)) {//GID=0,则该Tile为空
    //         cc.log('This way is blocked!');
    //         return false;
    //     }

    //     // this.tryCatchStar(newTile);

    //     this.playerTile = newTile;
    //     this.updatePlayerPos();

    //     if (cc.pointEqualToPoint(this.playerTile, this.endTile)) {
    //         cc.log('succeed');
    //     }
    // },

    //加载地图文件时调用
    loadMap: function loadMap() {

        //地图
        this.tiledMap = this.node.getComponent(cc.TiledMap);

        //players对象层
        var players = this.tiledMap.getObjectGroup('players');

        var player1Point = players.getObject('player1');
        var player1Pos = cc.p(player1Point.x, player1Point.y);
        // console.log(player1Pos);
        this.barriers = this.tiledMap.getLayer('障礙層');
        this.building = this.tiledMap.getLayer('建築層');
        //startPoint和endPoint对象
        // var startPoint = players.getObject('startPoint');
        // var endPoint = players.getObject('endPoint');

        //像素坐标
        // var startPos = cc.p(startPoint.x, startPoint.y);
        // var endPos = cc.p(endPoint.x, endPoint.y);

        //障碍物图层和星星图层
        // this.barriers = this.tiledMap.getLayer('barriers');
        // this.stars = this.tiledMap.getLayer('stars');

        //出生Tile和结束Tile
        this.playerTile = this.startTile = this.getTilePos(player1Pos);
        // console.log(this.playerTile);
        // this.endTile = this.getTilePos(endPos);
        this.player = this.node.getChildByName('player');
        //更新player位置
        this.updatePlayerPos();
    },

    tryMoveToNewTile: function tryMoveToNewTile(newTile) {
        var mapSize = this.tiledMap.getMapSize();
        if (newTile.x < 0 || newTile.x >= mapSize.width) return;
        if (newTile.y < 0 || newTile.y >= mapSize.height) return;

        // if (this.barriers.getTileGIDAt(newTile)) {//GID=0,则该Tile为空
        //     cc.log('This way is blocked!');
        //     return false;
        // }
        if (this.building.getTileGIDAt(newTile)) {
            //GID=0,则该Tile为空
            cc.log('This way is blocked!');
            return false;
        }

        this.playerTile = newTile;
        this.updatePlayerPos();
    },

    tryMove: function tryMove(dir) {
        var speed = this.speed;
        switch (dir) {
            case DIR.UP:
                this.player.y += speed;
                break;
            case DIR.DOWN:
                this.player.y -= speed;
                break;
            case DIR.LEFT:
                this.player.x -= speed;
                break;
            case DIR.RIGHT:
                this.player.x += speed;
                break;
        }
    },

    //将像素坐标转化为瓦片坐标
    getTilePos: function getTilePos(posInPixel) {
        var mapSize = this.node.getContentSize();
        var tileSize = this.tiledMap.getTileSize();
        var x = Math.floor(posInPixel.x / tileSize.width);
        var y = Math.floor((mapSize.height - posInPixel.y) / tileSize.height);
        return cc.p(x, y);
    },

    updatePlayerPos: function updatePlayerPos() {
        // var pos = this.barriers.getPositionAt(this.playerTile);
        var tileSize = this.tiledMap.getTileSize();
        var posX = this.playerTile.x * tileSize.width + tileSize.width / 2;
        var posY = -1 * (this.playerTile.y * tileSize.height + tileSize.height);
        // console.log(posX+":"+posY);
        // this.player.setPosition(pos);

        // var action = cc.moveTo(0.5, posX, posY);
        // 执行动作

        // this.player.runAction(action);

        this.player.x = posX;
        this.player.y = posY;

        // console.log(this.player.x);
    }

});