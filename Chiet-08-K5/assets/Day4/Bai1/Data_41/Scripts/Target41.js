cc.Class({
    extends: cc.Component,

    properties: {
        scoreLabel: cc.Label
    },

    onLoad() {
        this.score = Math.floor(Math.random() * 10) + 1;

        if (this.scoreLabel) {
            this.scoreLabel.string = this.score.toString();
        } else {
            cc.error('Score Label is null');
        }

        this.clicked = false;

        this.node.on('touchend', this.onClick, this);

        const lifeTime = 0.3 + Math.random() * 0.5;
        this.scheduleOnce(() => {
            if (!this.clicked) {
                this.cleanup();
            }
        }, lifeTime);
    },

    onClick() {
        if (this.clicked) return;

        this.clicked = true;

        const score = this.score;
        this.node.emit('target-clicked', score);

        this.cleanup();
    },

    cleanup() {
        this.node.off('touchend', this.onClick, this);

        this.node.destroy();
    }
});
