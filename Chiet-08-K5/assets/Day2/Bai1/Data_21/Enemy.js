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
    
    update(dt) {},

    attackPlayer(player) {
        let damage = this.attack - player.defense;
        damage = damage > 0 ? damage : 0; 
        player.health -= damage;

        if (player.health <= 0) {
            player.health = 0;
        }
    }
});
