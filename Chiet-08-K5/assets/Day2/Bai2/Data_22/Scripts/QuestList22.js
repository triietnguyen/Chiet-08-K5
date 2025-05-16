// // Learn cc.Class:
// //  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
// //  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// // Learn Attribute:
// //  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
// //  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// // Learn life-cycle callbacks:
// //  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
// //  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        content: cc.Node,
        itemTemplate: cc.Prefab
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.questList = [
            { name: "Mission 1", status: "incomplete" },
            { name: "Mission 2", status: "incomplete" },
            { name: "Mission 3", status: "completed" },
            { name: "Mission 4", status: "incomplete" },
            { name: "Mission 5", status: "completed" },
            { name: "Mission 6", status: "incomplete" },
            { name: "Mission 7", status: "incomplete" },
            { name: "Mission 8", status: "completed" },
            { name: "Mission 9", status: "incomplete" },
            { name: "Mission 10", status: "completed" },
        ];

        this.renderQuests();
    },

    renderQuests() {
        this.content.removeAllChildren();
    
        this.questList.forEach((item, index) => {
            const questNode = cc.instantiate(this.itemTemplate);
    
            const nameLabel = questNode.getChildByName("MissionName").getComponent(cc.Label);
            nameLabel.string = item.name;
    
            const statusLabel = questNode.getChildByName("Status").getComponent(cc.Label);
            statusLabel.string = item.status === "completed" ? "Completed" : "Incomplete";

            statusLabel.node.off("touchend", () => this.completeQuest, this);
    
            statusLabel.node.on("touchend", () => this.completeQuest(index), this);
    
            this.content.addChild(questNode);
        });
    },
    
    completeQuest(index) {
        
        const quest = this.questList[index];
        if(quest.status === "incomplete") quest.status = "completed"
    
        this.renderQuests();  
    },
    

    start () {

    },

    // update (dt) {},
});
