import ItemData25 from "ItemData25";

// InventoryManager.js
cc.Class({
    extends: cc.Component,

    properties: {
        content: cc.Node,
        itemTemplate: cc.Prefab,
        infoPanel: cc.Node,
        nameLabel: cc.Label,
        priceLabel: cc.Label,
        useButton: cc.Node,
        notificationLabel: cc.Label,
        coinsLabel: cc.Label,
    },

    onLoad() {
        this.selectedItemIndex = -1;
        this.coins = 200;
        this.infoPanel.active = false;
        this.useButton.active = false;

        this.items = [
            new ItemData25("Heart", 50, "images/Heart"),
            new ItemData25("Energy", 100, "images/Energy"),
            new ItemData25("Hulk", 150, "images/Hulk"),
            new ItemData25("Captain", 200, "images/Captain"),
            new ItemData25("clock", 120, "images/clock"),
            new ItemData25("Universal", 80, "images/Universal"),
            new ItemData25("white_clock", 90, "images/white_clock"),
        ];

        this.renderItems();
        this.updateCoins();
    },


    renderItems() {
        this.content.removeAllChildren();

        this.items.forEach((item, index) => {
            const itemNode = cc.instantiate(this.itemTemplate);

            const itemScript = itemNode.getComponent("Item25");
            itemScript.init(item, () => this.selectItem(index));

            this.content.addChild(itemNode);
        });
    },

    selectItem(index) {
        const item = this.items[index];
        this.selectedItemIndex = index;
        this.notificationLabel.string = ""

        this.nameLabel.string = item.name;
        this.priceLabel.string = `Price: ${item.price}`;

        const imageSprite = this.infoPanel.getChildByName("Image").getComponent(cc.Sprite);
        cc.loader.loadRes(item.imagePath, cc.SpriteFrame, (err, spriteFrame) => {
            if (!err) {
                imageSprite.spriteFrame = spriteFrame;
            }
        });

        this.infoPanel.active = true;
        this.useButton.active = true;

    },

    hiddenInfoPanel() {
        this.infoPanel.active = false;
        this.useButton.active = false;
    },

    onClickBuy() {
        if (this.selectedItemIndex === -1) return;
        const item = this.items[this.selectedItemIndex];
        this.buyItem(item);
    },

    buyItem(item) {
        if (this.coins >= item.price) {
            this.coins -= item.price;
            this.items.splice(this.selectedItemIndex, 1);
            this.hiddenInfoPanel();
            this.showNotification(`Đã mua ${item.name}`);
        } else {
            this.showNotification("Không đủ xu để mua!");
        }

        this.renderItems();
        this.updateCoins();
    },

    updateCoins() {
        this.coinsLabel.string = `Coins: ${this.coins}`;
    },

    showNotification(message) {
        this.notificationLabel.string = message;
        this.scheduleOnce(() => {
            this.notificationLabel.string = "";
        }, 2);
    }
});
