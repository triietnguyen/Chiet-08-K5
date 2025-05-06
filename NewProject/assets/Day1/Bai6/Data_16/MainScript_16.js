cc.Class({
    extends: cc.Component,

    properties: {
        titleLabel: cc.Label,
        startButton: cc.Button,   
        exitButton: cc.Button,    
        messageLabel: cc.Label    
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.title = "Welcome to My Game!";
        this.message = "";
    },

    onStartGame () {
        this.messageLabel.string = "Game is starting...";  
    },

    onExitGame () {
        this.messageLabel.string = "Goodbye!"; 
    },

    start () {
        this.titleLabel.string = this.title;
        this.messageLabel.string = this.message; 
    }
});
