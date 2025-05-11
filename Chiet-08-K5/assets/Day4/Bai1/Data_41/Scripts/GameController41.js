cc.Class({
    extends: cc.Component,

    properties: {
        targetPrefab: cc.Prefab,
        gameArea: cc.Node,
        uiManager: cc.Component
    },

    onLoad() {
        this.score = 0;
        this.time = 60;
        this.isPaused = false;

        this.uiManager.init(this);
        this.uiManager.setStartUI();
        this.uiManager.updateScore(this.score);
        this.uiManager.updateTime(this.time);

        this.uiManager.startButton.node.on('click', this.startGame, this);
    },

    startGame() {
        this.score = 0;
        this.time = 60;
        this.isPaused = false;

        this.uiManager.setPlayingUI();
        this.uiManager.updateScore(this.score);
        this.uiManager.updateTime(this.time);

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
        this.uiManager.updateScore(this.score);
    },

    updateTime() {
        if (this.isPaused) return;

        this.time -= 1;
        this.uiManager.updateTime(this.time);

        if (this.time <= 0) {
            this.unscheduleAllCallbacks();
            this.uiManager.showGameOver(this.score);
        }
    },

    pauseGame() {
        this.isPaused = true;
        this.uiManager.setPausedUI();
        cc.director.getScheduler().setTimeScale(0);
    },

    resumeGame() {
        this.isPaused = false;
        this.uiManager.setResumedUI();
        cc.director.getScheduler().setTimeScale(1);

    },

    restartGame() {
        cc.director.loadScene(cc.director.getScene().name);
    }
});