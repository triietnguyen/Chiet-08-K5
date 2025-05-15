function myDisplayer(data) {
    console.log(data)
}

function myCalculator(num1, num2, callback) {
    let sum = num1 + num2;
    setTimeout(() => { callback(sum) }, 2000)

}

myCalculator(3, 4, myDisplayer)