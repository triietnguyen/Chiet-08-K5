// Learn cc.Class:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.run()
    },

    getServerTime() {
        return new Date().getTime()
    },
    async circuitBreaker(fn, timeThreshold) {
        const startTime = Date.now();
        return function (...args) {
            const currentTime = Date.now();
            if (currentTime - startTime > timeThreshold) {
                return "service closed";
            }
            return fn(...args);
        };
    },

    async run() {
        let getTimeLimited = await this.circuitBreaker(this.getServerTime, 2000);
        setTimeout(() => { console.log(getTimeLimited()); }, 300)
        setTimeout(() => { console.log(getTimeLimited()); }, 2100)
    },
    start() {

    },

    // update (dt) {},
});
