function asyncFunc1() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Completed asyncFunc1");
            resolve(1);  
        }, 3000);
    });
}

function asyncFunc2() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Completed asyncFunc2");
            resolve(2);  
        }, 2000);
    });
}

function asyncFunc3() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("Completed asyncFunc3");
            resolve(3);  
        }, 1000);
    });
}

function executeAsyncFunctions(functions) {
    Promise.all(functions.map(func => func()))
        .then(results => {
            console.log("All functions completed in order:");
            results.forEach(result => console.log(result)); 
        })
        .catch(err => console.error("Error:", err));
}

const asyncFunctions = [asyncFunc1, asyncFunc2, asyncFunc3];

executeAsyncFunctions(asyncFunctions);
