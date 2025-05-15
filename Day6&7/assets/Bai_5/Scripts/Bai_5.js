// Learn cc.Class:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    async onLoad() {
        let startTime = await this.getLocalTime()
        console.log("startTime", startTime)
        for (let i = 0; i < 10; i++) {
            const currentTime = await this.getLocalTime();
            console.log("currentTime", currentTime)
       
            const latancy = currentTime - startTime;
            startTime = currentTime;
            console.log('Độ trễ: ' + latancy)
        }
    },

    getLocalTime :function() {
        return new Promise((resolve, reject)=>{
            const a = new Date().getTime()
            resolve(a)
        })
    },

    start() {

    },

    // update (dt) {},
});
