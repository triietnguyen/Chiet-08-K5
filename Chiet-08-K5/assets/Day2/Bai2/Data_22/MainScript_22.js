cc.Class({
    extends: cc.Component,

    properties: {
        questContainer: cc.Node,     
        questItemPrefab: cc.Prefab,  
    },

    onLoad() {
        this.questList = [
            { title: "Đánh bại quái vật", completed: false },
            { title: "Thu thập 10 vàng", completed: false },
            { title: "Nói chuyện với NPC", completed: false },
        ];

        this.displayQuests();
    },

    displayQuests() {
        this.questContainer.removeAllChildren();

        this.questList.forEach((quest, index) => {
            const item = cc.instantiate(this.questItemPrefab);
            const label = item.getComponent(cc.Label);
            label.string = `${quest.completed ? "✅" : "⬜"} ${quest.title}`;

            this.questContainer.addChild(item);
        });
    },

    completeQuest(index) {
        if (this.questList[index]) {
            this.questList[index].completed = true;
            this.displayQuests(); 
        }
    },
});
