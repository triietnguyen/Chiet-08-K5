// Learn cc.Class:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const Items = [
    'https://jsonplaceholder.typicode.com/posts/1',
    'https://jsonplaceholder.typicode.com/posts/2',
    'https://jsonplaceholder.typicode.com/posts/3',
    'https://jsonplaceholder.typicode.com/posts/4',
    'https://jsonplaceholder.typicode.com/posts/5',
    'https://jsonplaceholder.typicode.com/posts/6',
    'https://jsonplaceholder.typicode.com/posts/7',
];

cc.Class({
    extends: cc.Component,

    properties: {
        TIMEOUT: 5000,
        URL: 'https://jsonplaceholder.typicode.com/posts/1',
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        console.log('Item', Items[1])
        // Usage example
        this.fetchDataWithTimeout(URL, TIMEOUT)
            .then(data => {
                console.log('Fetched data:'
                    , data);
                console.log('Title:'
                    , data.title);
                console.log('Body:'
                    , data.body);
            })
            .catch(error => {
                console.error('Error:'
                    , error.message);
            });
    },


    fetchDataWithTimeout(url, timeout) {
        return new Promise((resolve, reject) => {
            const controller = new AbortController();
            const signal = controller.signal;

            const timer = setTimeout(() => {
                controller.abort();
                reject('Request timed out');
            }, timeout);

            fetch(url, { signal })
                .then(response => {
                    clearTimeout(timer);
                    if (!response.ok) {
                        reject('Not Ok');
                        return;
                    }
                    return response.json();
                })
                .then(data => {
                    resolve(data);
                })
                .catch(err => {
                    if (err.name === 'AbortError') {
                        reject(er);
                    } else {
                        reject(err);
                    }
                });
        });
    },



    start() {

    },

    // update (dt) {},
});



