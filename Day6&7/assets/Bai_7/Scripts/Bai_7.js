// Learn cc.Class:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

class LazyMan {
    constructor(name) {
        this.name = name;
        console.log(`My name is ${this.name}`);
        this.promise = Promise.resolve();
        return this
      }

    eat(eat){
        this.promise = this.promise.then(()=>{
            return new Promise(resolve => setTimeout(()=>{
                console.log(`I am eating ${eat}`)
                resolve()
            },3000))
            
            
        })
        return this;
    }

    sleep(sleep) {
        this.promise = this.promise.then(() => {
          console.log('I am sleeping...');
          return new Promise(resolve => {
            setTimeout(() => {
              console.log(`After ${sleep} seconds`);
              resolve();
            }, sleep);
          });
        });
        return this;
      }      
}

cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        const lazyMan = new LazyMan('jack');
        lazyMan.eat('apple').sleep(5000).eat('hamburger').sleep(3000).eat('pear');
    },

    start() {

    },

    // update (dt) {},
});
