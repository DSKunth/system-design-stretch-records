"use strict";

// Lesson 2: Asynchronous JavaScript and the Event Loop.
// Standalone programs and observations go in this file as code and comments.

// ===== Provided program (task step 2): predict before you run =====
// Write your predicted output order as a comment BELOW, before running this
// file with node. Then run it, mark each line of your prediction right or
// wrong, and correct the wrong ones with one sentence each explaining why.

console.log("doors open");
setTimeout(() => console.log("encore"), 1000);
setTimeout(() => console.log("soundcheck"), 0);
console.log("main act");
setTimeout(() => console.log("intermission"), 500);
console.log("lights down");

// Step 2
// Your prediction:
// 1. doors open - right
// 2. main act - right
// 3. lights down - right
// 4. soundcheck - right
// 5. intermission - right
// 6. encore - right

// Step 3: Blocking loop observation
// The blocking loop occupied the call stack for 5 seconds and prevented other parts of JavaScript
// from running. During this time, scrolling, selecting text, clicking shuffle, clicking other button,
// and interacting with page were frozen until the loop finished and the function returned.

// ===== Provided program (task step 4): trace the call stack =====
// Trace this as a written call stack diagram in comments, listing every push
// and pop in order. Then cause an error inside the innermost function and
// confirm the stack trace in the console matches your diagram, innermost
// first. Keep it commented out while you work on step 2.

function prepare(artist) {
  return "Now playing " + format(artist);
}
function format(artist) {
  return artist.name.toUpperCase();
}
console.log(prepare({ name: "Asake" }));

// Step 4: Trace a call stack and error test
// Push 1: prepare(artist) is called and pushed to to the call stack
// Stack: global > prepare(artist)

// Push 2: format(artist) is called from prepare(artist) and pushed on to the stack
// Stack: global > prepare(artist) > format(artist)

// Pop: format(artist) returns "ASAKE" and is removed from the stack
// Stack: global > prepare(artist)

// Pop prepare(artist) returns "Now Playing ASAKE" and is removed from the stack
// Stack: global

// Error test:
// I deliberately changed toUpperCase() to toUpperCas() inside format().
// The console reported TypeError: artist.name.toUpperCas is not a function.

// Stack trace order:
// at format (...lesson-02.js:41:22)
// at prepare (...lesson-02.js:38:27)
// at Object.<anonymous> (...lesson-02.js:43:13)

// Stack trace showed format() above prepare().
// This matches the call stack: format() was the innermost function(), called by prepare()
// which was called by the global code.

// Step 5: Simulated slow data source
// A loading message was displayed while the page waited two seconds before
// rendering the artist cards. setTimeout() scheduled the work for later, so
// the JavaScript execution lane was not blocked while the timer was waiting.
// The page remained responsive during the wait, and the loading message
// disappeared when the cards were rendered.

// Step 6: Countdown 10 to 0 using setInterval()
let count = 10;

const countdown = setInterval(() => {
  console.log(count);

  if (count === 0) {
    clearInterval(countdown);
  }
  count--;
}, 1000);

// setInterval() runs the callback every second and displays the count from
// 10 down to 0. When the count reaches 0, clearInterval() stops the timer,
// so nothing is logged after 0.

// Step 7: How JavaScript handles a thousand simultaneous waiting tasks
// JavaScript has a single call stack, so only one piece of JavaScript runs at
// a time. Tasks that need to wait, such as timers or network requests, are
// handled by browser facilities instead of occupying the stack. When they are
// ready, their callbacks wait in queues. The event loop checks the stack and
// moves queued work onto it when the stack is free, allowing many tasks to
// wait without freezing the page.
