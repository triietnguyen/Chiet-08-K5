function timer(start, step) {

    function startTimer() {
      
        intervalId = setInterval(() => {
            console.log(start); 
            start += step; 
        }, 1000); 
    }

    function stopTimer() {
        clearInterval(intervalId); 
    }

    return {
        startTimer,
        stopTimer
    };
}

const timerInstance = timer(100, 10); 
timerInstance.startTimer(); 

setTimeout(() => {
    timerInstance.stopTimer(); 
}, 5000);
