cc.Class({
    extends: cc.Component,

    properties: {
        targetPrefab: cc.Prefab,
        gameArea: cc.Node,
        scoreLabel: cc.Label,
        timeLabel: cc.Label,
        gameOverLabel: cc.Label,
        playAgainButton: cc.Button,
        startButton: cc.Button,
        startLabel: cc.Label,
        pauseButton: cc.Button,
        resumeButton: cc.Button,
        restartButton: cc.Button
    },

    onLoad() {
        this.score = 0;
        this.time = 60;
        this.isPaused = false;

        this.scoreLabel.string = "0";
        this.timeLabel.string = "60s";
        this.gameOverLabel.node.active = false;
        this.playAgainButton.node.active = false;
        this.resumeButton.node.active = false;
        this.restartButton.node.active = false;
        this.pauseButton.node.active = false;

        this.startButton.node.active = true;
        this.startLabel.node.active = true;

        this.startButton.node.on('click', this.startGame, this);
        this.playAgainButton.node.on('click', this.restartGame, this);
        this.pauseButton.node.on('click', this.pauseGame, this);
        this.resumeButton.node.on('click', this.resumeGame, this);
        this.restartButton.node.on('click', this.restartGame, this);
    },

    startGame() {
        this.startButton.node.active = false;
        this.startLabel.node.active = false;
        this.pauseButton.node.active = true;

        this.schedule(this.spawnTarget, 1);
        this.schedule(this.updateTime, 1);
    },

    spawnTarget() {
        if (this.isPaused) return;

        const target = cc.instantiate(this.targetPrefab);
        const pos = cc.v2(
            (Math.random() - 0.5) * this.gameArea.width,
            (Math.random() - 0.5) * this.gameArea.height
        );
        target.setPosition(pos);
        this.gameArea.addChild(target);

        target.on('target-clicked', this.onTargetClicked, this);
    },

    onTargetClicked(score) {
        this.score += score;
        this.scoreLabel.string = this.score.toString();
    },

    updateTime() {
        if (this.isPaused) return;

        this.time -= 1;
        this.timeLabel.string = this.time + 's';

        if (this.time <= 0) {
            this.unscheduleAllCallbacks();
            this.showGameOver();
        }
    },

    pauseGame() {
        this.isPaused = true;
        this.resumeButton.node.active = true;
        this.restartButton.node.active = true;
        this.pauseButton.node.active = false;
    },

    resumeGame() {
        this.isPaused = false;
        this.resumeButton.node.active = false;
        this.restartButton.node.active = false;
        this.pauseButton.node.active = true;
    },

    showGameOver() {
        this.gameOverLabel.string = `🎉 Chúc mừng! Bạn đã đạt ${this.score} điểm! 🎉`;
        this.gameOverLabel.node.active = true;
        this.playAgainButton.node.active = true;
        this.pauseButton.node.active = false;
    },

    restartGame() {
        cc.director.loadScene(cc.director.getScene().name);
    }
});
