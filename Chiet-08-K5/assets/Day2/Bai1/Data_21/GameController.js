cc.Class({
    extends: cc.Component,

    properties: {
        enemy: require("Enemy"),
        player: require("Player"),

        playerAttackText: cc.Label,
        enemyAttackText: cc.Label,
        playerDefenseText: cc.Label,
        enemyDefenseText: cc.Label,

        playerHealthBar: cc.ProgressBar,
        enemyHealthBar: cc.ProgressBar,
        playerHealthText: cc.Label,
        enemyHealthText: cc.Label,

        playerEnergyBar: cc.ProgressBar,
        enemyEnergyBar: cc.ProgressBar,
        playerEnergyText: cc.Label,
        enemyEnergyText: cc.Label,

        winnerLabel: cc.Label,
    },

    onLoad() {

        this.player.initStats();
        this.enemy.initStats();

        this.isGameOver = false;

        this.displayedPlayerAttack = this.player.attack;
        this.displayedEnemyAttack = this.enemy.attack;
        this.displayedPlayerDefense = this.player.defense;
        this.displayedEnemyDefense = this.enemy.defense;
        this.displayedPlayerHealth = this.player.health;
        this.displayedEnemyHealth = this.enemy.health;
        this.displayedPlayerEnergy = this.player.energy;
        this.displayedEnemyEnergy = this.enemy.energy;

        this.initUI();

        this.updateUI();
    },

    initUI() {
        this.playerAttackText.string = "Attack: " + this.player.attack;
        this.enemyAttackText.string = "Attack: " + this.enemy.attack;

        this.playerDefenseText.string = "Defense: " + this.player.defense;
        this.enemyDefenseText.string = "Defense: " + this.enemy.defense;

        this.playerHealthText.string = "HP: " + this.player.health;
        this.enemyHealthText.string = "HP: " + this.enemy.health;

        this.playerEnergyText.string = "Energy: " + this.player.energy;
        this.enemyEnergyText.string = "Energy: " + this.enemy.energy;

        this.winnerLabel.string = "";

        this.playerHealthBar.progress = this.player.health / 100;
        this.enemyHealthBar.progress = this.enemy.health / 100;
        this.playerEnergyBar.progress = this.player.energy / 100;
        this.enemyEnergyBar.progress = this.enemy.energy / 100;

        this.setBarColor(this.playerHealthBar, this.player.health / 100, 'health');
        this.setBarColor(this.enemyHealthBar, this.enemy.health / 100, 'health');
        this.setBarColor(this.playerEnergyBar, this.player.energy / 100, 'energy');
        this.setBarColor(this.enemyEnergyBar, this.enemy.energy / 100, 'energy');
    },

    setBarColor(bar, progress, type) {
        if (type === 'health') {
            bar.node.color = new cc.Color(
                255 * (1 - progress),
                255 * progress,
                0
            );
        } else if (type === 'energy') {
            bar.node.color = new cc.Color(
                0,
                0,
                255 * (1 - progress)
            );
        }
    },
    updateUI() {

        this.animateNumber(this.playerAttackText, this.displayedPlayerAttack, this.player.attack, "Attack: ", 'attack', 'player');
        this.animateNumber(this.enemyAttackText, this.displayedEnemyAttack, this.enemy.attack, "Attack: ", 'attack', 'enemy');

        this.animateNumber(this.playerDefenseText, this.displayedPlayerDefense, this.player.defense, "Defense: ", 'defense', 'player');
        this.animateNumber(this.enemyDefenseText, this.displayedEnemyDefense, this.enemy.defense, "Defense: ", 'defense', 'enemy');

        this.animateBar(this.playerHealthBar, this.player.health, 100, 'health', 'player');
        this.animateBar(this.enemyHealthBar, this.enemy.health, 100, 'health', 'enemy');

        this.animateNumber(this.playerHealthText, this.displayedPlayerHealth, this.player.health, "HP: ", 'health', 'player');
        this.animateNumber(this.enemyHealthText, this.displayedEnemyHealth, this.enemy.health, "HP: ", 'health', 'enemy');

        this.animateBar(this.playerEnergyBar, this.player.energy, 100, 'energy', 'player');
        this.animateBar(this.enemyEnergyBar, this.enemy.energy, 100, 'energy', 'enemy');

        this.animateNumber(this.playerEnergyText, this.displayedPlayerEnergy, this.player.energy, "Energy: ", 'energy', 'player');
        this.animateNumber(this.enemyEnergyText, this.displayedEnemyEnergy, this.enemy.energy, "Energy: ", 'energy', 'enemy');
    },

    animateBar(progressBar, currentValue, maxValue, type, owner) {
        let target = currentValue / maxValue;
        let delta = target - progressBar.progress;

        if (Math.abs(delta) > 0.01) {
            progressBar.progress += delta * 0.1;
            this.scheduleOnce(() => {
                this.animateBar(progressBar, currentValue, maxValue, type, owner);
            }, 0.02);
        } else {
            progressBar.progress = target;
        }

        if (type === 'health') {
            // Đổi màu thanh máu từ xanh sang đỏ theo giá trị máu
            if (owner === 'player') {
                progressBar.node.color = new cc.Color(
                    255 * (1 - target), // Đỏ sẽ tăng khi máu giảm
                    255 * target,       // Xanh sẽ tăng khi máu đầy
                    0
                );
            } else if (owner === 'enemy') {
                progressBar.node.color = new cc.Color(
                    255 * (1 - target), // Đỏ sẽ tăng khi máu giảm
                    255 * target,       // Xanh sẽ tăng khi máu đầy
                    0
                );
            }
        } else if (type === 'energy') {
            // Đổi màu thanh năng lượng từ xanh dương sang đỏ
            if (owner === 'player') {
                progressBar.node.color = new cc.Color(
                    0,                  // Màu xanh dương
                    0,                  // Màu xanh dương
                    255 * (1 - target)  // Đỏ sẽ tăng khi năng lượng giảm
                );
            } else if (owner === 'enemy') {
                progressBar.node.color = new cc.Color(
                    0,                  // Màu xanh dương
                    0,                  // Màu xanh dương
                    255 * (1 - target)  // Đỏ sẽ tăng khi năng lượng giảm
                );
            }
        }
    },

    animateNumber(label, currentValue, targetValue, prefix = "", type, owner) {
        if (currentValue !== targetValue) {
            let step = Math.ceil(Math.abs(targetValue - currentValue) / 10);
            if (currentValue > targetValue) {
                currentValue -= step;
                if (currentValue < targetValue) currentValue = targetValue;
            } else {
                currentValue += step;
                if (currentValue > targetValue) currentValue = targetValue;
            }
    
            label.string = prefix + currentValue;
    
            switch (type) {
                case "health":
                    if (owner === "player") this.displayedPlayerHealth = currentValue;
                    else if (owner === "enemy") this.displayedEnemyHealth = currentValue;
                    break;
                case "energy":
                    if (owner === "player") this.displayedPlayerEnergy = currentValue;
                    else if (owner === "enemy") this.displayedEnemyEnergy = currentValue;
                    break;
                case "attack":
                    if (owner === "player") this.displayedPlayerAttack = currentValue;
                    else if (owner === "enemy") this.displayedEnemyAttack = currentValue;
                    break;
                case "defense":
                    if (owner === "player") this.displayedPlayerDefense = currentValue;
                    else if (owner === "enemy") this.displayedEnemyDefense = currentValue;
                    break;
            }
    
            this.scheduleOnce(() => {
                this.animateNumber(label, currentValue, targetValue, prefix, type, owner);
            }, 0.02);
        }
    },

    playEnemyAttack() {
        if (!this.isGameOver) {
            this.enemy.attackPlayer(this.player);
            this.updateUI();

            if (this.player.health <= 0) {
                this.endGame("Enemy");
            }
        }
    },

    playerAction(action) {
        if (this.isGameOver) return;

        if (action === "attack") {
            this.player.attackEnemy(this.enemy);
        } else if (action === "skill") {
            this.player.useSkill(this.enemy);
        } else if (action === "recover") {
            this.player.recoverEnergy();
        }

        this.updateUI();

        if (this.enemy.health <= 0) {
            this.endGame("Player");
        } else {
            this.playEnemyAttack();
        }
    },

    endGame(winner) {
        this.isGameOver = true;

        this.winnerLabel.string = winner + " wins!";
        this.winnerLabel.node.active = true;

        if (winner === "Player") {
            this.winnerLabel.node.color = cc.Color.GREEN;
        } else {
            this.winnerLabel.node.color = cc.Color.RED;
        }

        this.winnerLabel.node.opacity = 0;
        this.winnerLabel.node.runAction(cc.fadeIn(0.5));
    }
});
