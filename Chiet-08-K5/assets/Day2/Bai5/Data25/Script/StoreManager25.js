import ItemData25 from "ItemData25";
import Item25 from "Item25"

// InventoryManager.js
cc.Class({
    extends: cc.Component,

    properties: {
        content: cc.Node,
        itemTemplate: cc.Prefab,
        infoPanel: cc.Node,
        imageItem: cc.Node,
        nameLabel: cc.Label,
        priceLabel: cc.Label,
        useButton: cc.Node,
        notificationLabel: cc.Label,
        coinsLabel: cc.Label,
    },

    onLoad() {
        this.selectedItemIndex = null;
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
        ];

        this.useButton.on('click', this.onClickBuy, this)

        this.renderItems();
        this.updateCoins();
    },

    renderItems() {
        this.content.removeAllChildren()

        this.items.forEach((item, index) => {
            this.itemNode = cc.instantiate(this.itemTemplate)
            this.itemNode.mainScript = this.itemNode.getComponent(Item25)
            this.itemNode.mainScript.init(item, () => this.clickItem(index))
            this.content.addChild(this.itemNode)
        })
    },

    clickItem(index) {
        this.item = this.items[index]
        this.selectedItemIndex = index
        console.log('item chon la', this.selectedItemIndex)
        this.nameLabel.string = this.item.name
        console.log('Name label', this.nameLabel.string)
        this.priceLabel.string = this.item.price
        console.log('Price Label', this.priceLabel.string)
        cc.loader.loadRes(this.item.image, cc.SpriteFrame, (err, spriteFrame) => {
            if (err) {
                console.log("Lỗi tải ảnh", err)
                return
            }
            else {
                this.spriteItem = this.imageItem.getComponent(cc.Sprite)
                this.spriteItem.spriteFrame = spriteFrame
            }
        })
        this.showPanel()
        this.showButton()
    },

    showPanel() {
        this.infoPanel.active = true
    },

    hiddenPanel() {
        this.infoPanel.active = false
    },

    showButton() {
        this.useButton.active = true
    },

    onClickBuy() {
        if (this.selectedItemIndex == -1) return
        this.item = this.items[this.selectedItemIndex]

        this.buyItem(this.item)
    },

    buyItem(item) {
        if (this.coins >= item.price) {
            this.coins -= item.price
            this.items.splice(this.selectedItemIndex, 1)
            this.hiddenPanel()
            this.showNotification("Đã mua thành công vật phẩm ", item.name)
        } else {
            this.showNotification("Không đủ xu để mua")
        }
        this.renderItems()
        this.updateCoins()
    },

    updateCoins() {
        this.coinsLabel.string = this.coins;
    },

    showNotification(message) {
        this.notificationLabel.string = message;
        this.scheduleOnce(() => {
            this.notificationLabel.string = ""
        }, 2)
    }




});
