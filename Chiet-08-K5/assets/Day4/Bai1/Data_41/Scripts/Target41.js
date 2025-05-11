cc.Class({
    extends: cc.Component,

    properties: {
        scoreLabel: cc.Label
    },

    onLoad() {
        this.score = Math.floor(Math.random() * 10) + 1;

        if (this.scoreLabel) {
            this.scoreLabel.string = this.score;
        } else {
            cc.error('Score Label is null');
        }

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