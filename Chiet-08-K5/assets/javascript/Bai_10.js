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

async function excute(){
  await asyncFunc1();
  await asyncFunc2();
  await asyncFunc3();
}

excute();