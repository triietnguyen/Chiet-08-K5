import ItemData31 from "ItemData31";

// InventoryManager.js
cc.Class({
    extends: cc.Component,

    properties: {
        content: cc.Node,
        itemTemplate: cc.Prefab,
        infoPanel: cc.Node,
        nameLabel: cc.Label,
        typeLabel: cc.Label,
        effectLabel: cc.Label,
        useButton: cc.Node,
        deleteButton: cc.Node,
        notificationLabel: cc.Label
    },

    onLoad() {
        this.selectedItemIndex = -1;
        this.infoPanel.active = false; 
        this.useButton.active = false; 
        this.deleteButton.active = false; 

        this.items = [
            new ItemData31("Heart", 2, "Consumable", "Tăng máu", "images/Heart"),
            new ItemData31("Energy", 3, "Consumable", "Tăng năng lượng", "images/Energy"),
            new ItemData31("Hulk", 1, "Equipment", "Tăng sức mạnh", "images/Hulk"),
            new ItemData31("Captain", 1, "Equipment", "Tăng tốc độ", "images/Captain"),
            new ItemData31("clock", 2, "Equipment", "Tăng tốc độ hồi chiêu", "images/clock"),
            new ItemData31("Universal", 1, "Equipment", "Miễn nhiễm sát thương", "images/Universal"),
            new ItemData31("white_clock", 1, "Equipment", "Tăng thời gian kỹ năng", "images/white_clock"),
        ];

        this.renderItems();
    },

    renderItems() {
        this.content.removeAllChildren();
        this.items.forEach((item, index) => {
            const itemNode = cc.instantiate(this.itemTemplate);

            const itemScript = itemNode.getComponent("Item31");
            itemScript.init(item, () => this.selectItem(index));

            this.content.addChild(itemNode);
        });
    },



    selectItem(index) {
        const item = this.items[index];
        this.selectedItemIndex = index;
        this.notificationLabel.string = ""

        this.nameLabel.string = item.name;
        this.typeLabel.string = item.type;
        this.effectLabel.string = item.effect;

        const imageSprite = this.infoPanel.getChildByName("Image").getComponent(cc.Sprite);
        cc.loader.loadRes(item.imagePath, cc.SpriteFrame, (err, spriteFrame) => {
            if (!err) {
                imageSprite.spriteFrame = spriteFrame;
            }
        });

        this.infoPanel.active = true;
        this.useButton.active = true; 
        this.deleteButton.active = true; 
    },

    onClickUse() {
        if (this.selectedItemIndex === -1) return;
        const item = this.items[this.selectedItemIndex];
        if (item.type === "Consumable") {
            item.quantity -= 1;
            if (item.quantity <= 0) {
                this.items.splice(this.selectedItemIndex, 1);
                this.infoPanel.active = false;
                this.useButton.active = false; 
                this.deleteButton.active = false; 

            }
        } else if (item.type === "Equipment") {
            this.infoPanel.active = false;
            this.useButton.active = false; 
            this.deleteButton.active = false; 
            this.notificationLabel.string = `Đã trang bị ${item.name}`;
            this.items.splice(this.selectedItemIndex, 1);
        }
        this.renderItems();
    },

    onClickDelete() {
        if (this.selectedItemIndex === -1) return;
        this.items.splice(this.selectedItemIndex, 1);
        this.selectedItemIndex = -1;
        this.infoPanel.active = false;
        this.useButton.active = false; 
        this.deleteButton.active = false; 
        this.renderItems();
    },
});
