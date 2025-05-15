function asyncFunc1() {
    return new Promise((resolve, reject) => {
        console.log("Started asyncFunc1");
        setTimeout(() => {
            console.log("Completed asyncFunc1");
            // resolve(1);
            reject("Error in asyncFunc1");
        }, 3000);
    });
}

function asyncFunc2() {
    return new Promise((resolve, reject) => {
        console.log("Started asyncFunc2");
        setTimeout(() => {
            console.log("Completed asyncFunc2");
            // resolve(2);
            reject("Error in asyncFunc2");
        }, 2000);
    });
}

function asyncFunc3() {
    return new Promise((resolve, reject) => {
        console.log("Started asyncFunc3");
        setTimeout(() => {
            console.log("Completed asyncFunc3");
            resolve(0);
            // reject("Error in asyncFunc3");
        }, 1000);
    });
}

asyncFunc1()
    .catch(error => {
        console.error("Error in asyncFunc1: ", error);
        return "Error handled in asyncFunc1"; 
    })
    .then(() => asyncFunc2())
    .catch(error => {
        console.error("Error in asyncFunc2: ", error);
        return "Error handled in asyncFunc2"; 
    })
    .then(() => asyncFunc3())
    .catch(error => {
        console.error("Error in asyncFunc3: ", error);
        return "Error handled in asyncFunc3";
    });