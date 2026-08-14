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
// Step 2: Wrapping artist loader in three handler methods
// function loadArtists() {
//   return fetch("artists.json").then((response) => response.json());
// }

// const status = document.querySelector(".status");
// status.textContent = "Loading artists...";

// loadArtists()
//   .then((artists) => renderCards(artists))
//   .catch((error) => console.log("Load failed", error.message))
//   .finally(() => (status.textContent = ""));

// Step 4: Rewrite artist loader with async function using await with try, catch, and finally
function loadArtists() {
  return fetch("artists.json").then((response) => response.json());
}

const status = document.querySelector(".status");

async function showArtists() {
  try {
    status.textContent = "Loading artists...";
    const artists = await loadArtists();
    renderCards(artists);
  } catch (error) {
    status.textContent = "We could not load the artists";
  } finally {
    status.textContent = "";
  }
}

showArtists();

// With valid artists.json, the artist cards render normally.
// With invalid artists.json, the cards do not render and the visitor sees
// "We could not load the artists." The finally block runs in both cases.

// Step 8: Handle empty artist data with custom error showing visitor-friendly message
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

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = nameInput.value;
  if (name) {
    const genre = genreInput.value || "Unsigned";
    renderCards([{ name: name, genre: genre, total: "0:00" }]);
    nameInput.value = "";
    genreInput.value = "";
  }
});
