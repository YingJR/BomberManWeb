require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"Map":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'f4c1ak70ARE+6V4yF+qZQe+', 'Map');
// Script\Map.js

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

cc._RFpop();
},{}],"ccPlayer":[function(require,module,exports){
"use strict";
cc._RFpush(module, '64178LJkpVDqYBdZujRuoGz', 'ccPlayer');
// Script\ccPlayer.js


var DIR = cc.Enum({
    None: 0,
    UP: 1,
    DOWN: 2,
    LEFT: 3,
    RIGHT: 4
});

cc.Class({
    "extends": cc.Component,

    properties: {

        id: 0,

        //移動速度
        velocity: 2,

        //最大炸彈數量
        bombsMax: 1,

        ///炸彈爆炸威力
        bombStrength: 1,

        facing: DIR.DOWN

    },

    // use this for initialization
    onLoad: function onLoad() {
        // this.setInputControl();
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
    update: function update(dt) {},

    getPlayerOntile: function getPlayerOntile() {

        return;
    },

    setInputControl: function setInputControl() {
        var self = this;
        //add keyboard input listener to jump, turnLeft and turnRight
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            // set a flag when key pressed
            onKeyPressed: function onKeyPressed(keyCode, event) {
                switch (keyCode) {
                    case cc.KEY.a:
                    case cc.KEY.left:

                        break;
                    case cc.KEY.d:
                    case cc.KEY.right:

                        break;
                }
            },
            // unset a flag when key released
            onKeyReleased: function onKeyReleased(keyCode, event) {
                switch (keyCode) {
                    case cc.KEY.a:
                    case cc.KEY.left:

                        break;
                    case cc.KEY.d:
                    case cc.KEY.right:

                        break;
                }
            }
        }, self.node);
    }

});

cc._RFpop();
},{}],"player":[function(require,module,exports){
"use strict";
cc._RFpush(module, '4c67bw/thlHl42LC/wbpDFK', 'player');
// Script\player.js

cc.Class({
    'extends': cc.Component,

    properties: {
        id: 0,
        velocity: 2, //Moving speed
        bombsMax: 1, //Max number of bombs user can spawn
        bombStrength: 1, //How far the fire reaches when bomb explodes
        alive: 0
    },

    // use this for initialization
    onLoad: function onLoad() {},

    init: function init(position, controls, id) {
        if (id) {
            this.id = id;
        }

        if (controls) {
            this.controls = controls;
        }

        var img = gGameEngine.playerBoyImg;
        if (!(this instanceof Bot)) {
            if (this.id == 0) {
                img = gGameEngine.playerGirlImg;
            } else {
                img = gGameEngine.playerGirl2Img;
            }
        }

        var spriteSheet = new createjs.SpriteSheet({
            images: [img],
            frames: { width: this.size.w, height: this.size.h, regX: 10, regY: 12 },
            animations: {
                idle: [0, 0, 'idle'],
                down: [0, 3, 'down', 0.1],
                left: [4, 7, 'left', 0.1],
                up: [8, 11, 'up', 0.1],
                right: [12, 15, 'right', 0.1],
                dead: [16, 16, 'dead', 0.1]
            }
        });
        this.bmp = new createjs.Sprite(spriteSheet);

        this.position = position;
        var pixels = Utils.convertToBitmapPosition(position);
        this.bmp.x = pixels.x;
        this.bmp.y = pixels.y;

        gGameEngine.stage.addChild(this.bmp);

        this.bombs = [];
        this.setBombsListener();
    },

    setBombsListener: function setBombsListener() {},

    update: function update() {
        if (!this.alive) {
            //this.fade();
            return;
        }
        if (gGameEngine.menu.visible) {
            return;
        }
        var position = { x: this.bmp.x, y: this.bmp.y };

        var dirX = 0;
        var dirY = 0;
        if (gInputEngine.actions[this.controls.up]) {
            this.animate('up');
            position.y -= this.velocity;
            dirY = -1;
        } else if (gInputEngine.actions[this.controls.down]) {
            this.animate('down');
            position.y += this.velocity;
            dirY = 1;
        } else if (gInputEngine.actions[this.controls.left]) {
            this.animate('left');
            position.x -= this.velocity;
            dirX = -1;
        } else if (gInputEngine.actions[this.controls.right]) {
            this.animate('right');
            position.x += this.velocity;
            dirX = 1;
        } else {
            this.animate('idle');
        }

        if (position.x != this.bmp.x || position.y != this.bmp.y) {
            if (!this.detectBombCollision(position)) {
                if (this.detectWallCollision(position)) {
                    // If we are on the corner, move to the aisle
                    var cornerFix = this.getCornerFix(dirX, dirY);
                    if (cornerFix) {
                        var fixX = 0;
                        var fixY = 0;
                        if (dirX) {
                            fixY = cornerFix.y - this.bmp.y > 0 ? 1 : -1;
                        } else {
                            fixX = cornerFix.x - this.bmp.x > 0 ? 1 : -1;
                        }
                        this.bmp.x += fixX * this.velocity;
                        this.bmp.y += fixY * this.velocity;
                        this.updatePosition();
                    }
                } else {
                    this.bmp.x = position.x;
                    this.bmp.y = position.y;
                    this.updatePosition();
                }
            }
        }

        if (this.detectFireCollision()) {
            this.die();
        }

        this.handleBonusCollision();
    },

    /**
     * Calculates and updates entity position according to its actual bitmap position
     */
    updatePosition: function updatePosition() {
        this.position = Utils.convertToEntityPosition(this.bmp);
    },

    /**
     * Returns true when collision is detected and we should not move to target position.
     */
    detectWallCollision: function detectWallCollision(position) {
        var player = {};
        player.left = position.x;
        player.top = position.y;
        player.right = player.left + this.size.w;
        player.bottom = player.top + this.size.h;

        // Check possible collision with all wall and wood tiles
        var tiles = gGameEngine.tiles;
        for (var i = 0; i < tiles.length; i++) {
            var tilePosition = tiles[i].position;

            var tile = {};
            tile.left = tilePosition.x * gGameEngine.tileSize + 25;
            tile.top = tilePosition.y * gGameEngine.tileSize + 20;
            tile.right = tile.left + gGameEngine.tileSize - 30;
            tile.bottom = tile.top + gGameEngine.tileSize - 30;

            if (gGameEngine.intersectRect(player, tile)) {
                return true;
            }
        }
        return false;
    },

    /**
     * Returns true when the bomb collision is detected and we should not move to target position.
     */
    detectBombCollision: function detectBombCollision(pixels) {
        var position = Utils.convertToEntityPosition(pixels);

        for (var i = 0; i < gGameEngine.bombs.length; i++) {
            var bomb = gGameEngine.bombs[i];
            // Compare bomb position
            if (bomb.position.x == position.x && bomb.position.y == position.y) {
                // Allow to escape from bomb that appeared on my field
                if (bomb == this.escapeBomb) {
                    return false;
                } else {
                    return true;
                }
            }
        }

        // I have escaped already
        if (this.escapeBomb) {
            this.escapeBomb = null;
        }

        return false;
    },

    detectFireCollision: function detectFireCollision() {
        var bombs = gGameEngine.bombs;
        for (var i = 0; i < bombs.length; i++) {
            var bomb = bombs[i];
            for (var j = 0; j < bomb.fires.length; j++) {
                var fire = bomb.fires[j];
                var collision = bomb.exploded && fire.position.x == this.position.x && fire.position.y == this.position.y;
                if (collision) {
                    return true;
                }
            }
        }
        return false;
    },

    /**
     * Checks whether we have got bonus and applies it.
     */
    handleBonusCollision: function handleBonusCollision() {
        for (var i = 0; i < gGameEngine.bonuses.length; i++) {
            var bonus = gGameEngine.bonuses[i];
            if (Utils.comparePositions(bonus.position, this.position)) {
                this.applyBonus(bonus);
                bonus.destroy();
            }
        }
    },

    /**
     * Applies bonus.
     */
    applyBonus: function applyBonus(bonus) {
        if (bonus.type == 'speed') {
            this.velocity += 0.8;
        } else if (bonus.type == 'bomb') {
            this.bombsMax++;
        } else if (bonus.type == 'fire') {
            this.bombStrength++;
        }
    },

    /**
     * Changes animation if requested animation is not already current.
     */
    animate: function animate(animation) {
        if (!this.bmp.currentAnimation || this.bmp.currentAnimation.indexOf(animation) === -1) {
            this.bmp.gotoAndPlay(animation);
        }
    },

    die: function die() {
        this.alive = false;

        if (gGameEngine.countPlayersAlive() == 1 && gGameEngine.playersCount == 2) {
            gGameEngine.gameOver('win');
        } else if (gGameEngine.countPlayersAlive() == 0) {
            gGameEngine.gameOver('lose');
        }

        this.bmp.gotoAndPlay('dead');
        this.fade();
    },

    fade: function fade() {
        var timer = 0;
        var bmp = this.bmp;
        var fade = setInterval(function () {
            timer++;

            if (timer > 30) {
                bmp.alpha -= 0.05;
            }
            if (bmp.alpha <= 0) {
                clearInterval(fade);
            }
        }, 30);
    }

});

cc._RFpop();
},{}]},{},["player","ccPlayer","Map"])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL0NvY29zQ3JlYXRvci9yZXNvdXJjZXMvYXBwLmFzYXIvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImFzc2V0cy9TY3JpcHQvTWFwLmpzIiwiYXNzZXRzL1NjcmlwdC9jY1BsYXllci5qcyIsImFzc2V0cy9TY3JpcHQvcGxheWVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiXCJ1c2Ugc3RyaWN0XCI7XG5jYy5fUkZwdXNoKG1vZHVsZSwgJ2Y0YzFhazcwQVJFKzZWNHlGK3FaUWUrJywgJ01hcCcpO1xuLy8gU2NyaXB0XFxNYXAuanNcblxuLy9pbXBvcnQgcGxheWVyLmpzXG4vLyBjb25zdCBwbGF5ZXIgPSByZXF1aXJlKCdwbGF5ZXInKTtcbnZhciBESVIgPSBjYy5FbnVtKHtcbiAgICBOb25lOiAwLFxuICAgIFVQOiAxLFxuICAgIERPV046IDIsXG4gICAgTEVGVDogMyxcbiAgICBSSUdIVDogNFxufSk7XG5cbmNjLkNsYXNzKHtcbiAgICAnZXh0ZW5kcyc6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgc3BlZWQ6IDJcblxuICAgIH0sXG5cbiAgICAvLyBwbGF5ZXI6IHtcbiAgICAvLyAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAvLyAgICAgdHlwZTogcGxheWVyXG4gICAgLy8gfSxcbiAgICBvbkxvYWQ6IGZ1bmN0aW9uIG9uTG9hZCgpIHtcblxuICAgICAgICB0aGlzLmxvYWRNYXAoKTtcbiAgICAgICAgdGhpcy5wbGF5ZXIgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoJ3BsYXllcicpO1xuICAgICAgICB2YXIgcGxheWVyMSA9IHRoaXMucGxheWVyO1xuXG4gICAgICAgIHRoaXMudGlsZWRNYXAgPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLlRpbGVkTWFwKTtcbiAgICAgICAgLy8gdmFyIHBvaW50ID0gdGhpcy5ub2RlLmNvbnZlcnRUb05vZGVTcGFjZSh0aGlzLnBsYXllci5ub2RlLmdldFBvc2l0aW9uKCkpO1xuXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgY2MuZXZlbnRNYW5hZ2VyLmFkZExpc3RlbmVyKHtcbiAgICAgICAgICAgIGV2ZW50OiBjYy5FdmVudExpc3RlbmVyLktFWUJPQVJELFxuICAgICAgICAgICAgb25LZXlQcmVzc2VkOiBmdW5jdGlvbiBvbktleVByZXNzZWQoa2V5Q29kZSwgZXZlbnQpIHtcbiAgICAgICAgICAgICAgICB2YXIgbmV3VGlsZSA9IGNjLnAoc2VsZi5wbGF5ZXJUaWxlLngsIHNlbGYucGxheWVyVGlsZS55KTtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGtleUNvZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBjYy5LRVkudXA6XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdUaWxlLnkgLT0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIGNjLktFWS5kb3duOlxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3VGlsZS55ICs9IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBjYy5LRVkubGVmdDpcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld1RpbGUueCAtPSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgY2MuS0VZLnJpZ2h0OlxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3VGlsZS54ICs9IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBzZWxmLnRyeU1vdmVUb05ld1RpbGUobmV3VGlsZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHNlbGYubm9kZSk7XG4gICAgfSxcblxuICAgIC8vIHRyeU1vdmVUb05ld1RpbGU6IGZ1bmN0aW9uKG5ld1RpbGUpIHtcbiAgICAvLyAgICAgdmFyIG1hcFNpemUgPSB0aGlzLnRpbGVkTWFwLmdldE1hcFNpemUoKTtcbiAgICAvLyAgICAgaWYgKG5ld1RpbGUueCA8IDAgfHwgbmV3VGlsZS54ID49IG1hcFNpemUud2lkdGgpIHJldHVybjtcbiAgICAvLyAgICAgaWYgKG5ld1RpbGUueSA8IDAgfHwgbmV3VGlsZS55ID49IG1hcFNpemUuaGVpZ2h0KSByZXR1cm47XG5cbiAgICAvLyAgICAgaWYgKHRoaXMuYmFycmllcnMuZ2V0VGlsZUdJREF0KG5ld1RpbGUpKSB7Ly9HSUQ9MCzliJnor6VUaWxl5Li656m6XG4gICAgLy8gICAgICAgICBjYy5sb2coJ1RoaXMgd2F5IGlzIGJsb2NrZWQhJyk7XG4gICAgLy8gICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgLy8gICAgIH1cblxuICAgIC8vICAgICAvLyB0aGlzLnRyeUNhdGNoU3RhcihuZXdUaWxlKTtcblxuICAgIC8vICAgICB0aGlzLnBsYXllclRpbGUgPSBuZXdUaWxlO1xuICAgIC8vICAgICB0aGlzLnVwZGF0ZVBsYXllclBvcygpO1xuXG4gICAgLy8gICAgIGlmIChjYy5wb2ludEVxdWFsVG9Qb2ludCh0aGlzLnBsYXllclRpbGUsIHRoaXMuZW5kVGlsZSkpIHtcbiAgICAvLyAgICAgICAgIGNjLmxvZygnc3VjY2VlZCcpO1xuICAgIC8vICAgICB9XG4gICAgLy8gfSxcblxuICAgIC8v5Yqg6L295Zyw5Zu+5paH5Lu25pe26LCD55SoXG4gICAgbG9hZE1hcDogZnVuY3Rpb24gbG9hZE1hcCgpIHtcblxuICAgICAgICAvL+WcsOWbvlxuICAgICAgICB0aGlzLnRpbGVkTWFwID0gdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5UaWxlZE1hcCk7XG5cbiAgICAgICAgLy9wbGF5ZXJz5a+56LGh5bGCXG4gICAgICAgIHZhciBwbGF5ZXJzID0gdGhpcy50aWxlZE1hcC5nZXRPYmplY3RHcm91cCgncGxheWVycycpO1xuXG4gICAgICAgIHZhciBwbGF5ZXIxUG9pbnQgPSBwbGF5ZXJzLmdldE9iamVjdCgncGxheWVyMScpO1xuICAgICAgICB2YXIgcGxheWVyMVBvcyA9IGNjLnAocGxheWVyMVBvaW50LngsIHBsYXllcjFQb2ludC55KTtcbiAgICAgICAgLy8gY29uc29sZS5sb2cocGxheWVyMVBvcyk7XG4gICAgICAgIHRoaXMuYmFycmllcnMgPSB0aGlzLnRpbGVkTWFwLmdldExheWVyKCfpmpznpJnlsaQnKTtcbiAgICAgICAgdGhpcy5idWlsZGluZyA9IHRoaXMudGlsZWRNYXAuZ2V0TGF5ZXIoJ+W7uuevieWxpCcpO1xuICAgICAgICAvL3N0YXJ0UG9pbnTlkoxlbmRQb2ludOWvueixoVxuICAgICAgICAvLyB2YXIgc3RhcnRQb2ludCA9IHBsYXllcnMuZ2V0T2JqZWN0KCdzdGFydFBvaW50Jyk7XG4gICAgICAgIC8vIHZhciBlbmRQb2ludCA9IHBsYXllcnMuZ2V0T2JqZWN0KCdlbmRQb2ludCcpO1xuXG4gICAgICAgIC8v5YOP57Sg5Z2Q5qCHXG4gICAgICAgIC8vIHZhciBzdGFydFBvcyA9IGNjLnAoc3RhcnRQb2ludC54LCBzdGFydFBvaW50LnkpO1xuICAgICAgICAvLyB2YXIgZW5kUG9zID0gY2MucChlbmRQb2ludC54LCBlbmRQb2ludC55KTtcblxuICAgICAgICAvL+manOeijeeJqeWbvuWxguWSjOaYn+aYn+WbvuWxglxuICAgICAgICAvLyB0aGlzLmJhcnJpZXJzID0gdGhpcy50aWxlZE1hcC5nZXRMYXllcignYmFycmllcnMnKTtcbiAgICAgICAgLy8gdGhpcy5zdGFycyA9IHRoaXMudGlsZWRNYXAuZ2V0TGF5ZXIoJ3N0YXJzJyk7XG5cbiAgICAgICAgLy/lh7rnlJ9UaWxl5ZKM57uT5p2fVGlsZVxuICAgICAgICB0aGlzLnBsYXllclRpbGUgPSB0aGlzLnN0YXJ0VGlsZSA9IHRoaXMuZ2V0VGlsZVBvcyhwbGF5ZXIxUG9zKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5wbGF5ZXJUaWxlKTtcbiAgICAgICAgLy8gdGhpcy5lbmRUaWxlID0gdGhpcy5nZXRUaWxlUG9zKGVuZFBvcyk7XG4gICAgICAgIHRoaXMucGxheWVyID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKCdwbGF5ZXInKTtcbiAgICAgICAgLy/mm7TmlrBwbGF5ZXLkvY3nva5cbiAgICAgICAgdGhpcy51cGRhdGVQbGF5ZXJQb3MoKTtcbiAgICB9LFxuXG4gICAgdHJ5TW92ZVRvTmV3VGlsZTogZnVuY3Rpb24gdHJ5TW92ZVRvTmV3VGlsZShuZXdUaWxlKSB7XG4gICAgICAgIHZhciBtYXBTaXplID0gdGhpcy50aWxlZE1hcC5nZXRNYXBTaXplKCk7XG4gICAgICAgIGlmIChuZXdUaWxlLnggPCAwIHx8IG5ld1RpbGUueCA+PSBtYXBTaXplLndpZHRoKSByZXR1cm47XG4gICAgICAgIGlmIChuZXdUaWxlLnkgPCAwIHx8IG5ld1RpbGUueSA+PSBtYXBTaXplLmhlaWdodCkgcmV0dXJuO1xuXG4gICAgICAgIC8vIGlmICh0aGlzLmJhcnJpZXJzLmdldFRpbGVHSURBdChuZXdUaWxlKSkgey8vR0lEPTAs5YiZ6K+lVGlsZeS4uuepulxuICAgICAgICAvLyAgICAgY2MubG9nKCdUaGlzIHdheSBpcyBibG9ja2VkIScpO1xuICAgICAgICAvLyAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAvLyB9XG4gICAgICAgIGlmICh0aGlzLmJ1aWxkaW5nLmdldFRpbGVHSURBdChuZXdUaWxlKSkge1xuICAgICAgICAgICAgLy9HSUQ9MCzliJnor6VUaWxl5Li656m6XG4gICAgICAgICAgICBjYy5sb2coJ1RoaXMgd2F5IGlzIGJsb2NrZWQhJyk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnBsYXllclRpbGUgPSBuZXdUaWxlO1xuICAgICAgICB0aGlzLnVwZGF0ZVBsYXllclBvcygpO1xuICAgIH0sXG5cbiAgICB0cnlNb3ZlOiBmdW5jdGlvbiB0cnlNb3ZlKGRpcikge1xuICAgICAgICB2YXIgc3BlZWQgPSB0aGlzLnNwZWVkO1xuICAgICAgICBzd2l0Y2ggKGRpcikge1xuICAgICAgICAgICAgY2FzZSBESVIuVVA6XG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIueSArPSBzcGVlZDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgRElSLkRPV046XG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIueSAtPSBzcGVlZDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgRElSLkxFRlQ6XG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIueCAtPSBzcGVlZDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgRElSLlJJR0hUOlxuICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLnggKz0gc3BlZWQ7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLy/lsIblg4/ntKDlnZDmoIfovazljJbkuLrnk6bniYflnZDmoIdcbiAgICBnZXRUaWxlUG9zOiBmdW5jdGlvbiBnZXRUaWxlUG9zKHBvc0luUGl4ZWwpIHtcbiAgICAgICAgdmFyIG1hcFNpemUgPSB0aGlzLm5vZGUuZ2V0Q29udGVudFNpemUoKTtcbiAgICAgICAgdmFyIHRpbGVTaXplID0gdGhpcy50aWxlZE1hcC5nZXRUaWxlU2l6ZSgpO1xuICAgICAgICB2YXIgeCA9IE1hdGguZmxvb3IocG9zSW5QaXhlbC54IC8gdGlsZVNpemUud2lkdGgpO1xuICAgICAgICB2YXIgeSA9IE1hdGguZmxvb3IoKG1hcFNpemUuaGVpZ2h0IC0gcG9zSW5QaXhlbC55KSAvIHRpbGVTaXplLmhlaWdodCk7XG4gICAgICAgIHJldHVybiBjYy5wKHgsIHkpO1xuICAgIH0sXG5cbiAgICB1cGRhdGVQbGF5ZXJQb3M6IGZ1bmN0aW9uIHVwZGF0ZVBsYXllclBvcygpIHtcbiAgICAgICAgLy8gdmFyIHBvcyA9IHRoaXMuYmFycmllcnMuZ2V0UG9zaXRpb25BdCh0aGlzLnBsYXllclRpbGUpO1xuICAgICAgICB2YXIgdGlsZVNpemUgPSB0aGlzLnRpbGVkTWFwLmdldFRpbGVTaXplKCk7XG4gICAgICAgIHZhciBwb3NYID0gdGhpcy5wbGF5ZXJUaWxlLnggKiB0aWxlU2l6ZS53aWR0aCArIHRpbGVTaXplLndpZHRoIC8gMjtcbiAgICAgICAgdmFyIHBvc1kgPSAtMSAqICh0aGlzLnBsYXllclRpbGUueSAqIHRpbGVTaXplLmhlaWdodCArIHRpbGVTaXplLmhlaWdodCk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHBvc1grXCI6XCIrcG9zWSk7XG4gICAgICAgIC8vIHRoaXMucGxheWVyLnNldFBvc2l0aW9uKHBvcyk7XG5cbiAgICAgICAgLy8gdmFyIGFjdGlvbiA9IGNjLm1vdmVUbygwLjUsIHBvc1gsIHBvc1kpO1xuICAgICAgICAvLyDmiafooYzliqjkvZxcblxuICAgICAgICAvLyB0aGlzLnBsYXllci5ydW5BY3Rpb24oYWN0aW9uKTtcblxuICAgICAgICB0aGlzLnBsYXllci54ID0gcG9zWDtcbiAgICAgICAgdGhpcy5wbGF5ZXIueSA9IHBvc1k7XG5cbiAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5wbGF5ZXIueCk7XG4gICAgfVxuXG59KTtcblxuY2MuX1JGcG9wKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5jYy5fUkZwdXNoKG1vZHVsZSwgJzY0MTc4TEprcFZEcVlCZFp1alJ1b0d6JywgJ2NjUGxheWVyJyk7XG4vLyBTY3JpcHRcXGNjUGxheWVyLmpzXG5cblxudmFyIERJUiA9IGNjLkVudW0oe1xuICAgIE5vbmU6IDAsXG4gICAgVVA6IDEsXG4gICAgRE9XTjogMixcbiAgICBMRUZUOiAzLFxuICAgIFJJR0hUOiA0XG59KTtcblxuY2MuQ2xhc3Moe1xuICAgIFwiZXh0ZW5kc1wiOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG5cbiAgICAgICAgaWQ6IDAsXG5cbiAgICAgICAgLy/np7vli5XpgJ/luqZcbiAgICAgICAgdmVsb2NpdHk6IDIsXG5cbiAgICAgICAgLy/mnIDlpKfngrjlvYjmlbjph49cbiAgICAgICAgYm9tYnNNYXg6IDEsXG5cbiAgICAgICAgLy8v54K45b2I54iG54K45aiB5YqbXG4gICAgICAgIGJvbWJTdHJlbmd0aDogMSxcblxuICAgICAgICBmYWNpbmc6IERJUi5ET1dOXG5cbiAgICB9LFxuXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiBvbkxvYWQoKSB7XG4gICAgICAgIC8vIHRoaXMuc2V0SW5wdXRDb250cm9sKCk7XG4gICAgfSxcblxuICAgIC8vIGNhbGxlZCBldmVyeSBmcmFtZSwgdW5jb21tZW50IHRoaXMgZnVuY3Rpb24gdG8gYWN0aXZhdGUgdXBkYXRlIGNhbGxiYWNrXG4gICAgLy8gdXBkYXRlOiBmdW5jdGlvbiAoZHQpIHtcblxuICAgIC8vIH0sXG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoZHQpIHt9LFxuXG4gICAgZ2V0UGxheWVyT250aWxlOiBmdW5jdGlvbiBnZXRQbGF5ZXJPbnRpbGUoKSB7XG5cbiAgICAgICAgcmV0dXJuO1xuICAgIH0sXG5cbiAgICBzZXRJbnB1dENvbnRyb2w6IGZ1bmN0aW9uIHNldElucHV0Q29udHJvbCgpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAvL2FkZCBrZXlib2FyZCBpbnB1dCBsaXN0ZW5lciB0byBqdW1wLCB0dXJuTGVmdCBhbmQgdHVyblJpZ2h0XG4gICAgICAgIGNjLmV2ZW50TWFuYWdlci5hZGRMaXN0ZW5lcih7XG4gICAgICAgICAgICBldmVudDogY2MuRXZlbnRMaXN0ZW5lci5LRVlCT0FSRCxcbiAgICAgICAgICAgIC8vIHNldCBhIGZsYWcgd2hlbiBrZXkgcHJlc3NlZFxuICAgICAgICAgICAgb25LZXlQcmVzc2VkOiBmdW5jdGlvbiBvbktleVByZXNzZWQoa2V5Q29kZSwgZXZlbnQpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGtleUNvZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBjYy5LRVkuYTpcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBjYy5LRVkubGVmdDpcblxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgY2MuS0VZLmQ6XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgY2MuS0VZLnJpZ2h0OlxuXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLy8gdW5zZXQgYSBmbGFnIHdoZW4ga2V5IHJlbGVhc2VkXG4gICAgICAgICAgICBvbktleVJlbGVhc2VkOiBmdW5jdGlvbiBvbktleVJlbGVhc2VkKGtleUNvZGUsIGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChrZXlDb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgY2MuS0VZLmE6XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgY2MuS0VZLmxlZnQ6XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIGNjLktFWS5kOlxuICAgICAgICAgICAgICAgICAgICBjYXNlIGNjLktFWS5yaWdodDpcblxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LCBzZWxmLm5vZGUpO1xuICAgIH1cblxufSk7XG5cbmNjLl9SRnBvcCgpOyIsIlwidXNlIHN0cmljdFwiO1xuY2MuX1JGcHVzaChtb2R1bGUsICc0YzY3YncvdGhsSGw0MkxDL3dicERGSycsICdwbGF5ZXInKTtcbi8vIFNjcmlwdFxccGxheWVyLmpzXG5cbmNjLkNsYXNzKHtcbiAgICAnZXh0ZW5kcyc6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgaWQ6IDAsXG4gICAgICAgIHZlbG9jaXR5OiAyLCAvL01vdmluZyBzcGVlZFxuICAgICAgICBib21ic01heDogMSwgLy9NYXggbnVtYmVyIG9mIGJvbWJzIHVzZXIgY2FuIHNwYXduXG4gICAgICAgIGJvbWJTdHJlbmd0aDogMSwgLy9Ib3cgZmFyIHRoZSBmaXJlIHJlYWNoZXMgd2hlbiBib21iIGV4cGxvZGVzXG4gICAgICAgIGFsaXZlOiAwXG4gICAgfSxcblxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICAgIG9uTG9hZDogZnVuY3Rpb24gb25Mb2FkKCkge30sXG5cbiAgICBpbml0OiBmdW5jdGlvbiBpbml0KHBvc2l0aW9uLCBjb250cm9scywgaWQpIHtcbiAgICAgICAgaWYgKGlkKSB7XG4gICAgICAgICAgICB0aGlzLmlkID0gaWQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29udHJvbHMpIHtcbiAgICAgICAgICAgIHRoaXMuY29udHJvbHMgPSBjb250cm9scztcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBpbWcgPSBnR2FtZUVuZ2luZS5wbGF5ZXJCb3lJbWc7XG4gICAgICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBCb3QpKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5pZCA9PSAwKSB7XG4gICAgICAgICAgICAgICAgaW1nID0gZ0dhbWVFbmdpbmUucGxheWVyR2lybEltZztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaW1nID0gZ0dhbWVFbmdpbmUucGxheWVyR2lybDJJbWc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgc3ByaXRlU2hlZXQgPSBuZXcgY3JlYXRlanMuU3ByaXRlU2hlZXQoe1xuICAgICAgICAgICAgaW1hZ2VzOiBbaW1nXSxcbiAgICAgICAgICAgIGZyYW1lczogeyB3aWR0aDogdGhpcy5zaXplLncsIGhlaWdodDogdGhpcy5zaXplLmgsIHJlZ1g6IDEwLCByZWdZOiAxMiB9LFxuICAgICAgICAgICAgYW5pbWF0aW9uczoge1xuICAgICAgICAgICAgICAgIGlkbGU6IFswLCAwLCAnaWRsZSddLFxuICAgICAgICAgICAgICAgIGRvd246IFswLCAzLCAnZG93bicsIDAuMV0sXG4gICAgICAgICAgICAgICAgbGVmdDogWzQsIDcsICdsZWZ0JywgMC4xXSxcbiAgICAgICAgICAgICAgICB1cDogWzgsIDExLCAndXAnLCAwLjFdLFxuICAgICAgICAgICAgICAgIHJpZ2h0OiBbMTIsIDE1LCAncmlnaHQnLCAwLjFdLFxuICAgICAgICAgICAgICAgIGRlYWQ6IFsxNiwgMTYsICdkZWFkJywgMC4xXVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5ibXAgPSBuZXcgY3JlYXRlanMuU3ByaXRlKHNwcml0ZVNoZWV0KTtcblxuICAgICAgICB0aGlzLnBvc2l0aW9uID0gcG9zaXRpb247XG4gICAgICAgIHZhciBwaXhlbHMgPSBVdGlscy5jb252ZXJ0VG9CaXRtYXBQb3NpdGlvbihwb3NpdGlvbik7XG4gICAgICAgIHRoaXMuYm1wLnggPSBwaXhlbHMueDtcbiAgICAgICAgdGhpcy5ibXAueSA9IHBpeGVscy55O1xuXG4gICAgICAgIGdHYW1lRW5naW5lLnN0YWdlLmFkZENoaWxkKHRoaXMuYm1wKTtcblxuICAgICAgICB0aGlzLmJvbWJzID0gW107XG4gICAgICAgIHRoaXMuc2V0Qm9tYnNMaXN0ZW5lcigpO1xuICAgIH0sXG5cbiAgICBzZXRCb21ic0xpc3RlbmVyOiBmdW5jdGlvbiBzZXRCb21ic0xpc3RlbmVyKCkge30sXG5cbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmFsaXZlKSB7XG4gICAgICAgICAgICAvL3RoaXMuZmFkZSgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChnR2FtZUVuZ2luZS5tZW51LnZpc2libGUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcG9zaXRpb24gPSB7IHg6IHRoaXMuYm1wLngsIHk6IHRoaXMuYm1wLnkgfTtcblxuICAgICAgICB2YXIgZGlyWCA9IDA7XG4gICAgICAgIHZhciBkaXJZID0gMDtcbiAgICAgICAgaWYgKGdJbnB1dEVuZ2luZS5hY3Rpb25zW3RoaXMuY29udHJvbHMudXBdKSB7XG4gICAgICAgICAgICB0aGlzLmFuaW1hdGUoJ3VwJyk7XG4gICAgICAgICAgICBwb3NpdGlvbi55IC09IHRoaXMudmVsb2NpdHk7XG4gICAgICAgICAgICBkaXJZID0gLTE7XG4gICAgICAgIH0gZWxzZSBpZiAoZ0lucHV0RW5naW5lLmFjdGlvbnNbdGhpcy5jb250cm9scy5kb3duXSkge1xuICAgICAgICAgICAgdGhpcy5hbmltYXRlKCdkb3duJyk7XG4gICAgICAgICAgICBwb3NpdGlvbi55ICs9IHRoaXMudmVsb2NpdHk7XG4gICAgICAgICAgICBkaXJZID0gMTtcbiAgICAgICAgfSBlbHNlIGlmIChnSW5wdXRFbmdpbmUuYWN0aW9uc1t0aGlzLmNvbnRyb2xzLmxlZnRdKSB7XG4gICAgICAgICAgICB0aGlzLmFuaW1hdGUoJ2xlZnQnKTtcbiAgICAgICAgICAgIHBvc2l0aW9uLnggLT0gdGhpcy52ZWxvY2l0eTtcbiAgICAgICAgICAgIGRpclggPSAtMTtcbiAgICAgICAgfSBlbHNlIGlmIChnSW5wdXRFbmdpbmUuYWN0aW9uc1t0aGlzLmNvbnRyb2xzLnJpZ2h0XSkge1xuICAgICAgICAgICAgdGhpcy5hbmltYXRlKCdyaWdodCcpO1xuICAgICAgICAgICAgcG9zaXRpb24ueCArPSB0aGlzLnZlbG9jaXR5O1xuICAgICAgICAgICAgZGlyWCA9IDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmFuaW1hdGUoJ2lkbGUnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwb3NpdGlvbi54ICE9IHRoaXMuYm1wLnggfHwgcG9zaXRpb24ueSAhPSB0aGlzLmJtcC55KSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuZGV0ZWN0Qm9tYkNvbGxpc2lvbihwb3NpdGlvbikpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kZXRlY3RXYWxsQ29sbGlzaW9uKHBvc2l0aW9uKSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBJZiB3ZSBhcmUgb24gdGhlIGNvcm5lciwgbW92ZSB0byB0aGUgYWlzbGVcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvcm5lckZpeCA9IHRoaXMuZ2V0Q29ybmVyRml4KGRpclgsIGRpclkpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY29ybmVyRml4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZml4WCA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZml4WSA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGlyWCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpeFkgPSBjb3JuZXJGaXgueSAtIHRoaXMuYm1wLnkgPiAwID8gMSA6IC0xO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaXhYID0gY29ybmVyRml4LnggLSB0aGlzLmJtcC54ID4gMCA/IDEgOiAtMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYm1wLnggKz0gZml4WCAqIHRoaXMudmVsb2NpdHk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmJtcC55ICs9IGZpeFkgKiB0aGlzLnZlbG9jaXR5O1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVQb3NpdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ibXAueCA9IHBvc2l0aW9uLng7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYm1wLnkgPSBwb3NpdGlvbi55O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVBvc2l0aW9uKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuZGV0ZWN0RmlyZUNvbGxpc2lvbigpKSB7XG4gICAgICAgICAgICB0aGlzLmRpZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5oYW5kbGVCb251c0NvbGxpc2lvbigpO1xuICAgIH0sXG5cbiAgICAvKipcclxuICAgICAqIENhbGN1bGF0ZXMgYW5kIHVwZGF0ZXMgZW50aXR5IHBvc2l0aW9uIGFjY29yZGluZyB0byBpdHMgYWN0dWFsIGJpdG1hcCBwb3NpdGlvblxyXG4gICAgICovXG4gICAgdXBkYXRlUG9zaXRpb246IGZ1bmN0aW9uIHVwZGF0ZVBvc2l0aW9uKCkge1xuICAgICAgICB0aGlzLnBvc2l0aW9uID0gVXRpbHMuY29udmVydFRvRW50aXR5UG9zaXRpb24odGhpcy5ibXApO1xuICAgIH0sXG5cbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdHJ1ZSB3aGVuIGNvbGxpc2lvbiBpcyBkZXRlY3RlZCBhbmQgd2Ugc2hvdWxkIG5vdCBtb3ZlIHRvIHRhcmdldCBwb3NpdGlvbi5cclxuICAgICAqL1xuICAgIGRldGVjdFdhbGxDb2xsaXNpb246IGZ1bmN0aW9uIGRldGVjdFdhbGxDb2xsaXNpb24ocG9zaXRpb24pIHtcbiAgICAgICAgdmFyIHBsYXllciA9IHt9O1xuICAgICAgICBwbGF5ZXIubGVmdCA9IHBvc2l0aW9uLng7XG4gICAgICAgIHBsYXllci50b3AgPSBwb3NpdGlvbi55O1xuICAgICAgICBwbGF5ZXIucmlnaHQgPSBwbGF5ZXIubGVmdCArIHRoaXMuc2l6ZS53O1xuICAgICAgICBwbGF5ZXIuYm90dG9tID0gcGxheWVyLnRvcCArIHRoaXMuc2l6ZS5oO1xuXG4gICAgICAgIC8vIENoZWNrIHBvc3NpYmxlIGNvbGxpc2lvbiB3aXRoIGFsbCB3YWxsIGFuZCB3b29kIHRpbGVzXG4gICAgICAgIHZhciB0aWxlcyA9IGdHYW1lRW5naW5lLnRpbGVzO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRpbGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgdGlsZVBvc2l0aW9uID0gdGlsZXNbaV0ucG9zaXRpb247XG5cbiAgICAgICAgICAgIHZhciB0aWxlID0ge307XG4gICAgICAgICAgICB0aWxlLmxlZnQgPSB0aWxlUG9zaXRpb24ueCAqIGdHYW1lRW5naW5lLnRpbGVTaXplICsgMjU7XG4gICAgICAgICAgICB0aWxlLnRvcCA9IHRpbGVQb3NpdGlvbi55ICogZ0dhbWVFbmdpbmUudGlsZVNpemUgKyAyMDtcbiAgICAgICAgICAgIHRpbGUucmlnaHQgPSB0aWxlLmxlZnQgKyBnR2FtZUVuZ2luZS50aWxlU2l6ZSAtIDMwO1xuICAgICAgICAgICAgdGlsZS5ib3R0b20gPSB0aWxlLnRvcCArIGdHYW1lRW5naW5lLnRpbGVTaXplIC0gMzA7XG5cbiAgICAgICAgICAgIGlmIChnR2FtZUVuZ2luZS5pbnRlcnNlY3RSZWN0KHBsYXllciwgdGlsZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSxcblxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0cnVlIHdoZW4gdGhlIGJvbWIgY29sbGlzaW9uIGlzIGRldGVjdGVkIGFuZCB3ZSBzaG91bGQgbm90IG1vdmUgdG8gdGFyZ2V0IHBvc2l0aW9uLlxyXG4gICAgICovXG4gICAgZGV0ZWN0Qm9tYkNvbGxpc2lvbjogZnVuY3Rpb24gZGV0ZWN0Qm9tYkNvbGxpc2lvbihwaXhlbHMpIHtcbiAgICAgICAgdmFyIHBvc2l0aW9uID0gVXRpbHMuY29udmVydFRvRW50aXR5UG9zaXRpb24ocGl4ZWxzKTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGdHYW1lRW5naW5lLmJvbWJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgYm9tYiA9IGdHYW1lRW5naW5lLmJvbWJzW2ldO1xuICAgICAgICAgICAgLy8gQ29tcGFyZSBib21iIHBvc2l0aW9uXG4gICAgICAgICAgICBpZiAoYm9tYi5wb3NpdGlvbi54ID09IHBvc2l0aW9uLnggJiYgYm9tYi5wb3NpdGlvbi55ID09IHBvc2l0aW9uLnkpIHtcbiAgICAgICAgICAgICAgICAvLyBBbGxvdyB0byBlc2NhcGUgZnJvbSBib21iIHRoYXQgYXBwZWFyZWQgb24gbXkgZmllbGRcbiAgICAgICAgICAgICAgICBpZiAoYm9tYiA9PSB0aGlzLmVzY2FwZUJvbWIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEkgaGF2ZSBlc2NhcGVkIGFscmVhZHlcbiAgICAgICAgaWYgKHRoaXMuZXNjYXBlQm9tYikge1xuICAgICAgICAgICAgdGhpcy5lc2NhcGVCb21iID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9LFxuXG4gICAgZGV0ZWN0RmlyZUNvbGxpc2lvbjogZnVuY3Rpb24gZGV0ZWN0RmlyZUNvbGxpc2lvbigpIHtcbiAgICAgICAgdmFyIGJvbWJzID0gZ0dhbWVFbmdpbmUuYm9tYnM7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYm9tYnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBib21iID0gYm9tYnNbaV07XG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGJvbWIuZmlyZXMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgZmlyZSA9IGJvbWIuZmlyZXNbal07XG4gICAgICAgICAgICAgICAgdmFyIGNvbGxpc2lvbiA9IGJvbWIuZXhwbG9kZWQgJiYgZmlyZS5wb3NpdGlvbi54ID09IHRoaXMucG9zaXRpb24ueCAmJiBmaXJlLnBvc2l0aW9uLnkgPT0gdGhpcy5wb3NpdGlvbi55O1xuICAgICAgICAgICAgICAgIGlmIChjb2xsaXNpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9LFxuXG4gICAgLyoqXHJcbiAgICAgKiBDaGVja3Mgd2hldGhlciB3ZSBoYXZlIGdvdCBib251cyBhbmQgYXBwbGllcyBpdC5cclxuICAgICAqL1xuICAgIGhhbmRsZUJvbnVzQ29sbGlzaW9uOiBmdW5jdGlvbiBoYW5kbGVCb251c0NvbGxpc2lvbigpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBnR2FtZUVuZ2luZS5ib251c2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgYm9udXMgPSBnR2FtZUVuZ2luZS5ib251c2VzW2ldO1xuICAgICAgICAgICAgaWYgKFV0aWxzLmNvbXBhcmVQb3NpdGlvbnMoYm9udXMucG9zaXRpb24sIHRoaXMucG9zaXRpb24pKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hcHBseUJvbnVzKGJvbnVzKTtcbiAgICAgICAgICAgICAgICBib251cy5kZXN0cm95KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXHJcbiAgICAgKiBBcHBsaWVzIGJvbnVzLlxyXG4gICAgICovXG4gICAgYXBwbHlCb251czogZnVuY3Rpb24gYXBwbHlCb251cyhib251cykge1xuICAgICAgICBpZiAoYm9udXMudHlwZSA9PSAnc3BlZWQnKSB7XG4gICAgICAgICAgICB0aGlzLnZlbG9jaXR5ICs9IDAuODtcbiAgICAgICAgfSBlbHNlIGlmIChib251cy50eXBlID09ICdib21iJykge1xuICAgICAgICAgICAgdGhpcy5ib21ic01heCsrO1xuICAgICAgICB9IGVsc2UgaWYgKGJvbnVzLnR5cGUgPT0gJ2ZpcmUnKSB7XG4gICAgICAgICAgICB0aGlzLmJvbWJTdHJlbmd0aCsrO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxyXG4gICAgICogQ2hhbmdlcyBhbmltYXRpb24gaWYgcmVxdWVzdGVkIGFuaW1hdGlvbiBpcyBub3QgYWxyZWFkeSBjdXJyZW50LlxyXG4gICAgICovXG4gICAgYW5pbWF0ZTogZnVuY3Rpb24gYW5pbWF0ZShhbmltYXRpb24pIHtcbiAgICAgICAgaWYgKCF0aGlzLmJtcC5jdXJyZW50QW5pbWF0aW9uIHx8IHRoaXMuYm1wLmN1cnJlbnRBbmltYXRpb24uaW5kZXhPZihhbmltYXRpb24pID09PSAtMSkge1xuICAgICAgICAgICAgdGhpcy5ibXAuZ290b0FuZFBsYXkoYW5pbWF0aW9uKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBkaWU6IGZ1bmN0aW9uIGRpZSgpIHtcbiAgICAgICAgdGhpcy5hbGl2ZSA9IGZhbHNlO1xuXG4gICAgICAgIGlmIChnR2FtZUVuZ2luZS5jb3VudFBsYXllcnNBbGl2ZSgpID09IDEgJiYgZ0dhbWVFbmdpbmUucGxheWVyc0NvdW50ID09IDIpIHtcbiAgICAgICAgICAgIGdHYW1lRW5naW5lLmdhbWVPdmVyKCd3aW4nKTtcbiAgICAgICAgfSBlbHNlIGlmIChnR2FtZUVuZ2luZS5jb3VudFBsYXllcnNBbGl2ZSgpID09IDApIHtcbiAgICAgICAgICAgIGdHYW1lRW5naW5lLmdhbWVPdmVyKCdsb3NlJyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmJtcC5nb3RvQW5kUGxheSgnZGVhZCcpO1xuICAgICAgICB0aGlzLmZhZGUoKTtcbiAgICB9LFxuXG4gICAgZmFkZTogZnVuY3Rpb24gZmFkZSgpIHtcbiAgICAgICAgdmFyIHRpbWVyID0gMDtcbiAgICAgICAgdmFyIGJtcCA9IHRoaXMuYm1wO1xuICAgICAgICB2YXIgZmFkZSA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRpbWVyKys7XG5cbiAgICAgICAgICAgIGlmICh0aW1lciA+IDMwKSB7XG4gICAgICAgICAgICAgICAgYm1wLmFscGhhIC09IDAuMDU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYm1wLmFscGhhIDw9IDApIHtcbiAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKGZhZGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCAzMCk7XG4gICAgfVxuXG59KTtcblxuY2MuX1JGcG9wKCk7Il19
