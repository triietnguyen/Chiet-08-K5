// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        allowedType: 'Equipment',
        currentItem: cc.Node,
    },

    acceptItem(item) {
        return item.type === this.allowedType;
    },

    equip(item) {
        if (this.currentItem) {
            this.currentItem.parent = cc.find("Canvas/Background/BodyLayout/InventoryPanel/ScrollView");
        }

        this.currentItem = item.node;
        item.node.parent = this.node;
        item.node.position = cc.v2(0, 0);
        item.node.scale = 1;
        item.isEquipped = true;

    },


    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {

    },

    // update (dt) {},
});
