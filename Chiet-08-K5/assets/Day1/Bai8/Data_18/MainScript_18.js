cc.Class({
    extends: cc.Component,

    properties: {
        scoreLabel: cc.Label,   
        addScoreButton: cc.Button,  
        resetScoreButton: cc.Button,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.score = 0;
    },

    start () {
        this.updateScore();
    },

     updateScore () {
        this.scoreLabel.string = "Score: " + this.score;
    },

    onAddScore () {
        this.score += 10;  
        this.updateScore(); 
    },

    onResetScore () {
        this.score = 0;  
        this.updateScore(); 
    },

});
