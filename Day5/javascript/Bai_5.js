for (let i = 10; i >= 1; i--) {
    setTimeout((i)=> {
        console.log(i); 
    }, (10 - i) * 1000, i);  
}
