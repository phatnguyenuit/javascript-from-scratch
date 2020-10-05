// const p1 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     console.log(1000);
//     resolve();
//   }, 1000);
// });

// const p2 = new Promise((resolve, reject) => {
//   resolve();
// });

const onFulfilled1 = data => console.log('cb1', data);
const onFulfilled2 = data => console.log('cb2', data);

// p1.then(onFulfilled1);
// p2.then(onFulfilled2);
// console.log(3);

// setTimeout(() => {
//   p1.then(() => console.log(4));
// }, 2000);

const mp1 = new Promise(resolve => {
  setTimeout(() => {
    console.log(1000);
    resolve(1);
    // reject(new Error('Fail'));
  }, 1000);
});

const mp2 = new Promise(resolve => {
  resolve(2);
});

mp1
  .then(onFulfilled1)
  .then(res => console.log('cb1 res', res))
  .catch(e => console.log('cb1 error', e.message))
  .finally(() => {
    console.log('cb1 finally');
  });

mp2.then(onFulfilled2);
console.log(3);

setTimeout(() => {
  mp1
    .then(data => console.log('cb3', data))
    .then(res => console.log('cb3 res', res))
    .catch(e => console.log('cb3 error', e.message))
    .finally(() => {
      console.log('cb3 finally');
    });
}, 2000);

// 3
// cb2 2
// 1000
// cb1 1
// cb3 1

// Reference : https://levelup.gitconnected.com/learn-javascript-promises-by-building-a-fully-working-promise-from-scratch-c9eabe73fa3
