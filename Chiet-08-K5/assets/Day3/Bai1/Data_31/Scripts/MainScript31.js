// const Data = require('Data');
// const GameController = require('GameController');

// cc.Class({
//     extends: cc.Component,

//     properties: {
//         itemPrefab: cc.Prefab,
//         itemListNode: cc.Node,
//         nameLabel: cc.Label,
//         quantityLabel: cc.Label,
//         typeLabel: cc.Label,
//         effectLabel: cc.Label,
//         useButton: cc.Button,
//         deleteButton: cc.Button,
//         messageLabel: cc.Label
//     },

//     onLoad() {
//         const data = new Data();
//         this.gameController = new GameController(data, this);
//         this.gameController.showItem();
//     },

//     useItem() {
//         this.gameController.useItem();
//     },

//     deleteItem() {
//         this.gameController.deleteItem();
//     },

//     showMessage(msg) {
//         this.messageLabel.string = msg;
//         this.messageLabel.node.active = true;

//         this.unschedule(this._hideMessage);
//         this.scheduleOnce(this._hideMessage, 2);
//     },

//     _hideMessage() {
//         this.messageLabel.node.active = false;
//     }
// });
