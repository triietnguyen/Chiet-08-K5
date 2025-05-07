// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        hpView: cc.Label,
        scoreView: cc.Label,
        button: cc.Button,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.name = "Violet";
        this.hp = 0;
        this.score = 0;
    },

    start () {
        this.hpView.string = "HP: " + this.hp;
        this.scoreView.string = "Score: " + this.score;
    },

    onclick(){
        this.score++;
        this.scoreView.string = "Score: " + this.score;
        if(this.score % 10 == 0){
            this.hp ++;
            this.hpView.string = "HP: " + this.hp;
        }
    }

    // update (dt) {

    // },
});
