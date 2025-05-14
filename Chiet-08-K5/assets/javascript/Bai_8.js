function asyncFunc1(callback) {
    setTimeout(() => {
        callback(1);
        console.log("Da goi function 1")
    }, 3000);
}
function asyncFunc2(callback) {
    setTimeout(() => {
        callback(2);
        console.log("Da goi function 2")
    }, 2000);
}
function asyncFunc3(callback) {
    setTimeout(() => {
        callback(3);
        console.log("Da goi function 3")
    }, 1000);
}
asyncParallel([asyncFunc1, asyncFunc2, asyncFunc3], (result) => {
    console.log(result);
    // 1, 2, 3 (prints results of each asynchronous function in order)
});

function asyncParallel(arrays, callback) {
    let results = [];
    let completed = 0;

    arrays.forEach((element, index) => {
        console.log('element la', element)
        console.log('index la', index)
        element((result) => {
            console.log('index luc nay la', index)
            console.log('result la', result)
            results[index] = result;
            console.log('results[index] la', results)
            completed++;
            console.log('completed la', completed)
            console.log('arrays.length', arrays.length)
            if (completed === arrays.length) {
                console.log('completed va array.length la', completed, arrays.length)
                console.log('results la', results)
                callback(results);
            }
        });
    });
}
