"use strict";

// Lesson 4: HTTP and the Fetch API.
// Recorded observations go in this file as comments. The loader and form
// work happens in stretch-records/script.js, against the server you run
// with json-server.
//
// Step 2: both status codes and the response Content-Type.
// http://localhost:3000/artists > status code: 200 OK, Content-Type: application/json
// http://localhost:3000/nothing > status code: 404 Not Found, Content-Type: application/json
//
// Step 3: ok, status, and one Access-Control-Allow header from the Network tab.
// Response: ok = true, status = 200
// Access-Control-Allow-Methods: GET, HEAD, PUT, PATCH, POST, DELETE
//
// Step 4: show that the Promise fulfilled anyway on the wrong path.
async function loadArtists() {
  const response = await fetch("http://localhost:3000/nothing");

  console.log("Wrong Path:", response.status, response.ok);

  // fetch() fulfilled even though http://localhost:3000/nothing returned 404 false.
  // A 404 is still an HTTP response, so fetch() does not reject automatically.
}
loadArtists();
//
// Step 5: how did the refused connection differ from the 404?
// With json-server stopped, the loader could not connect to
// localhost:3000, so no HTTP response was received. This differed from
// the earlier 404 because the 404 came from a running server that responded
// with an HTTP status, while the refused connection happened before an
// HTTP response existed.
//
// Step 7: Test - Fetch from both servers with Promise.all()
async function loadBoth() {
  const [artists, label] = await Promise.all([
    fetch("http://localhost:3000/artists").then((response) => response.json()),
    fetch("http://localhost:3001/label").then((response) => response.json()),
  ]);

  console.log("Artists:", artists);
  console.log("Label:", label);
}

loadBoth();
//
// STRETCH, step 8: the public API's endpoint address, the method, one
// parameter, the response shape you would code against, and one stated limit.
// Endpoint Address: https://musicbrainz.org/ws/2/
// Method: GET
// Parameter: query
// Response shape: JSON
// Stated limit: Rate limiting requires that applications make no more than one request per second
