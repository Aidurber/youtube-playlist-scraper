[![license](https://img.shields.io/github/license/aidurber/youtube-playlist-scraper.svg)]()
[![npm version](https://badge.fury.io/js/youtube-playlist-scraper.svg)](https://badge.fury.io/js/youtube-playlist-scraper)
[![gzip size](https://badgen.net/bundlephobia/minzip/youtube-playlist-scraper)]()

# YouTube Playlist Scraper

Scrape the contents of a playlist. Alternative libraries that are attempting this may now be broken since the usual approach of appending `disable_polymer=true` to the query string no longer appears to work. This means that when they're grabbing the HTML, the DOM does not contain the data you're trying to scrape.

This approach extracts the payload from `window.ytInitialData` which YouTube uses to hydrate the page.

## Limitations

One limitation of this library and other similar libraries, is it's hard to do pagination. If your playlist has over 100 items, there's nothing (that I know of) we can do to get the rest of the items via scraping. If you have some ideas, don't be afraid to holler. But I highly recommend you just use the [PlaylistItems resource from the YouTube Data API](https://developers.google.com/youtube/v3/docs/playlistItems/list)

One more thing, YouTube can change the API or the structure of the DOM and this library (and others will/may break). Be sure to validate the results or just use their API linked above.

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

```ts
import { scrapePlaylist, Playlist } from "youtube-playlist-scraper";

// ID such as PLWKjhJtqVAbnZtkAI3BqcYxKnfWn_C704
async function getPlaylist(id): Promise<Playlist | null> {
  const data = await scrapePlaylist(id);
  return data;
}
```

### Options

```ts
// You can also override the fetch request by adding headers, changing the user agent etc.
async function getPlaylist(id): Promise<Playlist | null> {
  const data = await scrapePlaylist(id, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Safari/605.1.15",
    },
  });
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
