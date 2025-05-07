cc.Class({
    extends: cc.Component,

    properties: {
        addItemButton: cc.Button,   
        showItemsButton: cc.Button, 
        itemInput: cc.EditBox,      
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
       
        this.items = ["Sword", "Shield", "Potion"];
        
    },

    onAddItem () {
        let newItem = this.itemInput.string; 
        if (newItem) {
            this.items.push(newItem); 
            this.itemInput.string = ""; 
            console.log("Item added: " + newItem);
        } else {
            console.log("Please enter an item name.");
        }
    },

    onShowItems () {
        console.log("Current Items: ", this.items);
    },
});
