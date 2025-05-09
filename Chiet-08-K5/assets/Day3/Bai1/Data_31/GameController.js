const Data = require('Data');

cc.Class({
    name: 'GameController',
    properties: {
        data: null,
        mainScript: null,
        selectedItem: null,
        selectedIndex: null
    },

    ctor(data, mainScript) {
        this.data = data;
        this.mainScript = mainScript;
        this.selectedItem = null;
        this.selectedIndex = null;
    },

    showItem() {
        this.mainScript.itemListNode.removeAllChildren();
        this.data.getItemList().forEach((item, index) => {
            const itemNode = cc.instantiate(this.mainScript.itemPrefab);
            itemNode.getComponentInChildren(cc.Label).string = item.name;
            itemNode.on('click', () => this.selectItem(index), this);
            this.mainScript.itemListNode.addChild(itemNode);
        });
    },

    selectItem(index) {
        console.log("index", index);
        this.selectedIndex = index;
        const item = this.data.getItem(index);
        this.selectedItem = item;

        this.mainScript.nameLabel.string = item.name;
        this.mainScript.quantityLabel.string = "Số lượng: " + item.quantity;
        this.mainScript.typeLabel.string = "Loại: " + item.type;
        this.mainScript.effectLabel.string = item.effect;
    },

    clearInfo() {
        this.mainScript.nameLabel.string = "";
        this.mainScript.quantityLabel.string = "";
        this.mainScript.typeLabel.string = "";
        this.mainScript.effectLabel.string = "";
        this.selectedItem = null;
        this.selectedIndex = null;
    },

    useItem() {
        if (!this.selectedItem) return;

        const item = this.selectedItem;
        const shouldRemove = item.use();
        if(item.type === "equipment"){
            const name = this.data.getItem(this.selectedIndex).name;
            this.mainScript.showMessage("Đã trang bị " + name);
        }
        if (shouldRemove) {
            this.data.removeItem(this.selectedIndex);
        }

        this.refreshUI();
    },



    refreshUI() {
        this.showItem();

        if (this.selectedIndex != null && this.selectedIndex < this.data.getItemList().length) {
            this.selectItem(this.selectedIndex);
        } else {
            this.clearInfo();
        }
    },


    deleteItem() {
        if (this.selectedIndex != null) {
            const name = this.data.getItem(this.selectedIndex).name;
            this.mainScript.showMessage("Đã xóa " + name);
            this.data.removeItem(this.selectedIndex);
            this.refreshUI();
        }
    },

    showMessage(msg) {
        this.mainScript.messageLabel.string = msg;
        this.mainScript.messageLabel.node.active = true;

        this.mainScript.unschedule(this.mainScript._hideMessage);
        this.mainScript.scheduleOnce(this.mainScript._hideMessage, 2);
    }
});
