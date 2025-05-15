function asyncFunc1() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(2);
            console.log("Da goi function 1")
        }, 3000);
    })

}
function asyncFunc2() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(3);
            console.log("Da goi function 2")
        }, 2000);
    })

}
function asyncFunc3() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(4);
            console.log("Da goi function 3")
        }, 1000);
    })

}

async function asyncParallel(arrays) {
    let results = [];
    let completed = 0;
    sum = 0;

    const promises = arrays.map((element, index) => {
        console.log(element, index)
        let a = element().then(result => {
            console.log('result', result)
            results[index] = result;
            sum = sum + result;
            completed++;
        });
        console.log('a',a)
        return a;
    });

    console.log('promises', promises)

    await Promise.all(promises);

    console.log('ket qua mang la',results)
    return sum;

}

async function excute() {
    let total = await asyncParallel([asyncFunc1, asyncFunc2, asyncFunc3]);
    console.log('Sum:', total)
}

excute()




//convert sang asynca/await cac function
//in tong la ket quả khi mà mỗi cái function nhận vào








