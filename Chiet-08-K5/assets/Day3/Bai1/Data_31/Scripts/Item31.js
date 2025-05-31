// Item31.js
import EquipmentSlot from "EquipmentSlot"
cc.Class({
    extends: cc.Component,

    properties: {
        image: cc.Sprite,
        countLabel: cc.Label,
    },

    onLoad() {
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this)
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this)
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this)
        this.parentNode = null
        this.startPos = cc.v2();
    },

    onTouchStart(event) {

        this.startPos = this.node.position
        this.parentNode = this.node.parent
        // Chuyển vị trí từ parent cũ sang scene
        let worldPos = this.node.parent.convertToWorldSpaceAR(this.node.position);

        let newPos = cc.director.getScene().convertToNodeSpaceAR(worldPos);
        this.node.parent = cc.director.getScene()

        // Set vị trí đúng theo scene
        this.node.position = newPos;
        this.node.zIndex = 999;
    },

    onTouchMove(event) {
        const delta = event.touch.getDelta()
        this.node.x += delta.x
        this.node.y += delta.y
    },

    onTouchEnd(event) {
        let dropped = false;
        let equipmentSlots = cc.find("Canvas/Background/BodyLayout/EquipmentPanel").children;
        console.log(equipmentSlots)

        for (let slot of equipmentSlots) {
            let slotScript = slot.getComponent(EquipmentSlot);
            let box = slot.getBoundingBoxToWorld();

            if (box.contains(event.getLocation())) {
                if (!slotScript.currentItem && slotScript.acceptItem(this.data)) {
                    slotScript.equip(this);
                    dropped = true;
                    break;
                }
            }
        }

        if (!dropped) {
            let worldPos = this.node.position
            let localPos = this.parentNode.convertToNodeSpaceAR(worldPos);

            this.node.parent = this.parentNode;
            this.node.position = localPos
        }
    },

    init(data, onClickCallback, inventoryManager) {
        this.data = data;
        this.countLabel.string = 'x' + data.quantity;
        this.loadImage(data.imagePath);
        this.inventoryManager = inventoryManager

        this.node.on('click', () => {
            onClickCallback(this.data);
        }, this);
    },

    loadImage(path) {
        cc.loader.loadRes(path, cc.SpriteFrame, (err, spriteFrame) => {
            if (!err) {
                this.image.spriteFrame = spriteFrame;
            } else {
                cc.error("Load image failed: ", path, err);
            }
        });
    },
});
