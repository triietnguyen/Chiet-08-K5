
function printNumbers(i) {
    console.log(i); 

    if (i < 10) {
        setTimeout(() => {
            i++
            printNumbers(i);  
        }, 1000);  
    }
}

printNumbers(1);
