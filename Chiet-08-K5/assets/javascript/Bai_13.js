function asyncFunc1() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("AsyncFunc1 completed");
            resolve("Result from asyncFunc1");
        }, 1000);
    });
}

function asyncFunc2() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("AsyncFunc2 completed");
            resolve("Result from asyncFunc2");
        }, 1500);
    });
}

function asyncFunc3() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("AsyncFunc3 completed");
            resolve("Result from asyncFunc3");
        }, 2000);
    });
}

function executeAsyncFunctions(functions) {
    return functions.reduce((promiseChain, currentFunction) => {
        return promiseChain
            .then(() => currentFunction()) 
            .catch(err => {
                console.error("Error:", err);
            });
    }, Promise.resolve()); 
}

const asyncFunctions = [asyncFunc1, asyncFunc2, asyncFunc3];

executeAsyncFunctions(asyncFunctions)
    .then(() => console.log("All functions completed"));
