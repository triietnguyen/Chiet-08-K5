cc.Class({
    extends: cc.Component,

    properties: {
        health: 100,
        attack: 0,
        defense: 0,
        energy: 50,
    },

    initStats() {
        this.health = 100;
        this.energy = 50;
        this.attack = Math.floor(cc.random0To1() * 11) + 10;
        this.defense = Math.floor(cc.random0To1() * 11) + 5;
    },

    attackEnemy(enemy) {
        let damage = this.attack - enemy.defense;
        damage = damage > 0 ? damage : 0; 
        enemy.health -= damage;

        if (enemy.health <= 0) {
            enemy.health = 0;
        }
    },

    useSkill(enemy) {
        if (this.energy >= 30) {
            let damage = (this.attack * 2) - enemy.defense;
            damage = damage > 0 ? damage : 0; 
            enemy.health -= damage;
            this.energy -= 30;
        } else {
            console.log("Không đủ năng lượng để sử dụng kỹ năng!");
        }
    },

    recoverEnergy() {
        this.energy = Math.min(this.energy + 20, 100); 
    }
});
