async function asyncFunc1() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Completed asyncFunc1");
            resolve("Result from asyncFunc1");
        }, 3000);
    });
}

async function asyncFunc2() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Completed asyncFunc2");
            resolve("Result from asyncFunc2");
        }, 2000);
    });
}

async function asyncFunc3() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Completed asyncFunc3");
            resolve("Result from asyncFunc3");
        }, 1000);
    });
}

function timeoutFunc(timeout) {
    return new Promise((_, reject) => {
        setTimeout(() => {
            reject("Timeout exceeded");
        }, timeout);
    });
}

const timeoutDuration = 2500;

const asyncArr = [asyncFunc1, asyncFunc2, asyncFunc3];

const promiseArr = asyncArr.map(func => func());  
promiseArr.push(timeoutFunc(timeoutDuration));  

Promise.race(promiseArr)
    .then(result => {
        console.log("First result:", result);
    })
    .catch(error => {
        console.log("Error:", error);
    });
