// Count from 1 through 10 with 100ms delay between each,
// using `setTimeout` in a loop.


// Doesn't work. All setTimeouts access to the same
// variable `i` from the for loop scope (that is,
// the global scope) after it has changed 10 times
// (and `i` is 11).
const varInForLoop = () => {
  console.log('`var` in for loop:');
  for (var i = 1; i <= 10; i++) {
    setTimeout(() => {
      console.log('counting,', i);
    }, i * 100);
  }
}


// Still doesn't work. `i` still belongs to the for loop 
// scope and IIFE scopes don't have local variable `i`,
// so `i` becomes 11 again.
const IIFE1InForLoop = () => {
  console.log('`IIFE1` in for loop:');
  for (var i = 1; i <= 10; i++) {
    (() => setTimeout(() => {
      console.log('counting,', i);
    }, i * 100))();
  }
}

// This works! Each IIFE has access to its own scope `j`
// variable that comes as its parameter.
const IIFE2InForLoop = () => {
  console.log('`IIFE2` in for loop:');
  for (var i = 1; i <= 10; i++) {
    ((j) => setTimeout(() => {
      console.log('counting,', j);
    }, j * 100))(i);
  }
}

// `let` creates a new block scope per iteration. So this
// works too.
const letInForLoop = () => {
  console.log('`let` in for loop:');
  for (let i = 1; i <= 10; i++) {
    setTimeout(() => {
      console.log('counting,', i);
    }, i * 100);
  }
}

varInForLoop();
setTimeout(IIFE1InForLoop, 1200);
setTimeout(IIFE2InForLoop, 2400);
setTimeout(letInForLoop, 3600);