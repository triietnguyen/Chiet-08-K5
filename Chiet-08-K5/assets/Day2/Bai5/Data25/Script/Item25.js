// Item31.js
cc.Class({
    extends: cc.Component,

    properties: {
        image: cc.Sprite,
    },

    init(data, onClickCallback) {
        this.data = data;
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
