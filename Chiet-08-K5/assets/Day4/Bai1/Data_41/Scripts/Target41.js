cc.Class({
    extends: cc.Component,

    properties: {
        scoreLabel: cc.Label
    },

    onLoad() {
        const score = Math.floor(Math.random() * 10) + 1;
        this.scoreLabel.string = score.toString();

        this.clicked = false;

        this.node.on('touchend', this.onClick, this);

        this.scheduleOnce(() => {
            if (!this.clicked) {
                this.node.destroy();
            }
        }, 1);
    },

    onClick() {
        if (this.clicked) return;

        this.clicked = true;
        const score = parseInt(this.scoreLabel.string);
        this.node.emit('target-clicked', score);
        this.node.destroy();
    }
});