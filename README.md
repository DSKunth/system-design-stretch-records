# Stretch Records: System Design Fundamentals

A small music-artist web application built as part of the System Design Fundamentals learning block.

The project started with a simple JSON file and evolved into a client-server application using `fetch()`, `json-server`, HTTP requests, asynchronous JavaScript, error handling, and multiple API endpoints.

## What I Practiced

- Client-server architecture
- HTTP requests, responses, and status codes
- `fetch()` and `async`/`await`
- Promises and `Promise.all()`
- Error handling and custom errors
- POST requests and data persistence
- CORS and API contracts
- Latency and caching
- System layers and single points of failure
- Basic system integration

## System

```text
Browser
   │
   ├── GET /artists ──► json-server :3000 ──► artists.json
   │
   └── GET /label ────► json-server :3001 ──► label.json
```

The application uses Promise.all() to wait for both API responses before
rendering the artist cards.

## Project Structure

```text
system-design-stretch/
├── stretch-records/       # Main web application
│   ├── images/            # Artist images
│   ├── artists.json       # Artist data
│   ├── empty-artists.json # Empty data for error-handling exercise
│   ├── index.html         # Main page
│   ├── label.json         # Label data
│   ├── script.js          # Application logic
│   └── styles.css         # Page styling
├── lesson-01.js            # Lesson 1 exercises
├── lesson-02.js            # Lesson 2 exercises
├── lesson-03.js            # Lesson 3 exercises
├── lesson-04.js            # Lesson 4 exercises
├── lesson-05.md            # System audit
└── README.md               # Project overview
```

The `stretch-records` folder contains the running application. The lesson
files contain the standalone exercises and observations.

## Run Locally

Start the artist API:

```bash
npx json-server artists.json
```

Start the label API in a second terminal:

```bash
npx jso
```

Then open the application using the local development server.
