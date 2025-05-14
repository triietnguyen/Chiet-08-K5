
function printNumbers(i){
    console.log(i);  
    i++
    const intervalId = setInterval(() => {
        console.log(i); 
        i++;  
    
        if (i > 10) { 
            clearInterval(intervalId);  
        }
    }, 1000);  
}

printNumbers(1);

