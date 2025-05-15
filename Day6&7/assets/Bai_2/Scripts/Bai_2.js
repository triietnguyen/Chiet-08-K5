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

    onLoad() {
        this.fetchWithAutoRetry(this.simulateAPICall)
            .then(result => {
                console.log('Success:', result);
            }).catch(error => {
                console.error('All retries failed:')
            });
    },

    start() {

    },

    // update (dt) {},

    // Iterative approach
    async fetchWithAutoRetry(fetcher, maximumRetryCount = 5) {
        let retry = 0;
        while (retry < maximumRetryCount) {
            try {
                const result = await fetcher();
                console.log('result', result)
                return result;
            } catch (error) {
                retry++;
                if (retry === maximumRetryCount) {
                    throw error; 
                }
            }
        }
    },
    // Usage example
    simulateAPICall() {
        return new Promise((resolve, reject) => {
            // Simulate a 50% chance of failure
            let a = false
            console.log('a',a)
            if (a == false) {
                reject(new Error('API call failed'));
            } else {
                resolve('API call succeeded');
            }
        });
    },


});
