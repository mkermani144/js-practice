// Promisify a function with a node-style callback parameter.

const promisify = fn => new Promise((resolve, reject) => {
  fn((err, data) => {
    if (err) {
      reject(err);
    }
    resolve(data);
  });
});

const fulfillOrRejectAfterOneSecond = cb => setTimeout(() => {
  const r = Math.round(Math.random());
  r ? cb(null, 'Hooray!') : cb('Error!');
}, 1000);
const fulfillOrRejectAfterOneSecondPromisified = promisify(fulfillOrRejectAfterOneSecond);

fulfillOrRejectAfterOneSecond((err, data) => {
  if (err) {
    return console.log('Using callback:', err);
  }
  console.log('Using callback:', data);
});

fulfillOrRejectAfterOneSecondPromisified
.then(data => console.log('Using promise:', data))
.catch(err => console.log('Using promise:', err))
