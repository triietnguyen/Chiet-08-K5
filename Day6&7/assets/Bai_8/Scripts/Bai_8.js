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
    getServerTime() {
        let xmlHttp;
        try {
            xmlHttp = new XMLHttpRequest();
        }
        catch (err1) {
            try {
                xmlHttp = new ActiveXObject('Msxml2.XMLHTTP');
            } catch (err2) {
                try {
                    xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
                } catch (err3) {
                    //AJAX not supported, use CPU time.
                    alert("AJAX not supported");
                }
            }
        }
        xmlHttp.open('HEAD', window.location.href.toString(), false);
        xmlHttp.setRequestHeader("Content-Type", "text/html");
        xmlHttp.send('');
        return new Date(xmlHttp.getResponseHeader("Date")).getTime()
    },

    getLocalTime() {
        return new Date().getTime()
    },

    async onLoad() {
        const localTime = await this.promisify(this.getLocalTime)();
        const serverTime = await this.promisify(this.getServerTime)();
        const latancy = serverTime - localTime;
        console.log("Độ trễ : " + latancy)
    },

    promisify(fn) {
        return (...args) => {
            try {
                let checkFunc = fn(...args);
                if (checkFunc instanceof Promise) {
                    return checkFunc;
                } else {
                    return Promise.resolve(checkFunc)
                }
            } catch (error) {
                return Promise.reject(errorr)
            }
        }
    },

    start() {

    },

    // update (dt) {},
});
