// Learn cc.Class:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        label: cc.Label
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.getLabel();
    },

    start () {

    },

    getServerTime(){
        return new Promise(function(resolve, reject) {
            let xmlHttp;
            try{
                xmlHttp = new XMLHttpRequest();
            }
            catch (err1){
                try{
                    xmlHttp = new ActiveXObject('Msxml2.XMLHTTP');
                }catch(err2){
                    try{
                        xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
                    }catch(err3){
                        //AJAX not supported, use CPU time.
                        alert("AJAX not supported");
                    }
                }
            }
            xmlHttp.open('HEAD', window.location.href.toString(), false);
            xmlHttp.setRequestHeader("Content-Type","text/html");
            xmlHttp.send('');
            resolve(new Date(xmlHttp.getResponseHeader("Date")).getTime())
            });
    },

    async getLabel(){
        const result = await this.getServerTime()
        this.label.string  = await result
    }

    // update (dt) {},
});
