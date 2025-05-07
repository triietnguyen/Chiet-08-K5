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

    attackPlayer(player) {
        let damage = this.attack - player.defense;
        damage = damage > 0 ? damage : 0; 
        player.health -= damage;

        if (player.health <= 0) {
            player.health = 0;
        }
    }
});
