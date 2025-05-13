function asyncFunc1() {
  return new Promise((resolve, reject) => {
      console.log("Started asyncFunc1");
      setTimeout(() => {
          console.log("Completed asyncFunc1");
          resolve(1); 
      }, 3000);
  });
}

function asyncFunc2() {
  return new Promise((resolve, reject) => {
      console.log("Started asyncFunc2");
      setTimeout(() => {
          console.log("Completed asyncFunc2");
          resolve(2); 
      }, 2000);
  });
}

function asyncFunc3() {
  return new Promise((resolve, reject) => {
      console.log("Started asyncFunc3");
      setTimeout(() => {
          console.log("Completed asyncFunc3");
          resolve(3);
      }, 1000);
  });
}

asyncFunc1()
  .then(result1 => {
      console.log(result1); 
      return asyncFunc2(); 
  })
  .then(result2 => {
      console.log(result2);
      return asyncFunc3(); 
  })
  .then(result3 => {
      console.log(result3);
  })
  .catch(error => {
      console.error("Errorr: ", error); 
  });
