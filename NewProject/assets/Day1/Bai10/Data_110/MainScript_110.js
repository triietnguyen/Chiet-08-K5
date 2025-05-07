cc.Class({
    extends: cc.Component,

    properties: {
        levelLabel: cc.Label, 
        messageLabel: cc.Label,       
        checkLevelButton: cc.Button 
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.level = 1;  
        this.levelMessage = "Beginner";  
    },

    start () {
        this.updateLevel();
    },

    updateLevel () {
        this.level = Math.floor(Math.random() * 10) + 1;

        this.updateLevelMessage();

        this.levelLabel.string = "Level: " + this.level;
        this.messageLabel.string = "Level " + this.level + ": " + this.levelMessage;
    },

    updateLevelMessage () {
        if (this.level >= 1 && this.level <= 3) {
            this.levelMessage = "Beginner";
        } else if (this.level >= 4 && this.level <= 7) {
            this.levelMessage = "Intermediate";
        } else if (this.level >= 8 && this.level <= 10) {
            this.levelMessage = "Expert";
        }
    },

    onCheckLevel () {
        this.updateLevelMessage();

        this.messageLabel.string = "Level " + this.level + ": " + this.levelMessage;

        this.updateLevel();
    },
});
