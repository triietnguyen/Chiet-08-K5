cc.Class({
    extends: cc.Component,

    properties: {
        itemPrefab: cc.Prefab,
        itemListNode: cc.Node,
        nameLabel: cc.Label,
        quantityLabel: cc.Label,
        typeLabel: cc.Label,
        effectLabel: cc.Label,
        useButton: cc.Button,
        deleteButton: cc.Button,
        messageLabel: cc.Label
    },

    onLoad() {
        this.inventory = [
            { name: "Bình máu", quantity: 3, type: "consumable", effect: "Hồi 20 máu" },
            { name: "Kiếm Sắt", quantity: 1, type: "equipment", effect: "Tăng 10 sức mạnh" },
            { name: "Bình năng lượng", quantity: 2, type: "consumable", effect: "Hồi 15 năng lượng" },
            { name: "Giáp Sắt", quantity: 1, type: "equipment", effect: "Tăng 20 giáp" },
            { name: "Bình máu lớn", quantity: 1, type: "consumable", effect: "Hồi 50 máu" },
            { name: "Kiếm Lửa", quantity: 1, type: "equipment", effect: "Tăng 25 sức mạnh và gây sát thương lửa" },
            { name: "Khiên Gỗ", quantity: 1, type: "equipment", effect: "Tăng 10 giáp" },
            { name: "Bình độc", quantity: 2, type: "consumable", effect: "Gây 30 sát thương cho kẻ địch" },
            { name: "Vòng cổ hồi phục", quantity: 1, type: "equipment", effect: "Hồi 5 máu mỗi lượt" },
            { name: "Thuốc tàng hình", quantity: 1, type: "consumable", effect: "Tàng hình trong 10 giây" }
        ];
        
        this.selectedItem = null;
        this.selectedIndex = null;
        this.showItem();
    },

    showItem() {
        this.itemListNode.removeAllChildren();
        this.inventory.forEach((item, index) => {
            const itemNode = cc.instantiate(this.itemPrefab);
            itemNode.getComponentInChildren(cc.Label).string = item.name;
            itemNode.on('click', () => this.selectItem(index), this);
            this.itemListNode.addChild(itemNode);
        });
        this.clearInfo();
    },

    selectItem(index) {
        this.selectedIndex = index;
        const item = this.inventory[index];
        this.selectedItem = item;

        this.nameLabel.string = item.name;
        this.quantityLabel.string = "Số lượng: " + item.quantity;
        this.typeLabel.string = "Loại: " + item.type;
        this.effectLabel.string = item.effect;

        this.useButton.interactable = item.type === "consumable" && item.quantity > 0;
        this.deleteButton.interactable = true;
    },

    clearInfo() {
        this.nameLabel.string = "";
        this.quantityLabel.string = "";
        this.typeLabel.string = "";
        this.effectLabel.string = "";
        this.selectedItem = null;
        this.selectedIndex = null;
        this.useButton.interactable = false;
        this.deleteButton.interactable = false;
    },

    useItem() {
        const item = this.selectedItem;
        if (!item) return;

        if (item.type === "consumable") {
            item.quantity -= 1;
            if (item.quantity <= 0) {
                this.inventory.splice(this.selectedIndex, 1);
            }
        } else if (item.type === "equipment") {
            this.showMessage("Đã trang bị " + item.name);
            this.inventory.splice(this.selectedIndex, 1);
        }

        this.refreshUI();
    },

    deleteItem() {
        if (this.selectedIndex != null) {
            const name = this.inventory[this.selectedIndex].name;
            this.showMessage("Đã xóa " + name);
            this.inventory.splice(this.selectedIndex, 1);
            this.refreshUI();
        }
    },

    refreshUI() {
        this.showItem();

        if (this.selectedIndex != null && this.selectedIndex < this.inventory.length) {
            this.selectItem(this.selectedIndex);
        } else {
            this.clearInfo();
        }
    },

    showMessage(msg) {
        this.messageLabel.string = msg;
        this.messageLabel.node.active = true;

        this.unschedule(this._hideMessage);
        this.scheduleOnce(this._hideMessage, 2);
    },

    _hideMessage() {
        this.messageLabel.node.active = false;
    }
});
