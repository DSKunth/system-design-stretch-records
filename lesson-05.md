# Lesson 5: The System Audit

The written audit of your running system. Every claim must be backed by
something you observed in the Network tab, the console, or the server's
terminal output.

## Single point of failure

When the label server on port 3001 was stopped while the artist server on port 3000 was still running, the page did not render the artist cards. Because the loader uses `Promise.all()`, the failed label request caused the combined operation to fail. Port 3001 being unavailable prevents rendering because `Promise.all()` treats the label request as equally essential, even though the page currently does not display the label data. The `catch` block set an error message, but the `finally` block then cleared the status text, so the visitor ultimately saw no message.

The json-server dependency is therefore a single point of failure for the current page. Redundancy means having another instance or service available so that the system can continue when one instance fails.

If I were to design it in a production system, I would consider the label service optional so that failure of that dependency would not prevent the artist roster from being displayed. The visitor should also receive a clear, actionable error message rather than an empty page.

## Latency

With the Network connection throttled to Slow 3G, the page took approximately less than 3 seconds to load. While the requests were waiting, the page displayed "Loading artists..." and the artist cards did not appear until both requests completed. The roughly two-second delay introduced by the slow connection is latency.
As I inspected it, the artists request took 2.09 seconds and the label request took 2.05 seconds according to `Network > Timing` tab. Although from the visitor's perspective, it took approximately 2-3 seconds to finish loading.

## Caching

I restored the connection to No throttling and compared two reloads. With Disable cache enabled, the browser downloaded the image resources again, for example `pinkfong.jpeg` returned 200 with 102 kB transferred and took 53 ms. With caching enabled, the same image returned 304 with only 0.2 kB transferred and took 8 ms. The other artist images showed the same pattern. This demonstrates caching: the browser reused previously fetched resources when they had not changed, reducing the amount of data that needed to be transferred.

## The layers

### Presentation Layer

The presentation layer is the browser page built with HTML, CSS, and JavaScript-driven rendering. It displays the artist cards, loading state, error message, and artist submission form. The visitor interacts with this layer directly.

### Application Layer

The application layer is mainly the JavaScript in `script.js`. It
controls how the page communicates with the APIs, waits for both
responses with `Promise.all()`, checks response status, handles errors, and sends new artists with POST. It is a relatively thin application layer. It does not contain things you would expect in a real enterprise production application backend such as business rules, authentication or authorization, serious input validation, database transactions, complex data processing, and centralized business logic like in SAP.

### Data Layer

The data layer consists of the JSON data served by `json-server`.
`artists.json` is exposed through the `/artists` endpoint on port 3000, while `label.json` is exposed through `/label` on port 3001. The json-server processes requests and returns the data, but it does not represent a full production database or application backend.

## One request's full journey

I traced the artist data request from the browser to the rendered cards. The Network tab showed a GET request to
`http://localhost:3000/artists` that returned `200 OK`. The server
terminal showed that json-server was running on port 3000 and watching
`artists.json`. The response was JSON data containing the artist
records. The JavaScript then parsed the response and passed the artist
data to `renderCards()`, which produced the artist cards visible on the page.

## STRETCH: what a real system would need that json-server skipped

A real system would need validation, identity, and business rules that
json-server does not provide.

- Validation belongs in the application layer. The server should check
  that submitted artist data is complete and valid rather than accepting any shape or types of data sent by the form.
- Identity belongs across the application and data layers. A real system would need to know who is submitting or changing data and enforce the appropriate permissions.
- Business rules belong in the application layer. The server should
  decide what is allowed and how requests should be handled instead of
  simply storing whatever the client sends.

Lesson 4 demonstrated that validation and permission cannot live in the browser alone because the client cannot be trusted. The browser can be bypassed or modified, so the server must enforce these rules.

Just like in SAP, you would not just trust the Fiori or GUI to enforce something like "this user is allowed to approve or process payment". The application layer has to enforce it.
