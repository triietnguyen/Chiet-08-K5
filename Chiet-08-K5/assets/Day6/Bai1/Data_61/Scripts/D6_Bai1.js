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

    getLabel(){
        this.getServerTime().then(result=>{this.label.string  = result});
    }
    
    
    // update (dt) {},
    
});
