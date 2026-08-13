"use strict";

// Lesson 1: The Client and Server Model.
// Your standalone code and written observations for this lesson live here,
// as code and comments. The site work happens in the stretch-records folder.
//
// Step 4: how many requests did the single page load make? List three by name.
// A single page load made 13 requests:
// Three requests: content.css, sprite.svg, adriano-celentano.jpg

// Step 6: which files changed when you added the sixth artist, which did not,
// and why is that separation the point?
// The files that have been changed were the artists.json file and images/ejae.jpg
// script.js did not change. The data can change independently from the rendering code.
// Adding an artist does not require changing the functions or the loops.

// Step 7: paste the console error the broken artists.json produced.
// Uncaught (in promise) SyntaxError: Unexpected token ']', ..."g"
//   },
// ]
// " is not valid JSON

// Step 8: build one artist object, JSON.stringify() it, log the text,
// JSON.parse() it back, and log one property of the result.

console.log("This is an artist object");
const artist = {
  name: "Eraserheads",
  genre: "Alternative Rock",
  duration: "20:15",
};

console.log(artist);

console.log("This is the converted artist object into JSON text");
const artistText = JSON.stringify(artist, null, 2);
console.log(artistText);

console.log("This is the JSON text parsed back to an artist object");
const artistObject = JSON.parse(artistText);
console.log(artistObject);
console.log(artistObject.name);

// STRETCH, step 9: describe your page as a system. Name the client, name the
// server, and state what the request asked for and what the response carried.
// The client is the browser and the server is lIve Server.
// The browser sends a request for artists.json, and the server responds with the JSON text containing
// the artist data. The browser parses the JSON into JavaScript objects and uses the data to
// render the artist cards.
