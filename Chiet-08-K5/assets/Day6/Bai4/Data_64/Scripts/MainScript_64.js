// // Learn cc.Class:
// //  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
// //  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// // Learn Attribute:
// //  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
// //  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// // Learn life-cycle callbacks:
// //  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
// //  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

// import Store_64 from "Store_64";

// cc.Class({
//     extends: cc.Component,

//     properties: {

//     },

//     // LIFE-CYCLE CALLBACKS:

//     onLoad() {
//         const store1 = new Store_64('store_1')
//         const store2 = new Store_64('store_2');
//         const store3 = new Store_64('store_3');
//         const store4 = new Store_64('store_4');
//         const store5 = new Store_64('store_5');
//         store1.wait(store3);
//         store3.wait(store2);
//         store2.wait(store5);
//         store5.wait(store4);

//         this.contribute(3, store1, store2, store3, store4, store5)
//     },

//     contribute(stepTime, ...stores) {
//         for(let i = 0; i < stores.length; i++){
//             this.schedule(function() {
//                 cc.log(stores[i])
//         }, stepTime);
            
//         }
        
//     },

//     start() {

//     },



//     // update (dt) {},
// });


cc.Class({
    extends: cc.Component,

    properties: {},

    // LIFE-CYCLE CALLBACKS:
    onLoad() {
        class Store {
            constructor(name) {
                this.name = name;
                this.dependencies = [];
                this.executed = false;
            }

            wait(store) {
                this.dependencies.push(store);
            }

            async run(stepTime) {
                for (const dep of this.dependencies) {
                    await dep.run(stepTime);
                }
                if (!this.executed) {
                    this.executed = true;
                    await this.sleep(stepTime * 1000);
                    cc.log(this.name); 
                }
            }

            sleep(ms) {
                return new Promise(resolve => setTimeout(resolve, ms));
            }
        }

        async function contribute(stepTime, ...stores) {
            for (const store of stores) {
                store.executed = false;
            }
            for (const store of stores) {
                await store.run(stepTime);
            }
        }

        const store1 = new Store('store_1');
        const store2 = new Store('store_2');
        const store3 = new Store('store_3');
        const store4 = new Store('store_4');
        const store5 = new Store('store_5');

        store1.wait(store3);
        store3.wait(store2);
        store2.wait(store5);
        store5.wait(store4);

        contribute(3, store1, store2, store3, store4, store5);
    },

    start() {}
});
