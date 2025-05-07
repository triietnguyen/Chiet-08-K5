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
        let hp = parseFloat(this.hpInput.string);  
        let mana = parseFloat(this.manaInput.string);  

        if (isNaN(hp) || isNaN(mana)) {
            this.resultLabel.string = "Vui lòng nhập giá trị hợp lệ!";
            return;
        }

        let power = hp * mana;

        this.resultLabel.string = "Power: " + power;
    }
});
