// Item31.js
cc.Class({
    extends: cc.Component,

    properties: {
        image: cc.Sprite,
        countLabel: cc.Label,
    },

    init(data, onClickCallback) {
        this.data = data;
        this.countLabel.string = 'x' + data.quantity;
        this.loadImage(data.imagePath);

        this.node.on('click', () => {
            onClickCallback(this.data);
        }, this);
    },

    loadImage(path) {
        cc.loader.loadRes(path, cc.SpriteFrame, (err, spriteFrame) => {
            if (!err) {
                this.image.spriteFrame = spriteFrame;
            }
        });
    },
});
