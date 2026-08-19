"use strict";

// Lesson 3: Promises, async, and await.
// Standalone programs and observations go in this file as code and comments.
// The loader work happens in stretch-records/script.js.
//
// Step 3, the ordering puzzle: write a program mixing plain logs, a zero
// delay timer, and a settled Promise reaction. Predict the full output order
// in comments before running, then explain in one sentence why the Promise
// beat the timer.

console.log("one");
setTimeout(() => console.log("two"), 0);
Promise.resolve().then(() => console.log("three"));
console.log("four");

// Prediction: one, four, three, two
// When a Promise settles, the then() handler is queued as a microtask.
// The microtask queue always empties first, so the Promise reaction beats the timer, every time by rule.

// Step 5: Custom error for missing artist data
class MissingArtistDataError extends Error {
  constructor(field) {
    super("Required data is missing " + field);
    this.name = "MissingArtistDataError";
  }
}

function checkArtist(artist) {
  if (!artist.name) {
    throw new MissingArtistDataError("name");
  }
  return artist;
}

try {
  checkArtist({
    genre: "Pop",
    duration: "18:30",
  });
} catch (error) {
  console.log("Cannot add artist:", error.message);
}

// When an artist has no name, checkArtist() throws a MissingArtistDataError.
// The catch block receives the custom error and displays a message that tells
// the teammate which required data is missing.

// Step 6: paste the final rethrown message that reached the top.
function addArtist(artist) {
  try {
    return checkArtist(artist);
  } catch (error) {
    throw new Error(`Artist page: adding artist failed - ${error.message}`);
  }
}

try {
  addArtist({
    genre: "Alternative Rock",
    duration: "18:30",
  });
} catch (error) {
  console.log(error.message);
}

// The error was caught in addArtist(), given additional context about the
// page and operation, and rethrown to the outer catch.
// The final message that reached the top:
// Artist page: adding artist failed - Required data is missing name

// Step 7: A. Three independent delayed tasks with Promise.all()
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

Promise.all([
  delay(1000).then(() => "Task 1"),
  delay(2000).then(() => "Task 2"),
  delay(1500).then(() => "Task 3"),
]).then((results) => {
  console.log("Promise.all result:", results);
});

// Step 7: B. Promise.all() With one failure
const failAfter = (ms, message) =>
  new Promise((resolve, reject) =>
    setTimeout(() => reject(new Error(message)), ms),
  );

Promise.all([
  delay(1000).then(() => "Task 1"),
  failAfter(2000, "Task 2 failed"),
  delay(1500).then(() => "Task 3"),
])
  .then((results) => {
    console.log("Promise.all result:", results);
  })
  .catch((error) => {
    console.log("Promise.all failed:", error.message);
  });

// Step 7: C. Promise.allSettled()

Promise.allSettled([
  delay(1000).then(() => "Task 1"),
  failAfter(2000, "Task 2 failed"),
  delay(1500).then(() => "Task 3"),
]).then((results) => {
  console.log("All outcomes:", results);

  const survivors = results
    .filter((result) => result.status === "fulfilled")
    .map((result) => result.value);

  console.log("Survivors:", survivors);
});

// Promise.all() fails when one Promise rejects, even if the other tasks succeed.
// Promise.allSettled() waits for every task and reports both fulfilled and rejected outcomes.
