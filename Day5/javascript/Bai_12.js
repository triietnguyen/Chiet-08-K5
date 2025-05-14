function asyncFunc1() {
    return new Promise((resolve, reject) => {
        console.log("Started asyncFunc1");
        setTimeout(() => {
            console.log("Completed asyncFunc1");
            resolve(1);  
            reject("Error in asyncFunc1"); 
        }, 3000);
    });
}

function asyncFunc2() {
    return new Promise((resolve, reject) => {
        console.log("Started asyncFunc2");
        setTimeout(() => {
            console.log("Completed asyncFunc2");
            resolve(2);  
            reject("Error in asyncFunc2"); 
        }, 2000);
    });
}

function asyncFunc3() {
    return new Promise((resolve, reject) => {
        console.log("Started asyncFunc3");
        setTimeout(() => {
            console.log("Completed asyncFunc3");
            resolve(3);  
            reject("Error in asyncFunc3"); 
        }, 1000);
    });
}

async function runAsyncFunctions() {
    try {
        const result1 = await asyncFunc1();  
        console.log(result1);
    } catch (error) {
        console.error("Errorr in asyncFunc1:", error);
    }

    try {
        const result2 = await asyncFunc2();  
        console.log(result2);
    } catch (error) {
        console.error("Errorr in asyncFunc2:", error);
    }

    try {
        const result3 = await asyncFunc3();  
        console.log(result3);
    } catch (error) {
        console.error("Errorr in asyncFunc3:", error);
    }
}

runAsyncFunctions();
