import ItemData31 from "ItemData31";

// InventoryManager.js
cc.Class({
    extends: cc.Component,

    properties: {
        content: cc.Node,
        itemTemplate: cc.Prefab,
        infoPanel: cc.Node,
        addForm: cc.Node,
        nameLabel: cc.Label,
        typeLabel: cc.Label,
        effectLabel: cc.Label,
        useButton: cc.Node,
        deleteButton: cc.Node,
        notificationLabel: cc.Label,
        searchField: cc.EditBox,
        itemNameInput: cc.EditBox,
        itemQuantityInput: cc.EditBox,
        consumableToggle: cc.Toggle,
        equipmentToggle: cc.Toggle,
        itemEffectInput: cc.EditBox,
        submitItemButton: cc.Button,
        addItemButton: cc.Button,
        cancelButton: cc.Button
    },

    onLoad () {
        this.selectedItemIndex = -1;
        this.infoPanel.active = false; 
        this.useButton.active = false; 
        this.deleteButton.active = false; 
        this.addForm.active = false;
        
        this.searchText = "";
        this.searchTimeout = null;

        this.items = [
            new ItemData31("Heart", 2, "Consumable", "Tăng máu", "images/Heart"),
            new ItemData31("Energy", 3, "Consumable", "Tăng năng lượng", "images/Energy"),
            new ItemData31("Hulk", 1, "Equipment", "Tăng sức mạnh", "images/Hulk"),
            new ItemData31("Captain", 1, "Equipment", "Tăng tốc độ", "images/Captain"),
            new ItemData31("clock", 2, "Equipment", "Tăng tốc độ hồi chiêu", "images/clock"),
            new ItemData31("Universal", 1, "Equipment", "Miễn nhiễm sát thương", "images/Universal"),
            new ItemData31("white_clock", 1, "Equipment", "Tăng thời gian kỹ năng", "images/white_clock"),
        ];
        this.searchField.node.off('text-changed', this.onSearchTextChanged, this);
        this.searchField.node.on('text-changed', this.onSearchTextChanged, this);

        this.addItemButton.node.off('click', this.onOpenForm, this);
        this.addItemButton.node.on('click', this.onOpenForm, this);

        this.itemQuantityInput.node.on('text-changed', this.onQuantityInputChanged, this);

        this.submitItemButton.node.off('click', this.onAddItem, this);
        this.submitItemButton.node.on('click', this.onAddItem, this);

        this.renderItems();
    },

    onQuantityInputChanged(event) {
        const currentText = event.string;
    
        if (!/^\d*$/.test(currentText)) {
            this.itemQuantityInput.string = currentText.replace(/[^\d]/g, '');
        }
    },

    onCloseForm(){
        this.addForm.active = false;
        console.log("Form đã được đóng");
    },
    

    onOpenForm(){
        this.addForm.active = true;
        this.infoPanel.active = false;
    },

    onSearchTextChanged(event) {

        if (this.searchTimeout) {
            this.unschedule(this.searchTimeout); 
        }

        this.searchText = event.string.toLowerCase();

        this.searchTimeout = this.scheduleOnce(() => {
            this.renderItems(); 
        }, 2);

    },

    renderItems() {
        this.content.removeAllChildren();
        
        const filteredItems = this.items.filter(item => item.name.toLowerCase().includes(this.searchText));
    
        filteredItems.forEach((item, index) => {
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

        this.onCloseForm();
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
            this.scheduleNotificationHide(); 
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

    onAddItem() {
        const name = this.itemNameInput.string;
        const quantity = parseInt(this.itemQuantityInput.string, 10);
        const effect = this.itemEffectInput.string;
    
        if (!name || isNaN(quantity) || !effect) {
            this.notificationLabel.string = "Vui lòng điền đầy đủ thông tin!";
            this.scheduleNotificationHide(); 
            return;
        }
    
        let type = '';
        if (this.consumableToggle.isChecked) {
            type = 'Consumable';
        } else if (this.equipmentToggle.isChecked) {
            type = 'Equipment';
        }
    
        if (!type) {
            this.notificationLabel.string = "Vui lòng chọn loại vật phẩm!";
            this.scheduleNotificationHide(); 
            return;
        }
    
        const newItem = new ItemData31(name, quantity, type, effect, "images/default_item");
        this.items.push(newItem);
        this.addForm.active = false;
        
        this.itemNameInput.string = '';
        this.itemQuantityInput.string = '';
        this.itemEffectInput.string = '';
        this.consumableToggle.isChecked = false;
        this.equipmentToggle.isChecked = false;
    
        this.renderItems();
        this.notificationLabel.string = `Đã thêm vật phẩm ${name}`;
        this.scheduleNotificationHide(); 
    },
    
    scheduleNotificationHide() {
        this.scheduleOnce(() => {
            this.notificationLabel.string = ""; 
        }, 2); 
    }
    
});

