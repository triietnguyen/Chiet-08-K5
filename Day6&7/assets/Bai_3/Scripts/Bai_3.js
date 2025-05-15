let imageApis = [
    'https://fastly.picsum.photos/id/0/5000/3333.jpg?hmac=_j6ghY5fCfSD6tvtcV74zXivkJSPIfR9B8w34XeQmvU',
    'https://fastly.picsum.photos/id/1/5000/3333.jpg?hmac=Asv2DU3rA_5D1xSe22xZK47WEAN0wjWeFOhzd13ujW4',
    'https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ',
    'https://fastly.picsum.photos/id/3/5000/3333.jpg?hmac=GDjZ2uNWE3V59PkdDaOzTOuV3tPWWxJSf4fNcxu4S2g',
]

cc.Class({
    extends: cc.Component,

    properties: {
        imageScollViewContent: cc.Node,
    },

    onLoad () {
        // this.imageScollViewContent.removeAllChildren();

        // this._loadImageByIndex(0)
        this.imageScollViewContent.removeAllChildren();
        // this.fetchImageApi(imageApis[0]);

        this.getImages(0);
    },

    getImages(index) {
        if (index == imageApis.length) return;
        this.scheduleOnce(() => {
            this.fetchImageApi(imageApis[index]);
            index++;
            this.getImages(index);
        }, 2)
        
    },

    async fetchImageApi(url) {
        try {
            const response = await fetch(url);
            const blob = await response.blob();
            const img = await this.createImageFromBlob(blob);

            const texture = new cc.Texture2D();
            texture.initWithElement(img);
            texture.handleLoadedTexture();
            const spriteFrame = new cc.SpriteFrame(texture);

            let spriteNode = new cc.Node("ImageNode");
            let sprite = spriteNode.addComponent(cc.Sprite);
            sprite.spriteFrame = spriteFrame;

            spriteNode.width = 80;
            spriteNode.height = 80;

            this.imageScollViewContent.addChild(spriteNode);

            cc.log("Ảnh đã được gán vào Sprite");
        } catch (err) {
            cc.error("Lỗi khi tải ảnh:", err);
        }
    },

    createImageFromBlob(blob) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = URL.createObjectURL(blob);
            img.onload = () => resolve(img);
            img.onerror = reject;
        });
    }
});