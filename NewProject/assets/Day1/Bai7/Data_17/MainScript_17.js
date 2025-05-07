cc.Class({
    extends: cc.Component,

    properties: {
        hpInput: cc.EditBox,
        manaInput: cc.EditBox,
        resultLabel: cc.Label,
        calculateButton: cc.Button
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.result = "";

    },

    start() {
        this.resultLabel.string = this.result;
    },

    onCalculatePower() {
        this.hp = parseFloat(this.hpInput.string);  
        this.mana = parseFloat(this.manaInput.string);  

        if (isNaN(this.hp) || isNaN(this.mana)) {
            this.resultLabel.string = "Vui lòng nhập giá trị hợp lệ!";
            return;
        }

        this.power = this.hp * this.mana;

        this.resultLabel.string = "Power: " + this.power;
    }
});
