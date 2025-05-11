cc.Class({
    extends: cc.Component,

    properties: {
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
        this.playAgainButton.node.on('click', this.onPlayAgain, this);
        this.pauseButton.node.on('click', this.onPause, this);
        this.resumeButton.node.on('click', this.onResume, this);
        this.restartButton.node.on('click', this.onRestart, this);
    },

    init(gameController) {
        this.gameController = gameController;
    },

    updateScore(score) {
        this.scoreLabel.string = score.toString();
    },

    updateTime(time) {
        this.timeLabel.string = `${time}s`;
    },

    showGameOver(score) {
        this.gameOverLabel.string = `🎉 Chúc mừng! Bạn đã đạt ${score} điểm! 🎉`;
        this.gameOverLabel.node.active = true;
        this.playAgainButton.node.active = true;
        this.pauseButton.node.active = false;
    },

    setStartUI() {
        this.startButton.node.active = true;
        this.startLabel.node.active = true;

        this.pauseButton.node.active = false;
        this.resumeButton.node.active = false;
        this.restartButton.node.active = false;
        this.gameOverLabel.node.active = false;
        this.playAgainButton.node.active = false;
    },

    setPlayingUI() {
        this.startButton.node.active = false;
        this.startLabel.node.active = false;
        this.pauseButton.node.active = true;
    },

    setPausedUI() {
        this.pauseButton.node.active = false;
        this.resumeButton.node.active = true;
        this.restartButton.node.active = true;
    },

    setResumedUI() {
        this.pauseButton.node.active = true;
        this.resumeButton.node.active = false;
        this.restartButton.node.active = false;
    },

    onPlayAgain() {
        this.gameController.restartGame();
    },

    onPause() {
        this.gameController.pauseGame();
    },

    onResume() {
        this.gameController.resumeGame();
    },

    onRestart() {
        this.gameController.restartGame();
    }
});