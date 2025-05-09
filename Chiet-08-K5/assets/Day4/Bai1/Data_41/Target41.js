cc.Class({
    extends: cc.Component,

    properties: {
        scoreLabel: cc.Label,
    },

    onLoad() {
        const scoreRandom = Math.floor(Math.random() * 10) + 1;
        this.scoreLabel.string = scoreRandom.toString();

        this.clicked = false;

        this.node.on('touchend', this.onClick, this);

        this.destroyFunction = this.scheduleOnce(() => {
            if (this.clicked == false) {
                this.node.destroy();
            }
        }, 1); 
    },

    onClick() {
        this.clicked = true;
        const score = Number(this.scoreLabel.string)        
        this.node.emit('target-clicked', score);
        this.node.destroy();
    }
});
