cc.Class({
    extends: cc.Component,

    properties: {
        stateLabel: cc.Label,        
        changeStateButton: cc.Button
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

        this.state = "Idle"; 

    },

    start () {
        this.updateState();
    },

    updateState () {
        this.stateLabel.string = "State: " + this.state;
    },

    onChangeState () {

        if(this.state === "Idle") this.state = "Running";
        else this.state = "Idle"

        this.updateState();
    },

    
});
