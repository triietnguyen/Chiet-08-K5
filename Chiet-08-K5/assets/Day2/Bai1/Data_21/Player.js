cc.Class({
    extends: cc.Component,

    properties: {
        health: 100,
        attack: 0,
        defense: 0,
        energy: 50,
    },

    onLoad() {
        this.attack = Math.floor(Math.random() * 11) + 10;  
        this.defense = Math.floor(Math.random() * 11) + 5;   
    },

    start() {},

    update(dt) {},

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
