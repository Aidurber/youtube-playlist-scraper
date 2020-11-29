# YouTube Playlist Scraper

Scrape the contents of a playlist. Alternative libraries that are attempting this may now be broken since the usual approach of appending `disable_polymer=true` to the query string no longer appears to work. This means that when they're grabbing the HTML, the DOM does not contain the data you're trying to scrape.

This approach extracts the payload from `window.ytInitialData` which YouTube uses to hydrate the page.

## Usage

### JavaScript

```js
const { scrapePlaylist } = require("youtube-playlist-scraper");

// ID such as PLWKjhJtqVAbnZtkAI3BqcYxKnfWn_C704
async function getPlaylist(id) {
  const data = await scrapePlaylist(id);
  return data;
}
```

### TypeScript

```js
import { scrapePlaylist, Playlist } from "youtube-playlist-scraper";

// ID such as PLWKjhJtqVAbnZtkAI3BqcYxKnfWn_C704
async function getPlaylist(id): Promise<Playlist | null> {
  const data = await scrapePlaylist(id);
  return data;
}
```

### Example Response

```ts
{
  title: "Ambience",
  playlist: [
    {
      id: 'CHFif_y2TyM',
      name: 'Royal Library | Rain and Thunderstorm Sounds on Study Ambience with Crackling Fireplace',
      url: 'https://youtube.com/watch?v=CHFif_y2TyM'
    },
    {
      id: 'IvJQTWGP5Fg',
      name: 'Ancient Library Room - Relaxing Thunder & Rain Sounds, Crackling Fireplace for Sleeping for  Study',
      url: 'https://youtube.com/watch?v=IvJQTWGP5Fg'
    },
    {
      id: 'x5B1AailyrQ',
      name: 'Gentle Rain with Thunder for Sleep, Study and Relaxation | Crackling Fireplace | 3 Hours',
      url: 'https://youtube.com/watch?v=x5B1AailyrQ'
    }
  ]
}
```
