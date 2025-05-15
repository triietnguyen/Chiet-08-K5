// Learn cc.Class:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

// item.js
cc.Class({
    extends: cc.Component,

    properties: {
        title: "",
        timeExcute:0,
    },

    onLoad: function () {
        this.dependencies = [];
        this.executed = false;
    },

    init: function (title, timeExcute) {
        this.title = title;
        this.executed = false;
        this.dependencies = [];
        this.timeExcute = timeExcute;
        console.log(this.timeExcute)
    },

    wait: function (store) {
        this.dependencies.push(store);
    },

    run: async function (stepTime) {
         if(this.timeExcute > stepTime){
            
            return
        }
        for (const dep of this.dependencies) {
            if(dep.timeExcute > stepTime){
                return
            }
            await dep.run(stepTime);
        }

        if (this.executed) return;
        console.log(this.timeExcute)
        this.executed = true;
        
   
        console.log(this.title);
        this.node.active = false;
        await this.sleep(stepTime * 1000);
    },

    sleep: function (ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    },
});
