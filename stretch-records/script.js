"use strict";

// The roster, exactly where the JavaScript course's finale left it: an array
// of artist objects at the top of the file, and one repeatable rule that
// renders it. In this course the data moves out of this file, step by step.

const cardArea = document.querySelector(".cards");

// Every artist currently on the page, whatever the data's source. renderCards
// maintains this list, so the shuffle button and the form keep working no
// matter where the artists came from.
const roster = [];

// One card from one artist: the shared builder, used by the first render
// and by the form below.
function buildCard(artist) {
  const card = document.createElement("article");
  if (artist.photo) {
    const photo = document.createElement("img");
    photo.src = artist.photo;
    photo.alt = `${artist.name}, artist photo`;
    card.append(photo);
  }
  const title = document.createElement("h3");
  title.textContent = artist.name;
  const line = document.createElement("p");
  line.textContent = `${artist.genre}, ${artist.total} of music`;
  card.append(title, line);
  return card;
}

function renderCards(list) {
  for (const artist of list) {
    roster.push(artist);
    cardArea.append(buildCard(artist));
  }
}

// *Lesson 1 - Step 5 Loading data from artists JSON file*
// fetch("artists.json")
//   .then((response) => response.json())
//   .then((artists) => renderCards(artists));

// *Lesson 2 - Step 5 Simulating slow data source*
// const status = document.querySelector(".status");
// status.textContent = "Loading artists...";

// setTimeout(() => {
//   fetch("artists.json")
//     .then((response) => response.json())
//     .then((artists) => {
//       status.textContent = "";
//       renderCards(artists);
//     });
// }, 2000);

// *Lesson 3 - Step 2: Wrapping artist loader in three handler methods*
// function loadArtists() {
//   return fetch("artists.json").then((response) => response.json());
// }

// const status = document.querySelector(".status");
// status.textContent = "Loading artists...";

// loadArtists()
//   .then((artists) => renderCards(artists))
//   .catch((error) => console.log("Load failed", error.message))
//   .finally(() => (status.textContent = ""));

// *Lesson 3 - Step 4: Rewrite artist loader with async function using await with try, catch, and finally*
// function loadArtists() {
//   return fetch("artists.json").then((response) => response.json());
// }

// const status = document.querySelector(".status");

// async function showArtists() {
//   try {
//     status.textContent = "Loading artists...";
//     const artists = await loadArtists();
//     renderCards(artists);
//   } catch (error) {
//     status.textContent = "We could not load the artists";
//   } finally {
//     status.textContent = "";
//   }
// }

// showArtists();
// With valid artists.json, the artist cards render normally.
// With invalid artists.json, the cards do not render and the visitor sees
// "We could not load the artists." The finally block runs in both cases.

// *Lesson 3 - Step 8: Handle empty artist data with custom error showing visitor-friendly message*
// class MissingArtistDataError extends Error {
//   constructor(field) {
//     super("Required data is missing " + field);
//     this.name = "MissingArtistDataError";
//   }
// }

// function loadArtists() {
//   return fetch("empty-artists.json").then((response) => response.json());
// }

// const status = document.querySelector(".status");

// async function showArtists() {
//   try {
//     status.textContent = "Loading artists...";
//     const artists = await loadArtists();
//     if (artists.length === 0) {
//       throw new MissingArtistDataError("artist data");
//     }
//     renderCards(artists);
//   } catch (error) {
//     status.textContent =
//       "No artists are currently available. Please try at a later time.";
//   } finally {
//   }
// }

// showArtists();

// When the artist data es empty, the custom error is thrown and caught.
// The page shows a visitor-friendly message instead of silently displaying
// an empty roster. I chose this wording because it explains the problem
// without exposing technical error details and tells the visitor to try at a later time.

// *Lesson 4 - Step 3 to 5 Rebuild loadArtists() to fetch from Endpoints,
// *add ok check, wrap in try, catch, and finally

// async function loadArtists() {
//   const response = await fetch("http://localhost:3000/artists");
//
//   console.log("Response:", response);

//   if (!response.ok) {
//     throw new Error("Request failed with status " + response.status);
//   }

//   return response.json();
// }

// const status = document.querySelector(".status");

// async function showArtists() {
//   try {
//     status.textContent = "Loading artists...";
//     const artists = await loadArtists();
//     renderCards(artists);
//   } catch (error) {
//     status.textContent =
//       "We could not load the artists. Please try at a later time.";
//   } finally {
// console.log("Loading is finished."); to demonstrate a failure shows an honest visitor message
// when json-server is stopped.
//     status.textContent = "";
//   }
// }

// showArtists();

// When source was changed to "http://localhost:3000/nothing",
// fetch() still fulfilled even though the server returned 404
// The ok check converted the unsuccessful HTTP response into a real Error.
// Result: "Request failed with status 404".

// Shuffle: pick a random artist and feature them.
const shuffleButton = document.querySelector(".shuffle");

shuffleButton.addEventListener("click", () => {
  if (roster.length === 0) return;
  const pick = roster[Math.floor(Math.random() * roster.length)];
  document.querySelector(".featured").textContent =
    `Featured today: ${pick.name}`;
});

// The suggestion form: an empty submission does nothing, because an empty
// string is falsy.
const form = document.querySelector(".signup");
const nameInput = document.querySelector("#artist-name");
const genreInput = document.querySelector("#artist-genre");

// form.addEventListener("submit", (event) => {
//   event.preventDefault();
//   const name = nameInput.value;
//   if (name) {
//     const genre = genreInput.value || "Unsigned";
//     renderCards([{ name: name, genre: genre, total: "0:00" }]);
//     nameInput.value = "";
//     genreInput.value = "";
//   }
// });

// *Lesson 4 - Step 6 Submit new artist with POST
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const newArtist = { name: nameInput.value, genre: genreInput.value };

  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newArtist),
  };
  console.log(options);

  const response = await fetch("http://localhost:3000/artists", options);
  console.log(response.status);
});

// Confirmed a 201 response in the console.
// The new artists are still present after refreshing the page
// and were also present in a second browser tab

// *Lesson 4 - Step 7 Fetch from both servers with Promise.all()

async function loadArtists() {
  const [artistsResponse, labelResponse] = await Promise.all([
    fetch("http://localhost:3000/artists"),
    fetch("http://localhost:3001/label"),
  ]);

  if (!artistsResponse.ok) {
    throw new Error(
      "Artists request failed with status " + artistsResponse.status,
    );
  }

  if (!labelResponse.ok) {
    throw new Error("Label request failed with status " + labelResponse.status);
  }

  const artists = await artistsResponse.json();
  const label = await labelResponse.json();

  return { artists, label };
}

const status = document.querySelector(".status");

async function showArtists() {
  try {
    status.textContent = "Loading artists...";

    const { artists, label } = await loadArtists();

    renderCards(artists);
  } catch (error) {
    status.textContent =
      "We could not load the artists. Please try at a later time.";
  } finally {
    status.textContent = "";
  }
}
showArtists();

// Promise.all() waits for both /artists (port 3000) and /label
// (port 3001) before loadArtists() returns. Both requests returned 200,
// and the artist cards rendered only after both responses were received.
