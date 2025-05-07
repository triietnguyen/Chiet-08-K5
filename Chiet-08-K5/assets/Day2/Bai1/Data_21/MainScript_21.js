cc.Class({
    extends: cc.Component,

    properties: {
        gameController: require("GameController"), 
    },

    start() {
        
    },

    handlePlayerAction(event) {
        const button = event.target; 
        const label = button.getComponentInChildren(cc.Label); 
        const action = label.string;

        this.gameController.playerAction(action);
    },
});
