// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
cc.Class({
    extends: cc.Component,

    properties: {
        content: cc.Node,
        itemTemplate: cc.Prefab,
        experienceLabel: cc.Label,   
        levelLabel: cc.Label,        
        progressBar: cc.ProgressBar
    },

    onLoad () {
        this.experience = 0;
        this.level = 1;

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
            { name: "Mission 11", status: "incomplete" },
            { name: "Mission 12", status: "incomplete" },
            { name: "Mission 13", status: "completed" },
            { name: "Mission 14", status: "incomplete" },
            { name: "Mission 15", status: "completed" },
            { name: "Mission 16", status: "incomplete" },
            { name: "Mission 17", status: "incomplete" },
            { name: "Mission 18", status: "completed" },
            { name: "Mission 19", status: "incomplete" },
            { name: "Mission 20", status: "completed" },
        ];

        this.renderQuests();
        this.updateExperienceAndLevel();
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
        if (quest.status === "incomplete") {
            quest.status = "completed";
            this.experience += 10; 
        }

        if (this.experience >= 100) {
            this.level += 1;
            this.experience = 0;
        }

        this.renderQuests();
        this.updateExperienceAndLevel();
    },

    updateExperienceAndLevel() {
        this.experienceLabel.string = `Experience: ${this.experience}/100`;
        
        this.levelLabel.string = `Level: ${this.level}`;

        cc.tween(this.progressBar)
            .to(0.5, { progress: this.experience / 100 }) 
            .start();
    },

    start () {

    },

    // update (dt) {},
});
