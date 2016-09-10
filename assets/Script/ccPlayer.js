
    var DIR= cc.Enum({
        None:0,
        UP:1,
        DOWN:2,
        LEFT:3,
        RIGHT:4
    });
    
cc.Class({
    extends: cc.Component,





    properties: {

        id: 0,
        
        //移動速度
        velocity: 2,
    
        //最大炸彈數量
        bombsMax: 1,
    
        ///炸彈爆炸威力
        bombStrength: 1,
        
        facing:DIR.DOWN,

    },

    // use this for initialization
    onLoad: function () {
        // this.setInputControl();
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
    update: function (dt) {

    },
    
    getPlayerOntile:function(){
        
        return ;
    },
    
    
    setInputControl: function () {
        var self = this;
        //add keyboard input listener to jump, turnLeft and turnRight
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            // set a flag when key pressed
            onKeyPressed: function(keyCode, event) {
                switch(keyCode) {
                    case cc.KEY.a:
                    case cc.KEY.left:

                        break;
                    case cc.KEY.d:
                    case cc.KEY.right:

                        break;
                }
            },
            // unset a flag when key released
            onKeyReleased: function(keyCode, event) {
                switch(keyCode) {
                    case cc.KEY.a:
                    case cc.KEY.left:

                        break;
                    case cc.KEY.d:
                    case cc.KEY.right:

                        break;
                }
            }
        }, self.node);
    },
    
    
});
