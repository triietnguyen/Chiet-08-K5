// Item31.js
cc.Class({
    extends: cc.Component,

    properties: {
        image: cc.Sprite,
    },

    init(data, callback) {
        console.log('callback', callback)
        this.data = data
        this.loadImage(data.image)
        this.node.on('click', () => {
            callback()
        }, this)
    },

    loadImage(path) {
        if (!path) return
        cc.loader.loadRes(path, cc.SpriteFrame, (err, spriteFrame) => {
            if (err) {
                console.log("Lỗi tải ảnh", err)
                return
            }
            else {
                this.image.spriteFrame = spriteFrame
            }
        })
    }
});
